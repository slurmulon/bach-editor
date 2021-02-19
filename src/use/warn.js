import { ref } from '@vue/composition-api'
import { set, reactify, useStorage } from '@vueuse/core'

export const open = ref(false)
export const then = ref(null)
export const deny = ref(null)
export const prob = ref('')
export const text = ref('')
export const icon = ref('mdi-alert-box')

export const ignored = useStorage('bach-editor-ignored-warns', { changes: false, removing: false })

export const ignoring = reactify(problem => ignored.value[problem || prob.value])

export function ignore (problem) {
  set(ignored, { ...ignored.value, [problem || prob.value]: true })
}

export function commit (props, show = true) {
  reset()

  set(open, show)
  set(then, props.then)
  set(deny, props.deny)
  set(text, props.text)
  set(icon, props.icon || icon.value)
  set(prob, props.prob || props.problem)
}

export function warn (props) {
  const problem = props.problem || prob.value
  const scenario = scenarios[problem]

  if (typeof scenario === 'object') {
    const concerned = !ignoring(problem).value

    commit({ ...scenario, ...props }, concerned)

    if (!concerned) {
      yes()
    }
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
  set(prob, '')
  set(text, '')
  set(icon, 'mdi-alert-box')
}

export const scenarios = {
  changes: {
    text: 'You will lose unsaved changes if you change tracks!'
  },
  removing: {
    text: 'You will lose unsaved changes if you delete this track!'
  }
}
