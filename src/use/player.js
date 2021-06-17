import { emit } from '@/use/app'
import { selected as track } from '@/use/tracks'
import { bach } from '@/use/editor'
import * as audio  from '@/use/audio'

import { Gig, clock } from 'gig'
import { Music, Note } from 'bach-js'
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

function tick (gig) {
  if (gig.expired) return

  const beat = gig.metronome
  const completion = gig.progress
  const play = settings.value.metronome && beat !== metronome.value

  if (completion <= 1) {
    if (play) {
      emit('play:metronome', beat, gig)
    }

    metronome.value = beat
    progress.value = completion * 100
  } else {
    progress.value = 0
    metronome.value = 0
  }
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
    timer: gig => clock(gig, tick),
    loop: settings.value.loop
  })

  gig.value.on('play:beat', play)
  gig.value.on('stop', () => stop(false))

  await audio.play()

  gig.value.play()
}

export function play (beat) {
  current.value = beat
  played.value = Date.now()

  emit('play:beat', beat)
}

export function stop (kill = true) {
  if (kill && gig.value.source) {
    gig.value.kill()
  }

  emit('stop')
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
    emit('gain:volume', volume)
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
  emit('mute:volume', yes)
}

export const DECIBALS = { min: -24, max: 4 }
