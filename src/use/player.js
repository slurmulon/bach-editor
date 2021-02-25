import { selected as track } from '@/use/tracks'
import { bach } from '@/use/editor'

import { Gig } from 'gig'
import { Sections } from 'bach-js'
import * as Tone from 'tone'
import { Sampler } from 'tone'
import { note } from '@tonaljs/tonal'
import { ref, computed, watch } from '@vue/composition-api'
import { get, set, reactify, useStorage, useDebounceFn } from '@vueuse/core'

export const gig = ref({})
export const current = ref({})
export const index = ref(0)
export const part = ref('chord')
export const played = ref(Date.now())

export const settings = useStorage('bach-editor-player-settings', {
  volume: 0,
  muted: false,
  loop: true,
  follow: true,
  coder: true
})

export const music = computed(() => new Sections(track.value.source))
export const sections = computed(() => music.value.all || [])
export const measures = computed(() => music.value.measures || [])
export const durations = computed(() => music.value.durations || {})
export const headers = computed(() => music.value.source.headers || {})

export const playing = computed(() => gig.value.playing)
export const seconds = reactify(duration => music.value.durations.cast(duration, { as: 'second' }))

export const configure = useDebounceFn(opts => set(settings, { ...get(settings), ...opts }), 8)

watch(track, (next, prev) => {
  if (gig.value && next && prev && next.id !== prev.id) {
    stop()
  }
})

export async function load (source) {
  await Tone.loaded()

  gig.value = new Gig({
    source,
    loop: settings.value.loop
  })

  gig.value.on('beat:play', () => {
    const { sections, cursor } = gig.value
    const section = sections[cursor.section]

    current.value = section
    index.value = cursor.section
    played.value = Date.now()

    play(section)
  })

  gig.value.on('stop', () => {
    reset()
  })

  return gig.value.play()
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
  }

  reset()
}

export function restart () {
  reset()

  gig.value.kill()
  gig.value.play()
}

export function reset () {
  gig.value = {}
  current.value = {}
  index.value = 0
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

export function gain (decibals) {
  const volume = Math.max(DECIBALS.min, Math.min(DECIBALS.max, decibals))
  const audible = volume > DECIBALS.min

  if (audible) {
    configure({ volume: decibals })

    sampler.volume.value = volume
  } else {
    mute()
  }
}

export function loops (yes = true) {
  configure({ loop: yes })

  gig.value.loops = yes
}

export function mute (yes = true) {
  configure({ muted: yes })

  // FIXME: This doesn't seem to have an effect on the actual volume (tone.js issue, it seems)
  sampler.volume.mute = yes
}

export function notesIn (section, part) {
  const group = section.parts[part]
  const all = group ? group.notes : []
  const notes = Array.isArray(all) ? all : [all]

  return notes.map(note => `${note}2`)
}

export function sampleOf (note) {
  const pitch = note.name.replace(/#/, 's')
  const url = `${pitch}.mp3`

  return url
}

export const notes = ['Ab2', 'A2', 'Bb2', 'B2', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2'].map(note)

export const samples = notes.reduce((map, note) => ({ ...map, [note.name]: sampleOf(note) }), {})

// @see: https://github.com/sustained/sforzando/blob/master/src/library/instruments.js
export const sampler = new Sampler({
  release: 1,
  urls: samples,
  baseUrl: 'http://127.0.0.1:8086/'
  // baseUrl: process.env.VUE_APP_AUDIO_SERVER_BASE_URL
}).toDestination()

export const DECIBALS = { min: -24, max: 4 }
