import { update } from '@/use/tracks'
import { current } from '@/use/tracks'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { get, reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref('')
export const name = computed(() => get(current).name)

export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

// TODO: Try to `compose`, catch errors, update list of errors if so
// export const commit = (source, key) => {
// export const commit = ({ id, name, source } = {}) => {
export const commit = (state = {}) => {
  update({ source: draft.value })

  dirty.value = false

  // TODO: Notification
}

export const input = (code) => {
  draft.value = code
  dirty.value = true
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export const dirty = ref(false)

export default { store, draft, name, jsonify, clipboard, dirty }
