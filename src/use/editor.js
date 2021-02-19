import { update } from '@/use/tracks'
import { selected } from '@/use/tracks'
import { validate as inspect } from '@/schemas/bach/sections'
import { warn } from '@/use/warn'
import { ok, fail } from '@/use/notify'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const draft = ref('')
export const dirty = ref(false)
export const tab = ref(0)

export const code = computed(() => draft.value)
export const bach = computed(() => compose(selected.value.source))
export const json = computed(() => JSON.stringify(bach.value, null, 2))
export const name = computed(() => selected.value ? selected.value.name : '')

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
      warn({
        problem: 'changes',
        then: () => action(),
        deny: () => reject(),
      })
    } else {
      action()
    }
  })
}

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
    const tabs = [code.value, json.value]
    const content = tabs[tab.value]

    clipboard.copy(content)

    ok({ text: 'Copied data to clipboard!' })
  } else {
    fail({ text: 'Copying not supported or permitted on device!' })
  }
}

export const clipboard = useClipboard()
