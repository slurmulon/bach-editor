import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref } from '@vue/composition-api'
import { reactify, useStorage, useClipboard, usePreferredDark } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref(template)
// export const draft = {
//   code: ref(template)
// }
//
// export const jsonify = reactify(compose)
export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

export const dark = usePreferredDark()

export const clipboard = useClipboard()

export default { store, draft, jsonify, dark, clipboard }
