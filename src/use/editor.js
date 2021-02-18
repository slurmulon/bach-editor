import { update } from '@/use/tracks'
import { current } from '@/use/tracks'
import { validate as inspect } from '@/schemas/bach/sections'
import { ask } from '@/use/ask'
import { ok, fail } from '@/use/notify'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref('')
export const dirty = ref(false)

export const code = computed(() => draft.value.trim())
export const bach = computed(() => compose(current.value.source))
export const name = computed(() => current.value ? current.value.name : '')

export const validate = (source) => {
  try {
    const bach = compose(source)

    if (inspect(bach)) {
      ok({ text: 'Track compiled successfully!' })

      return true
    }
  } catch (err) {
    fail({ text: 'Track compilation failed!' })

    console.error(err)
  }
}

export function load (source) {
  return new Promise((resolve, reject) => {
    const action = () => {
      input(source, true)
      resolve(source)
    }

    if (dirty.value) {
      ask({
        then: () => action(),
        deny: () => reject(),
        text: 'You will lose your unsaved changes if you switch tracks. Continue?'
      })
    } else {
      action()
    }
  })
}

// export function load (source) {
//   if (dirty.value) {
//     ask({
//       then: () => input(source, true),
//       text: 'You will lose your unsaved changes if you switch tracks. Continue?'
//     })
//   } else {
//     input(source, true)
//   }
// }

export function commit (state = {}) {
  const valid = validate(draft.value)

  if (valid) {
    update({ source: draft.value })

    set(draft, state.source || draft.value)
    set(dirty, false)
  }
}

export function input (source, pristine) {
  set(draft, source)
  set(dirty, !pristine)
}

export function copy () {
  if (clipboard.isSupported) {
    clipboard.copy(draft.value)

    ok({ text: 'Code copied to clipboard!' })
  } else {
    fail({ text: 'Copying not supported or permitted on device!' })
  }
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export default { store, draft, name, clipboard, dirty }
