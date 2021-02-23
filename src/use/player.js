import { selected as track } from '@/use/tracks'
import { bach } from '@/use/editor'
import { all as notes } from '@/core/notes'

import { Gig } from 'gig'
import { Sections } from 'bach-js'
import * as Tone from 'tone'
import { Sampler } from 'tone'
import { ref, computed, watch } from '@vue/composition-api'
import { reactify } from '@vueuse/core'

export const gig = ref({})
export const current = ref({})
export const index = ref(0)
export const part = ref('chord')

export const music = computed(() => new Sections(track.value.source))
export const sections = computed(() => music.value.all || [])
export const measures = computed(() => music.value.measures || [])
export const headers = computed(() => music.value.source.headers || {})
export const playing = computed(() => gig.value.playing)
export const seconds = reactify(duration => music.value.durations.cast(duration, { as: 'second' }))

watch(track, (next, prev) => {
  if (gig.value && next && prev && next.id !== prev.id) {
    stop()
  }
})

export async function load (source) {
  await Tone.loaded()

  gig.value = new Gig({
    source,
    loop: true
  })

  gig.value.on('beat:play', () => {
    const { sections, cursor } = gig.value
    const section = sections[cursor.section]

    current.value = section
    index.value = cursor.section

    play(section)
  })

  return gig.value.play()
}

export function notesIn (section, part) {
  const group = section.parts[part]
  const all = group ? group.notes : []
  const notes = Array.isArray(all) ? all : [all]

  return notes.map(note => `${note}2`)
}

export function play (section) {
  const notes = notesIn(section, part.value)
  const duration = seconds(section.duration).value

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(notes, duration)
  })

  return sampler
}

export function stop () {
  if (gig.value.source) {
    gig.value.kill()
    gig.value = {}
  }

  current.value = {}
  index.value = 0
}

export function restart () {
  gig.value.kill()
  gig.value.play()
}

export function toggle () {
  if (playing.value) {
    stop()
  } else if (gig.value.source) {
    restart()
  } else {
    load(bach.value)
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
  urls
}).toDestination()
