import { update } from '@/use/tracks'
import { current } from '@/use/tracks'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { get, set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref('')
export const code = computed(() => {
  console.log('code wut', get(draft))
  return get(draft).trim()
})
export const name = computed(() => {
  const track = get(current)

  return track ? track.name : ''
})

export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

// TODO: Try to `compose`, catch errors, update list of errors if so
// export const commit = (source, key) => {
// export const commit = ({ id, name, source } = {}) => {
export const commit = (state = {}) => {
  console.log('COMIT', state)
  update({ source: draft.value })

  // draft.value = state.source || draft.value
  // dirty.value = false

  set(draft, state.source || draft.value)
  set(dirty, false)

  // TODO: Notification
}

export const input = (source) => {
  console.log('inputting source', source)
  draft.value = source
  dirty.value = true
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export const dirty = ref(false)

export default { store, draft, name, jsonify, clipboard, dirty }
