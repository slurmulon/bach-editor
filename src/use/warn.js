import { ref } from '@vue/composition-api'
import { set, reactify, useStorage } from '@vueuse/core'

export const open = ref(false)
export const then = ref(null)
export const deny = ref(null)
export const prob = ref('')
export const text = ref('')
export const icon = ref('mdi-alert-box')
export const ignorable = ref(true)

export const ignored = useStorage('bach-editor-ignored-warns', {
  'selecting-dirty': false,
  'removing-dirty': false,
  'removing-one': false
})

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
  set(ignorable, props.ignorable || scenarios[props.problem].ignorable)
}

export function warn (props) {
  const problem = props.problem || prob.value
  const scenario = scenarios[problem]

  if (typeof scenario === 'object') {
    const concerned = !ignoring(problem).value

    commit({ ...scenario, ...props }, concerned)

    if (scenario.ignorable && !concerned) {
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
  'selecting-dirty': {
    text: 'You will lose unsaved changes if you change tracks!',
    ignorable: true
  },
  'removing-dirty': {
    text: 'You will lose unsaved changes if you delete this track!',
    ignorable: true
  },
  'removing-one': {
    text: 'Are you sure you want to delete this track?',
    ignorable: true
  },
  'nuking-all': {
    text: 'You are about to delete every track except the one you have selected!',
    ignorable: false
  }
}
