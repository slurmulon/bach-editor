import { update } from '@/use/tracks'
import { current } from '@/use/tracks'
import { validate as inspect } from '@/schemas/bach/sections'
import { ok, fail } from '@/use/notify'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { get, set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const store = useStorage('bach-editor')

export const draft = ref('')
export const dirty = ref(false)

export const code = computed(() => draft.value.trim())
export const bach = computed(() => compose(current.value.source))
// WARN: Probably don't want to do this b/c it's too centralized to be shooting off notifications (will lead to conflicts and dupes)
// export const bach = computed(() => parse(current.value.source))
export const name = computed(() => current.value ? current.value.name : '')

// TODO: Also report warnings, such as the track only supporting chords (needs at least 1)
export const validate = (source) => {
  try {
    const bach = compose(source)

    return inspect(bach)
  } catch (err) {
    fail({ text: 'Track compilation failed!' })

    console.error(err)

    return false
  }
}

// TODO: Try to `compose`, catch errors, update list of errors if so
export const commit = (state = {}) => {
  const valid = validate(draft.value)

  if (valid) {
    update({ source: draft.value })

    set(draft, state.source || draft.value)
    set(dirty, false)
  }
}

export const input = (source, pristine) => {
  set(draft, source)
  set(dirty, !pristine)
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export default { store, draft, name, clipboard, dirty }
