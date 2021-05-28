import { selected as track, upsert } from '@/use/tracks'

import { computed } from '@vue/composition-api'
import * as Tone from 'tone'

export const current = computed(() => track.value.audio)

export const player = new Tone.Player()

// export async function load (url) {
export async function play () {
  const url = current.value

  if (url) {
    await player.load(url)

    player.toMaster()
    player.start()
  }
}

export function stop () {
  player.stop()
}

export function save (url) {
  upsert({ audio: url })
}
