import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref } from '@vue/composition-api'
import { reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const track = ref(template)
export const draft = ref(template)

export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

// TODO: Try to `compose`, catch errors, update list of errors if so
export const commit = () => {
  track.value = draft.value
  dirty.value = false
}

export const input = (code) => {
  draft.value = code
  dirty.value = true
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export const dirty = ref(false)

export default { store, draft, jsonify, clipboard, dirty }
