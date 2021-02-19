import { ref } from '@vue/composition-api'
import { set } from '@vueuse/core'

export const open = ref(false)
export const then = ref(null)
export const deny = ref(null)
export const text = ref('')
export const icon = ref('mdi-alert-box')

export function ask (props) {
  reset()

  set(open, true)
  set(then, props.then)
  set(deny, props.deny)
  set(text, props.text)
  set(icon, props.icon || icon.value)
}

export function warn ({ problem, ...props }) {
  const warning = warnings[problem]

  if (typeof warning === 'object') {
    ask({ ...warning, ...props })
  } else {
    throw Error(`Cannot warn, provided unsupported problem key: ${problem}`)
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

export const warnings = {
  changes: {
    text: 'You will lose unsaved changes if you change tracks.'
  },
  removing: {
    text: 'You will lose unsaved changes if you delete this track.'
  }
}
