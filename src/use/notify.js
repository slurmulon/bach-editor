import { ref } from '@vue/composition-api'
import { set, useDebounceFn } from '@vueuse/core'

export const open = ref(false)
export const text = ref('')
export const color = ref('primary accent-4')
export const timeout = ref(2500)

export const ok = useDebounceFn((props) => notify({ ...props, color: 'success' }), 250)
export const fail = useDebounceFn((props) => notify({ ...props, color: 'error' }), 250)

export function notify (props) {
  set(open, true)
  set(text, props.text)
  set(color, props.color || color.value)
  set(timeout, props.timeout || timeout.value)
}
