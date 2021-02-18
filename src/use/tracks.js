// import { input } from '@/use/editor'
import { load as edit } from '@/use/editor'
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
    .sort((left, right) => right[1].created - left[1].created)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
})

export const any = computed(() => Object.keys(get(store)).length)

export const find = reactify((id) => get(store)[id])

export const current = computed(() => find(get(context).current).value)

export const selected = computed(() => get(any) ? get(current) : starter())

export function select ({ id }) {
  set(context, { current: id })
}

// export function open (track) {
//   select(track)
//   // input(track.source, true)
//   edit(track.source)
// }

export function shift (ref) {
  const track = resolve(ref)
  const next = Object.values(get(all))
    .sort((left, right) => right.updated - left.updated)
    .find(({ id }) => track.id !== id)

  select(next)
}

export function destroy (ref) {
  const track = resolve(ref)
  const updated = get(all)

  delete updated[track.id]

  if (get(current).id === track.id) {
    shift(track)
  }

  set(store, updated)
}

// TODO: Enforce max of say 50 tracks due to basic monolithic storage mechanism
export function create ({ name, source }) {
  const template = starter()
  const track = {
    id: nid(),
    name: name || template.name,
    source: source || template.source,
    created: Date.now()
  }

  save(track)
  open(track)
}

// TODO: no-op if trying to re-open the current track
//export function open (ref) {
//  const track = resolve(ref)

//  if (track) {
//    // open(track)
//    //
//    select(track)
//    // input(track.source, true)
//    edit(track.source)
//  } else {
//    console.error('Track not found', ref)
//  }
//}

export async function open (ref) {
  const track = resolve(ref)

  if (track) {
    try {
      await edit(track.source)

      select(track)
    } catch (_) {}
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

  // TODO: Consider validating track with JSON Schema
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

  // input(track.source, true)
  edit(track.source)
}

export const starter = () => ({ name: 'Starter Track', source: template })
