import Vue from 'vue'
import { ref } from '@vue/composition-api'

// export const config = ref(null)
export const app = ref(null)

// Option 1: Config based
// export const local = () => {
//   const channel = new Vue()

//   const notes = ['Ab2', 'A2', 'Bb2', 'B2', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2'].map(note)

//   const samplesOf = (note) => {
//     const pitch = note.name.replace(/#/, 's')
//     const url = `${pitch}.mp3`

//     return url
//   }

//   const samples = notes.reduce((map, note) => ({ ...map, [note.name]: sampleOf(note) }), {})

//   export const sampler = new Sampler({
//     release: 1,
//     urls: samples,
//     baseUrl: process.env.VUE_APP_AUDIO_SERVER_BASE_URL
//   }).toDestination()

//   // NOTE: This config should only affect /use modules, not anything like component slots (they should be granular enough to accept slots themselves)
//   return {
//     use: {
//       player: {
//         actions: {
//           load (source) {},

//           play (beat) {
//             beat.items.forEach(item => {
//               const elems = beat.either(['chord', 'scale', 'note'])
//               const notes = beat.notesOf(elems)

//               // FIXME: Works but if both items have the same notes it will play them twice, which causes fuzz/static
//               sampler.triggerAttackRelease(
//                 Note.unite(notes).map(note => `${note}2`),
//                 item.duration
//               )
//             })
//           },

//           stop () {},
//           gain (volume) {},
//           mute () {}
//         }
//       },

//       tracks: {
//         get: { 
//           store: useStorage('bach-editor-tracks', {}),
//           context: useStorage('bach-editor-tracks-context', { current: null }),
//           // starter
//         },

//         actions: {
//           select () {},
//           create () {},
//           destroy () {},
//           save () {}
//         }
//       },

//       audio: {
//         actions: {
//           play () {},
//           stop () {},
//           save () {}
//         }
//       }
//     }
//   }
// }

// Option 2: Conventional events
export function local2 (app, options) {
  const { Note } = require('bach-js')

  const notes = ['Ab2', 'A2', 'Bb2', 'B2', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2'].map(note)

  const samplesOf = (note) => {
    const pitch = note.name.replace(/#/, 's')
    const url = `${pitch}.mp3`

    return url
  }

  const samples = notes.reduce((map, note) => ({ ...map, [note.name]: sampleOf(note) }), {})

  const sampler = new Sampler({
    release: 1,
    urls: samples,
    baseUrl: process.env.VUE_APP_AUDIO_SERVER_BASE_URL
  }).toDestination()

  const synth = new Tone.Synth().toDestination()

  app.on('play', beat => {
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

  app.on('play:metronome', (beat, gig) => {
    const { settings } = app.use.player
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

export function runtime (factory = local2, options = {}) {
  const channel = new Vue()

  app.value = factory({
    use: require('@/use'),
    channel,
    on: channel.$on.bind(channel),
    off: channel.$off.bind(channel),
    emit: channel.$emit.bind(channel)
  }, options)

  // EXAMPLE USAGE:
  // after assemble
  //
  // const editor = assemble({ ... })
  //
  // const store = () => useAxios('/api/tracks?group=id', {})
  // const select = (id) => useAxios('/api/tracks/select', { method: 'post', props: { id } })
  //
  // editor.use.track.store = store()
  // editor.feat.track.nuke = false
  //
  // editor.on('setup', () => {
  //   editor.track.store = store() // or some other custom async ref
  //  })
}

export function install (options) {
  
}

// export function action
// export function dispatch (topic, ...args) {

// }
//
// NEXT UP: Add props and slots wherever possible to every component and then use HOC to populate the default implementation for web localstorage
