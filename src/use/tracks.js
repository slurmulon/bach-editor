import { commit } from '@/use/editor'
import { computed } from '@vue/composition-api'
import { get, set, useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

export const store = useStorage('bach-editor-tracks', {})

export const all = computed(() => get(store))

// export const list = computed(() => Object.entries(all.value).map(([id, track]) => ({
// }))

// export const create = (track) => {
export const create = ({ name, source }) => {
  const id = nanoid(6)

  // save(track, id)
  save({ id, name, source })
}

export const edit = (ref) => {
  // const all = get(store)
  // const track = all[id]
  const track = resolve(ref)

  if (track) {
    // commit(track, id)
    commit(track)
  } else {
    console.error('Track not found', ref)
  }
}

export const resolve = ref => {
  if (typeof ref === 'string') {
    const all = get(store)
    const track = all[ref]

    return track
  }

  return ref
}

// TODO: Probably move this into use/editor instead
// export const save = (track, id) => {
export const save = ({ id, name, source }) => {
  const all = get(store)
  const track = { id, name, source }

  console.log('--- all tracks', all)
  // console.log('--- updated tracks', { ...all, [id]: track })

  set(store, { ...all, [id]: track })
}

export default { store }
