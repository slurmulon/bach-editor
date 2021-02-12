import { all as notes } from '@/core/notes'

import { Gig } from 'gig'
// import { notesIn } from 'bach-js'
// import Tone, { Sampler, Transport } from 'tone'
import * as Tone from 'tone'
import { Sampler, Transport } from 'tone'
// import { Sampler, Transport } from 'tone'
import { ref, computed } from '@vue/composition-api'

// export const gig = ref(null)
export const gig = ref({})
export const playing = ref(false)

export const sections = computed(() => gig.value.sections || [])

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
    playing.value = true
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
  const notes = section.parts.chord.notes.map(note => `${note}2`)
  const duration = (section.duration * gig.value.interval) / 1000
  const urls = notes.reduce((map, note) => ({ ...map, [note]: sample({ name: note }) }), {})

  console.log('PLAYING SECTION DUDE', section, notes)

  console.log('--- duration', duration, !!Tone, !!Transport)
  console.log('--- DA note URL MAP', urls)

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(notes, duration)
  })

  return sampler
}

export function stop () {
  gig.value.stop()

  playing.value = false
}

export function sample (note) {
  const pitch = note.name.replace(/#/, 's')
  const url = `${pitch}.mp3`

  return url
}

// @see: https://github.com/sustained/sforzando/blob/master/src/library/instruments.js
export const sampler = new Sampler({
  release: 1,
  baseUrl: 'http://127.0.0.1:8086/',
  urls: notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {})
}).toDestination()
