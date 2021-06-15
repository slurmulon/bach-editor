// TODO: Consider renaming `runtimes` to `editors`

// import * as Tone from 'tone'
import { Note } from 'bach-js'
import { Sampler, Synth } from 'tone'
import * as tonal  from '@tonaljs/tonal'

export default function piano (editor, options = {}) {
  const notes = options.notes || [
    'Ab2', 'A2', 'Bb2', 'B2', 'C2', 'Db2',
    'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2'
  ].map(tonal.note)

  // const sampleOf = options.sampleOf || note => {
  const sampleOf = note => {
    const pitch = note.name.replace(/#/, 's')
    const url = `${pitch}.mp3`

    return url
  }

  const samples = notes.reduce((map, note) => ({ ...map, [note.name]: sampleOf(note) }), {})

  const sampler = new Sampler({
    release: 1,
    urls: samples,
    baseUrl: options.baseUrl || process.env.VUE_APP_AUDIO_SERVER_BASE_URL
  }).toDestination()

  const synth = new Synth().toDestination()

  editor.on('play:beat', beat => {
    beat.items.forEach(item => {
      const elems = beat.either(['chord', 'scale', 'note'])
      const notes = beat.notesOf(elems)

      // FIXME: Works but if both items have the same notes it will play them twice, which causes fuzz/static
      sampler.triggerAttackRelease(
        Note.unite(notes).map(note => `${note}2`),
        item.duration
      )
    })
  })

  editor.on('play:metronome', (beat, gig) => {
    const { settings } = editor.use.player
    const scale = gig.elements.find(({ kind }) => kind === 'scale')
    const note = (scale && scale.notes[0]) || 'a'
    const octave = beat === 0 ? 5 : 4
    const pitch = (note && `${note}${octave}`)// || 440.0
    const duration = gig.durations.cast(1, { is: '32n', as: 'second' })

    synth.volume.value = settings.value.volume * .65
    synth.triggerattackrelease(pitch, duration)
  })

  // channel.$on('stop', options.player.actions.stop)
  // channel.$on('gain:volume', options.player.actions.gain)
  // channel.$on('mute:volume', options.player.actions.gain)
}


