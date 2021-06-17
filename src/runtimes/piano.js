import { Note } from 'bach-js'
import { Sampler, Synth } from 'tone'
import * as tonal  from '@tonaljs/tonal'
import get from 'dlv'

export const defaults = {
  notes: [
    'Ab2', 'A2', 'Bb2', 'B2', 'C2', 'Db2',
    'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2'
  ],
  sampler: {
    burl: process.env.VUE_APP_AUDIO_SERVER_BASE_URL,
    path: note => {
      const pitch = note.name.replace(/#/, 's')
      const url = `${pitch}.mp3`

      return url
    }
  },
  play: {
    kinds: ['chord', 'note'],
    duration: item => item.duration
  }
}

export function option (config, path, value) {
  return get(config, path, get(defaults, path, value))
}

export function env (options) {
  const config = { ...defaults, ...options }

  return (path, value) => option(config, path, value)
}

// TODO: Make many of these internal methods and values use options.key by default
export default function piano (app, config = defaults) {
  const { player } = app.use
  const context = env({ ...defaults, ...config })
  const notes = context('notes').map(tonal.note)
  const sample = context('sampler.path')
  const sampler = new Sampler({
    release: 1,
    urls: notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {}),
    baseUrl: context('sampler.burl')
  }).toDestination()

  const synth = new Synth().toDestination()

  app.on('play:beat', beat => {
    const playing = []
    const kinds = context('play.kinds')

    beat.items.forEach(item => {
      const elems = item.elements.filter(({ kind }) => kinds.includes(kind))
      const notes = beat.notesOf(elems).filter(note => !playing.includes(note))
      const duration = player.durations.value.cast(item.duration, { as: 'second' })

      playing.push(...notes)

      sampler.volume.value = player.settings.value.volume
      sampler.triggerAttackRelease(
        Note.unite(notes).map(note => `${note}2`),
        duration
      )
    })
  })

  app.on('play:metronome', (beat, gig) => {
    const scale = gig.elements.find(({ kind }) => kind === 'scale')
    const note = (scale && scale.notes[0]) || 'a'
    const octave = beat === 0 ? 5 : 4
    const pitch = (note && `${note}${octave}`)// || 440.0
    const volume = player.settings.value.volume * .65
    const duration = gig.durations.cast(1, { is: '32n', as: 'second' })

    synth.volume.value = volume
    synth.triggerAttackRelease(pitch, duration)
  })

  app.on('gain:volume', volume => {
    sampler.volume.value = volume
  })

  app.on('mute:volume', muted => {
    // FIXME: Ideal, but this doesn't seem to have an effect on the actual volume (tone.js issue, it seems)
    // sampler.volume.mute = yes
    sampler.volume.value = muted ? -1000 : player.settings.value.volume
  })

  return app
}


