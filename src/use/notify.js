import { ref } from '@vue/composition-api'
import { set, useDebounceFn } from '@vueuse/core'

export const init = {
  open: false,
  text: '',
  color: 'primary accent-4',
  // icon: 'mdi-tick-circle',
  icon: '',
  timeout: 2500,
  attrs: null
}

export const open = ref(init.open)
export const text = ref(init.text)
export const color = ref(init.color)
export const icon = ref(init.icon)
export const timeout = ref(init.timeout)
export const attrs = ref(init.attrs)

export const ok = useDebounceFn((props) => notify({
  color: 'success',
  attrs: { multiLine: true },
  ...props,
}), 250)

export const fail = useDebounceFn((props) => notify({
  color: 'error',
  icon: 'alert-circle',
  attrs: { vertical: true, multiLine: true },
  ...props,
}), 250)

export function notify (props) {
  reset()

  set(open, true)
  set(text, props.text)
  set(color, props.color || color.value)
  set(icon, props.icon || icon.value)
  set(timeout, props.timeout || timeout.value)
  set(attrs, props.attrs || attrs.value)
}

export function reset () {
  set(open, init.open)
  set(text, init.text)
  set(color, init.color)
  set(icon, init.icon)
  set(timeout, init.timeout)
  set(attrs, init.attrs)
}
