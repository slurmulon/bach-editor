import { ref } from '@vue/composition-api'
import { set, useStorage } from '@vueuse/core'

export const open = ref(false)
export const then = ref(null)
export const deny = ref(null)
export const text = ref('')
export const icon = ref('mdi-alert-box')

export const ignored = useStorage('bach-editor-ignored-warns', { changes: false, removing: false })

export function commit (props) {
  reset()

  set(open, true)
  set(then, props.then)
  set(deny, props.deny)
  set(text, props.text)
  set(icon, props.icon || icon.value)
}

export function warn ({ problem, ...props }) {
  const scenario = scenarios[problem]

  if (typeof scenario === 'object') {
    ask({ ...scenario, ...props })
  } else {
    throw Error(`Cannot warn, provided unsupported problem scenario key: ${problem}`)
  }
}

export function yes (opts) {
  if (typeof then.value === 'function') {
    then.value(opts)
  }

  set(open, false)
}

export function no (opts) {
  if (typeof deny.value === 'function') {
    deny.value(opts)
  }

  set(open, false)
}

export function reset () {
  set(then, null)
  set(text, '')
  set(icon, 'mdi-alert-box')
}

export const scenarios = {
  changes: {
    text: 'You will lose unsaved changes if you change tracks.'
  },
  removing: {
    text: 'You will lose unsaved changes if you delete this track.'
  }
}
