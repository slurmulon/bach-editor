import { update } from '@/use/tracks'
import { current } from '@/use/tracks'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { get, set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref('')
export const dirty = ref(false)

export const code = computed(() => draft.value.trim())
export const bach = computed(() => compose(current.value.source))
export const name = computed(() => current.value ? current.value.name : '')

// TODO: Try to `compose`, catch errors, update list of errors if so
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

export default { store, draft, name, clipboard, dirty }
