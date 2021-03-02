import { ref } from '@vue/composition-api'
import { set, reactify, useStorage } from '@vueuse/core'

export const open = ref(false)
export const then = ref(null)
export const deny = ref(null)
export const prob = ref('')
export const text = ref('')
export const icon = ref('mdi-alert-box')
export const ignorable = ref(true)

// TODO: Invert this, so instead of ignore it is warn
//  - Rename to bach-editor-warn-settings
export const ignored = useStorage('bach-editor-ignored-warns', {
  'selecting-dirty': false,
  'removing-dirty': false,
  'removing-one': false
})

export const settings = useStorage('bach-editor-warn-settings', {
  'selecting-dirty': true,
  'removing-dirty': true,
  'removing-one': true
})

// export const ignoring = reactify(problem => ignored.value[problem || prob.value])
export const ignoring = reactify(problem => !settings.value[problem || prob.value])
export const concerned = reactify(problem => settings.value[problem || prob.value])

export function ignore (problem) {
  set(ignored, { ...ignored.value, [problem || prob.value]: true })
}

export function configure (opts) {
  set(settings, { ...settings.value, ...opts })
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
    const concerning = concerned(problem).value

    commit({ ...scenario, ...props }, concerning)

    if (scenario.ignorable && !concerning) {
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
    label: 'Switching tracks with unsaved changes',
    ignorable: true
  },
  'removing-dirty': {
    text: 'You will lose unsaved changes if you delete this track!',
    label: 'Deleting a track with unsaved changes',
    ignorable: true
  },
  'removing-one': {
    text: 'Deleting a track',
    label: 'Deleting a track (always)',
    ignorable: true
  },
  'nuking-all': {
    text: 'You are about to delete every track except the one you have selected!',
    ignorable: false
  }
}

export const configurable = Object.entries(scenarios)
  .filter(entry => entry[1].ignorable)
  .reduce((all, [key, scenario]) => {
    // return [...all, ...(scenario.ignorable ? [{ ...scenario, key }] : null)]
    return [...all, { ...scenario, key }]
  }, [])
