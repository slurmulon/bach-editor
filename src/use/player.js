import { selected as track } from '@/use/tracks'
import { bach } from '@/use/editor'
import * as audio  from '@/use/audio'

import { Gig } from 'gig'
import { Music, Note, MUSICAL_ELEMENTS } from 'bach-js'
import * as Tone from 'tone'
import { Sampler } from 'tone'
import { note } from '@tonaljs/tonal'
import { ref, computed, watch } from '@vue/composition-api'
import { get, set, reactify, useStorage, useRafFn, useDebounceFn } from '@vueuse/core'

const synth = new Tone.Synth().toDestination()

export const gig = ref({})
export const current = ref({})
export const metronome = ref(null)
export const progress = ref(null)
export const played = ref(Date.now())

export const settings = useStorage('bach-editor-player-settings', {
  volume: 0,
  muted: false,
  loop: true,
  follow: true,
  coder: true,
  metronome: true
})

export const music = computed(() => new Music(bach.value))
export const beats = computed(() => get(music).beats || [])
export const durations = computed(() => get(music).durations || {})

export const playing = computed(() => get(gig).playing)
export const seconds = reactify(duration => get(durations).cast(duration, { as: 'second' }))

export const configure = useDebounceFn(opts => set(settings, { ...get(settings), ...opts }), 8)

export const playable = reactify(beat => Object
  .keys(beat.parts)
  .sort((a, b) => MUSICAL_ELEMENTS.indexOf(a) - MUSICAL_ELEMENTS.indexOf(b))[0])

function tick (gig) {
  if (gig.expired) return

  const beat = gig.metronome
  const completion = gig.progress
  const beep = settings.value.metronome && beat !== metronome.value

  if (completion <= 1) {
    if (beep) {
      const scale = gig.elements.find(({ kind }) => kind === 'scale')
      const note = (scale && scale.notes[0]) || 'a'
      const octave = beat === 0 ? 5 : 4
      const pitch = (note && `${note}${octave}`)// || 440.0
      const duration = gig.durations.cast(1, { is: '32n', as: 'second' })

      synth.volume.value = settings.value.volume * .65
      synth.triggerAttackRelease(pitch, duration)
    }

    metronome.value = gig.metronome
    progress.value = completion * 100
  } else {
    progress.value = 0
    metronome.value = 0
  }
}

// TODO: Replace this raf impl with a Tone based clock since it comes with state management already and is generally more pragmatic
// TODO: Consider pushing into Gig, common enough use case
function clock (gig) {
  let last = null
  let interval = null
  let paused = null

  const loop = (time) => {
    const { cursor, expired } = gig

    if (expired) return cancel()
    if (cursor !== last) {
      last = cursor

      gig.step()
    }

    tick(gig)

    interval = requestAnimationFrame(loop)
  }

  const cancel = () => {
    cancelAnimationFrame(interval)

    interval = null
  }

  const timer = {
    play () {
      loop(Date.now())
    },

    pause () {
      paused = Date.now()
      cancel()
    },

    resume () {
      gig.times.origin = Date.now()
      gig.times.last = null

      timer.play()
    },

    stop () {
      last = null
      cancel()
    }
  }

  timer.play()

  return timer
}

watch(track, (next, prev) => {
  if (gig.value && next && prev && next.id !== prev.id) {
    stop()
  }
})

export async function load (source) {
  await Tone.loaded()

  gig.value = new Gig({
    source,
    timer: clock,
    loop: settings.value.loop,
    stateless: true
  })

  gig.value.on('play:beat', beat => play(beat))
  gig.value.on('stop', () => reset())

  await audio.play()

  gig.value.play()
}

export function play (beat) {
  current.value = beat
  played.value = Date.now()

  beat.items.forEach(item => {
    const elems = beat.either(['chord', 'scale', 'note'])
    const notes = beat.notesOf(elems)

    // FIXME: Works but if both items have the same notes it will play them twice, which causes fuzz/static
    sampler.triggerAttackRelease(
      Note.unite(notes).map(note => `${note}2`),
      item.duration
    )
  })
}

export function stop () {
  if (gig.value.source) {
    gig.value.kill()
  }

  audio.stop()
  reset()
}

export function restart () {
  reset()

  gig.value.kill()
  gig.value.play()

  audio.restart()
}

export function reset () {
  gig.value = {}
  current.value = {}
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
  return beat.notes.map(note => `${note}2`)
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
