import { all as notes } from '@/core/notes'

import { Gig } from 'gig'
// import { notesIn } from 'bach-js'
// import Tone, { Sampler, Transport } from 'tone'
import * as Tone from 'tone'
import { Sampler, Transport } from 'tone'
// import { Sampler, Transport } from 'tone'
import { ref } from '@vue/composition-api'

const gig = ref(null)
// const playing = ref(false)
//
// // EXPERIMENT (WORKS!)
// export async function load (source) {
//   const sampler = new Sampler({
//     urls: {
//       C4: 'C4.mp3',
//       'D#4': 'Ds4.mp3',
//       'F#4': 'Fs4.mp3',
//       A4: 'A4.mp3'
//     },
//     release: 1,
//     baseUrl: 'https://tonejs.github.io/audio/salamander/'
//   }).toDestination()

//   Tone.loaded().then(() => {
//     sampler.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 4)
//   })
// }

export async function load (source) {
  await Tone.loaded()

  // Buffer.on('error', error => {
  //   console.error(error)
  // })

  gig.value = new Gig({
    source,
    loop: true
  })

  gig.value.on('play', () => {
    // sampler.release = 2
    // sampler.toMaster()
  })

  gig.value.on('beat:play', () => {
    const { sections, cursor } = gig.value
    const section = sections[cursor.section]

    console.log('beat played (section)', section)

    play(section)
  })

  return gig.value.play()
}

export function play (section) {
  // FIXME: Hard-coding chord for now, but probably auto-detect or allow user to specify this!
  // const { notes } = section.parts.chord
  const notes = section.parts.chord.notes.map(note => `${note}4`)
  const duration = (section.duration * gig.value.interval) / 1000
  const urls = notes.reduce((map, note) => ({ ...map, [note]: sample({ name: note }) }), {})

  console.log('PLAYING SECTION DUDE', section, notes)

  console.log('--- duration', duration, !!Tone, !!Transport)
  console.log('--- DA note URL MAP', urls)

  const synth = new Tone.FMSynth().toDestination()

  Tone.loaded().then(time => {
    // synth.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 4, time)
    // synth.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 4, time)
    const notes = ['Eb4', 'G4', 'Bb4']

    notes.forEach(note => {
      synth.triggerAttackRelease(note, 4, time)
    })
  })

  // sampler.triggerAttackRelease(notes, duration, Tone.now())
  //
  // const sampler = new Sampler({
  //   urls,
  //   // urls: {
  //   //   C4: 'C4.mp3',
  //   //   'D#4': 'Ds4.mp3',
  //   //   'F#4': 'Fs4.mp3',
  //   //   A4: 'A4.mp3'
  //   // },
  //   release: 1,
  //   baseUrl: 'https://tonejs.github.io/audio/salamander/'
  // }).toDestination()

  // Tone.loaded().then(() => {
  //   sampler.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 4)
  // })

  return sampler
}

export function stop () {
  gig.value.stop()
}

export function sample (note) {
  // const burl = 'https://tonejs.github.io/audio/salamander/'
  // TODO: Append octave of 2 if missing
  const pitch = note.name.replace(/#/, 's')
  // const url = `${burl}${pitch}.mp3`
  const url = `${pitch}.mp3`
  console.log('sampling note!', url, note)

  return url
}

console.log('DA MAP', notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {}))

// @see: https://github.com/sustained/sforzando/blob/master/src/library/instruments.js
export const sampler = new Sampler({
  release: 1,
  baseUrl: 'https://tonejs.github.io/audio/salamander/',
  urls: notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {})
}).toDestination()
