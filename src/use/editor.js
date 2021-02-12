import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref } from '@vue/composition-api'
import { reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const track = ref(template)
export const draft = ref(template)
// export const draft = {
//   code: ref(template)
// }
//
// export const jsonify = reactify(compose)
export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

// TODO: Try to `compose`, catch errors, update list of errors if so
export const commit = () => { track.value = draft.value }

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export default { store, draft, jsonify, clipboard }
