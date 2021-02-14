import { track } from '@/use/editor'
import { all as notes } from '@/core/notes'

import { Gig } from 'gig'
import { Sections } from 'bach-js'
// import { notesIn } from 'bach-js'
// import Tone, { Sampler, Transport } from 'tone'
import * as Tone from 'tone'
import { Sampler } from 'tone'
import { ref, computed } from '@vue/composition-api'

export const gig = ref({})
export const current = ref({})
export const index = ref(0)
export const part = ref('chord')
export const playing = ref(false)

export const music = computed(() => new Sections(track.value))
export const sections = computed(() => music.value.all || [])

export async function load (source) {
  await Tone.loaded()

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
    // TODO: Push into `gig.current` getter
    const section = sections[cursor.section]

    current.value = section
    index.value = cursor.section

    play(section)
  })

  return gig.value.play()
}

export function notesIn (section) {
  const group = section.parts[part.value]
  const all = group ? group.notes : []

  return all.map(note => `${note}2`)
}

export function play (section) {
  const notes = notesIn(section)
  const duration = (section.duration * gig.value.interval) / 1000

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(notes, duration)
  })

  return sampler
}

export function stop () {
  // gig.value.stop()
  gig.value.kill()
  gig.value = {}

  current.value = {}
  index.value = 0
  playing.value = false
}

export function resume () {
}

// TODO: Remvoe track, just for testing
export function toggle (track) {
  if (playing.value) {
    stop()
  } else if (!gig.value.source) {
    load(track)
    // resume()
  } else {
    // TOOD: Probably just call clear on load no matter what if gig object exists
    gig.value.kill()
    gig.value.play()
  }
}

export function sample (note) {
  const pitch = note.name.replace(/#/, 's')
  const url = `${pitch}.mp3`

  return url
}

const urls = notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {})

// @see: https://github.com/sustained/sforzando/blob/master/src/library/instruments.js
export const sampler = new Sampler({
  release: 1,
  baseUrl: 'http://127.0.0.1:8086/',
  // baseUrl: 'http://192.168.0.155:8086',
  urls
}).toDestination()
