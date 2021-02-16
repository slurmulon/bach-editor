import { input } from '@/use/editor'
import template from '@/bach/template.bach'

import { computed } from '@vue/composition-api'
import { get, set, reactify, useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

// export const version = useStorage('bach-editor-version', '1.0')
export const store = useStorage('bach-editor-tracks', {})
export const context = useStorage('bach-editor-tracks-context', { current: null })

export const nid = () => nanoid(6)

export const all = computed(() => {
  const stored = get(store)

  return Object.entries(stored)
    .sort((left, right) => left[1].created - right[1].created)
    .reduce((acc, [key, value]) => {
      return { ...acc, [key]: value }
    }, {})
})

export const head = computed(() => get(all)[0])
export const tail = computed(() => {
  const list = get(all)
  return list[list.length - 1]
})

export const any = computed(() => Object.keys(get(store)).length)

export const find = reactify((id) => get(store)[id])

export const current = computed(() => find(get(context).current).value)

export const select = ({ id }) => set(context, { current: id })

export const create = ({ name, source }) => {
  console.log('CREATING TRACK!!!', name, source)
  const template = starter()
  const track = {
    id: nid(),
    name: name || template.name,
    source: source || template.source,
    created: Date.now()
  }

  console.log('--- creatd track source', track)

  save(track)
  select(track)
  input(track.source, true)
}

export const edit = (ref) => {
  const track = resolve(ref)

  console.log('EDITING TRACK!', track)

  if (track) {
    select(track)
    input(track.source, true)
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
  const id = track.id || nid()
  const stored = get(find(id))
  const updated = Date.now()
  const changes = { id, ...stored, ...track, updated }

  console.log('track save changes', track, changes, get(current))

  set(store, { ...get(all), [id]: changes })
}

export const update = (track) => save({ id: get(current).id, ...track })

export const starter = () => ({ name: 'Starter Track', source: template })

export function load () {
  const track = get(current)

  console.log('loading track!', track)

  if (!track) {
    return create(starter())
  }

  input(track.source, true)
}

export default { store }
