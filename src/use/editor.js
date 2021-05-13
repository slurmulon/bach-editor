import { update } from '@/use/tracks'
import { selected } from '@/use/tracks'
import { playable } from '@/bach/validate'
import { warn } from '@/use/warn'
import { ok, fail } from '@/use/notify'
import { compose } from 'bach-js'
import { composer } from '@/bach/compose'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const draft = ref('')
export const parsed = ref(null)
export const dirty = ref(false)
export const tab = ref(0)
export const compiling = ref(false)

export const code = computed(() => draft.value)
// TODO: Use computedAsync instead, that way we don't have to || selected.value and complicate reactivity
export const bach = computed(() => compose(parsed.value || selected.value.source))
export const json = computed(() => JSON.stringify(bach.value, null, 2))
export const name = computed(() => selected.value ? selected.value.name : '')

export async function compile (source) {
  compiling.value = true

  try {
    console.time('compile')
    const bach = await composer(source)
    console.timeEnd('compile')

    if (playable(bach)) {
      parsed.value = bach

      return bach
    }
  } catch (err) {
    fail({ text: `<p><b>Track compilation failed!</b><p>${err}`, timeout: 5000 })

    console.error(err)
  } finally {
    compiling.value = false
  }
}

export async function load (source) {
  return new Promise((resolve, reject) => {
    const action = async () => {
      input(source, true)
      await compile(source)
      resolve(source)
    }

    if (dirty.value) {
      warn({
        problem: 'selecting-dirty',
        then: () => action(),
        deny: () => reject(),
      })
    } else {
      action()
    }
  })
}

export async function commit (state = {}) {
  const ok = await compile(draft.value)

  if (ok) {
    update({ source: draft.value })
    input(state.source || draft.value, true)
  } else {
    throw Error('Failed to commit changes, invalid bach')
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

    ok({ text: 'Copied code to clipboard!' })
  } else {
    fail({ text: 'Copying not supported or permitted on device!' })
  }
}

export const clipboard = useClipboard()
