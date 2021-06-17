import { Note } from 'bach-js'
import { Sampler, Synth } from 'tone'
import * as tonal  from '@tonaljs/tonal'

export default function piano (app, options = {}) {
  const { settings } = app.use.player
  const notes = options.notes || [
    'Ab2', 'A2', 'Bb2', 'B2', 'C2', 'Db2',
    'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2'
  ].map(tonal.note)

  const sampleOf = note => {
    const pitch = note.name.replace(/#/, 's')
    const url = `${pitch}.mp3`

    return url
  }

  const sampler = new Sampler({
    release: 1,
    urls: notes.reduce((map, note) => ({ ...map, [note.name]: sampleOf(note) }), {}),
    baseUrl: options.baseUrl || process.env.VUE_APP_AUDIO_SERVER_BASE_URL
  }).toDestination()

  const synth = new Synth().toDestination()

  app.on('play:beat', beat => {
    const playing = []

    beat.items.forEach(item => {
      const elems = item.elements.filter(({ kind }) => ['chord', 'note'].includes(kind))
      const notes = beat.notesOf(elems).filter(note => !playing.includes(note))

      playing.push(...notes)

      sampler.volume.value = settings.value.volume
      sampler.triggerAttackRelease(
        Note.unite(notes).map(note => `${note}2`),
        item.duration
      )
    })
  })

  app.on('play:metronome', (beat, gig) => {
    const scale = gig.elements.find(({ kind }) => kind === 'scale')
    const note = (scale && scale.notes[0]) || 'a'
    const octave = beat === 0 ? 5 : 4
    const pitch = (note && `${note}${octave}`)// || 440.0
    const duration = gig.durations.cast(1, { is: '32n', as: 'second' })

    synth.volume.value = settings.value.volume * .65
    synth.triggerAttackRelease(pitch, duration)
  })

  app.on('gain:volume', volume => {
    sampler.volume.value = volume
  })

  app.on('mute:volume', muted => {
    // FIXME: Ideal, but this doesn't seem to have an effect on the actual volume (tone.js issue, it seems)
    // sampler.volume.mute = yes
    sampler.volume.value = muted ? -1000 : settings.value.volume
  })

  return app
}


