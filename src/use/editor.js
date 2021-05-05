import { update } from '@/use/tracks'
import { selected } from '@/use/tracks'
import { validate as inspect } from '@/schemas/bach/sections'
import { warn } from '@/use/warn'
import { ok, fail } from '@/use/notify'
import { compose } from 'bach-js'
import { compose as composeAsync } from '@/bach/compose'
import template from '@/bach/template.bach'

import { ref, computed } from '@vue/composition-api'
import { set, reactify, useStorage, useClipboard } from '@vueuse/core'

export const draft = ref('')
export const parsed = ref(null)
export const dirty = ref(false)
export const tab = ref(0)
export const loading = ref(false)

export const code = computed(() => draft.value)
// export const bach = computed(() => compose(selected.value.source))
export const bach = computed(() => {
  console.log('--- use/editor bach', parsed.value)
  return compose(parsed.value || selected.value.source)
})
export const json = computed(() => JSON.stringify(bach.value, null, 2))
export const name = computed(() => selected.value ? selected.value.name : '')

// export const validate = (source) => {
export const validate = async (source) => {
  console.log('!!!!! VALIDATING')
  loading.value = true

  try {
    console.time('c')
    // const bach = compose(source)
    const bach = await composeAsync(source)
    console.timeEnd('c')

    // return inspect(bach)
    if (inspect(bach)) {
      parsed.value = bach

      console.log('!!!!!!! set parsed bach', bach)

      return true
    }

    return false
  } catch (err) {
    fail({ text: 'Track compilation failed!' })

    console.error(err)
  } finally {
    loading.value = false
  }
}

export function load (source) {
  return new Promise((resolve, reject) => {
    const action = () => {
      input(source, true)
      resolve(source)
    }

    parsed.value = null

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

// export function commit (state = {}) {
export async function commit (state = {}) {
  const valid = await validate(draft.value)

  if (valid) {
    update({ source: draft.value })

    set(draft, state.source || draft.value)
    set(dirty, false)
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
