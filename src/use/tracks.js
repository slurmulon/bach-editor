// import { commit } from '@/use/editor'
import { input } from '@/use/editor'
import template from '@/bach/template.bach'

import { computed } from '@vue/composition-api'
import { get, set, reactify, useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

// export const version = useStorage('bach-editor-version', '1.0')
export const store = useStorage('bach-editor-tracks', {})
export const context = useStorage('bach-editor-tracks-context', { current: null })

export const nid = () => nanoid(6)

// export const all = computed(() => get(store).sort((left, right) => left.time.created - right.time.created))
export const all = computed(() => {
  const stored = get(store)

  // get(store).sort((left, right) => left.time.created - right.time.created))
  return Object.entries(stored)
    .sort((left, right) => left[1].created - right[1].created)
    .reduce((acc, [key, value]) => {
      return { ...acc, [key]: value }
    }, {})
})

export const any = computed(() => Object.keys(get(store)).length)

// export const find = reactify((id) => get(store).find(track => id === track.id))
// export const find = reactify((id) => get(store)[id])
export const find = reactify((id) => get(store)[id])

// export const current = computed(() => get(store).sort((left, right) => left.time.created - right.time.created))

// export const current = computed(() => {
//   get(all)[0]
// )

// export const all = computed(() => get(store))

// export const list = computed(() => Object.entries(all.value).map(([id, track]) => ({
// }))

export const current = computed(() => find(get(context).current).value)

export const select = ({ id }) => {
  console.log('@@@ selecting track', id)
  set(context, { current: id })
}

// export const create = (track) => {
export const create = ({ name, source }) => {
  // const id = nid()

  // save(track, id)

  const track = {
    id: nid(),
    name,
    source,
    created: Date.now()
  }

  save(track)
  select(track)
  input(track.source)
}

export const edit = (ref) => {
  // const all = get(store)
  // const track = all[id]
  const track = resolve(ref)

  console.log('editing track', ref, track)

  if (track) {
    // commit(track, id)
    select(track)
    // commit(track)
    input(track.source)

    // console.log('--- selected track', get(current))
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

export const save = (track) => {
  // const track = get(current)
  const id = track.id || nid()
  const stored = get(find(id))
  const updated = Date.now()
  const changes = { id, ...stored, ...track, updated }

  console.log('track save changes', track, changes, get(current))

  // set(store, { ...get(all), [id]: track })
  set(store, { ...get(all), [id]: changes })
}

// export const update = save
export const update = (track) => save({ id: get(current).id, ...track })

// TODO: Probably move this into use/editor instead
// export const save = (track, id) => {
// export const save = ({ id, name, source }) => {
//   // const all = get(store)
//   const track = { id, name, source }

//   console.log('--- all tracks', all)
//   // console.log('--- updated tracks', { ...all, [id]: track })

//   set(store, { ...get(all), [id]: track })

//   return track
// }

// export const starter = () => ({ id: nid(), name: 'Starter Track', source: template })
export const starter = () => ({ name: 'Starter Track', source: template })

export function load () {
  console.log('LOADING TRACKS!!!!')
  // const stored = get(all)

  // if (!stored || !Object.keys(stored).length) {
  if (!get(any)) {
    // return save(starter())
    // return save(starter())
    return create(starter())
    // TODO: select/commit
  }

  // const { source } = get(current)
  const track = get(current)

  // return get(current)
  input(track.source)
}

export default { store }
