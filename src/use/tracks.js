import { input } from '@/use/editor'
import template from '@/bach/template.bach'
import lib from '../../package'

import { computed } from '@vue/composition-api'
import { get, set, reactify, useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

export const version = useStorage('bach-editor-version', lib.version)
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

export const any = computed(() => Object.keys(get(store)).length)

export const find = reactify((id) => get(store)[id])

export const current = computed(() => find(get(context).current).value)

export const selected = computed(() => get(any) ? get(current) : starter())

export const select = ({ id }) => set(context, { current: id })

export function create ({ name, source }) {
  const template = starter()
  const track = {
    id: nid(),
    name: name || template.name,
    source: source || template.source,
    created: Date.now()
  }

  save(track)
  select(track)
  input(track.source, true)
}

export function edit (ref) {
  const track = resolve(ref)

  if (track) {
    select(track)
    input(track.source, true)
  } else {
    console.error('Track not found', ref)
  }
}

export function resolve (ref) {
  if (typeof ref === 'string') {
    const all = get(store)
    const track = all[ref]

    return track
  }

  return ref
}

export function save (track) {
  const id = track.id || nid()
  const stored = get(find(id))
  const updated = Date.now()
  const changes = { id, ...stored, ...track, updated }

  set(store, { ...get(all), [id]: changes })
}

export function update (track) {
  save({ id: get(current).id, ...track })
}

// TODO: Determine if major version change, if so clear out the user's data after offering a way to export everything
export function load () {
  const track = get(current)

  if (!track) {
    return create(starter())
  }

  input(track.source, true)
}

export const starter = () => ({ name: 'Starter Track', source: template })

export default { store }
