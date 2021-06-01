import { selected as track, upsert } from '@/use/tracks'
// import { settings } from '@/use/player'
import { fail } from '@/use/notify'

import { ref, computed } from '@vue/composition-api'
import * as Tone from 'tone'

export const current = computed(() => track.value.audio)

// export const player = new Tone.Player()
export const player = ref(new Tone.Player())

// export async function load (url) {
export async function play () {
  const url = current.value

  if (url) {
    // TODO: try/catch

    try {
      await player.value.load(url)

      player.value.toDestination()
      player.value.start()

      // player.volume.value = settings.value.volume * 0.8
    } catch (e) {
      console.error(e)
      fail({ text: 'Failed to load audio URL!', timeout: 2500 })
    }
  }
}

export function stop () {
  player.value.stop()
}

export function restart () {
  player.value.seek(0)
}

export async function save (url) {
  try {
    if (url) await player.value.load(url)

    upsert({ audio: url })
  } catch (e) {
    console.error(e)
    fail({ text: 'Failed to save, invalid audio URL', timeout: 2500 })
  }
}
