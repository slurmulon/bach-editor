import { selected as track } from '@/use/tracks'
import { bach } from '@/use/editor'

import { Gig } from 'gig'
// import { Sections, MUSICAL_ELEMENTS } from 'bach-js'
import { Music, MUSICAL_ELEMENTS } from 'bach-js'
import * as Tone from 'tone'
import { Sampler } from 'tone'
import { note } from '@tonaljs/tonal'
import { ref, computed, watch } from '@vue/composition-api'
import { get, set, reactify, useStorage, useRafFn, useDebounceFn } from '@vueuse/core'

export const gig = ref({})
export const current = ref({})
export const index = ref(0)
export const metronome = ref(null)
export const progress = ref(null)
export const played = ref(Date.now())

export const settings = useStorage('bach-editor-player-settings', {
  volume: 0,
  muted: false,
  loop: true,
  follow: true,
  coder: true
})

// export const music = computed(() => new Sections(track.value.source))
// export const sections = computed(() => get(music).all || [])
export const music = computed(() => new Music(track.value.source))
export const beats = computed(() => get(music).beats || [])
// export const measures = computed(() => get(music).measures || [])
export const durations = computed(() => get(music).durations || {})
export const headers = computed(() => get(music).data.headers || {})
export const units = computed(() => get(music).units || {})

export const playing = computed(() => get(gig).playing)
// export const seconds = reactify(duration => get(durations).cast(duration, { as: 'second' }))
export const seconds = reactify(duration => get(durations).time(duration, { as: 'second' }))

export const configure = useDebounceFn(opts => set(settings, { ...get(settings), ...opts }), 8)

export const playable = reactify(section => Object
  .keys(section.parts)
  .sort((a, b) => MUSICAL_ELEMENTS.indexOf(a) - MUSICAL_ELEMENTS.indexOf(b))[0])

export const timeline = useRafFn(() => {
  if (playing.value) {
    const { completion } = gig.value

    if (completion <= 1) {
      progress.value = completion * 100
      metronome.value = gig.value.metronome
    } else {
      progress.value = 0
      metronome.value = 0

      timeline.pause()
    }
  }
}, { immediate: false })

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

  gig.value.on('beat:play', ({ beat }) => {
    // const { sections, cursor } = gig.value
    // const section = sections[cursor.section]

    // current.value = section
    // index.value = cursor.section
    current.value = beat
    // TODO: Can probably just remove now!
    // index.value = beat.index
    index.value = gig.value.index
    played.value = Date.now()

    // play(section)
    play(beat)
    timeline.resume()
  })

  gig.value.on('stop', () => reset())

  start()
}

export function start () {
  gig.value.play()
  timeline.resume()
}

export function play (beat) {
  const notes = notesIn(beat, playable(beat).value)
  const duration = seconds(beat.duration).value

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(notes, duration)
  })

  return sampler
}

export function stop () {
  if (gig.value.source) {
    gig.value.kill()
  }

  timeline.pause()
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
  progress.value = null
  metronome.value = null
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
    configure({ volume: decibals, muted: !audible })

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

  // FIXME: Ideal, but this doesn't seem to have an effect on the actual volume (tone.js issue, it seems)
  // sampler.volume.mute = yes
  sampler.volume.value = yes ? -1000 : settings.value.volume
}

export function notesIn (beat, part) {
  // const group = section.parts[part]
  const group = beat.parts[part]
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
  baseUrl: process.env.VUE_APP_AUDIO_SERVER_BASE_URL
}).toDestination()

export const DECIBALS = { min: -24, max: 4 }
