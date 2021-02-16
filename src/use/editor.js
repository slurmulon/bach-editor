import { update } from '@/use/tracks'
import { current } from '@/use/tracks'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { get, set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref('')
export const dirty = ref(false)

export const code = computed(() => get(draft).trim())
export const name = computed(() => current.value ? current.value.name : '')

export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

// TODO: Try to `compose`, catch errors, update list of errors if so
// export const commit = (source, key) => {
// export const commit = ({ id, name, source } = {}) => {
export const commit = (state = {}) => {
  update({ source: draft.value })

  set(draft, state.source || draft.value)
  set(dirty, false)

  // TODO: Notification
}

export const input = (source, pristine) => {
  set(draft, source)
  set(dirty, !pristine)
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export default { store, draft, name, jsonify, clipboard, dirty }
