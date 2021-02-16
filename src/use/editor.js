// import { save } from '@/use/tracks'
import { compose } from 'bach-js'
import template from '@/bach/template.bach'

import { ref } from '@vue/composition-api'
import { reactify, useStorage, useClipboard } from '@vueuse/core'
// import { nanoid } from 'nanoid'

// TODO: Integrate into `input` function
export const store = useStorage('bach-editor')

// export const id = ref(nanoid(6))
export const name = ref('Starter Track')
// TODO: Rename to `bach` or `source`
export const track = ref(template)
export const draft = ref(template)

export const jsonify = reactify((bach) => JSON.stringify(compose(bach), null, 2))

// TODO: Try to `compose`, catch errors, update list of errors if so
// export const commit = (source, key) => {
// export const commit = ({ id, name, source } = {}) => {
export const commit = (state = {}) => {
  // id.value = state.id || id.value
  name.value = state.name || name.value
  track.value = state.source || draft.value
  dirty.value = false

  // console.log('saving track!', id.value, name.value, track.value)

  // save(track.value, id.value)
  // save({ id: id.value, name: name.value, source: track.value })
  // save({ name: name.value, source: track.value })

  console.log('SAVED!')
}

export const input = (code) => {
  draft.value = code
  dirty.value = true
}

// export const dark = usePreferredDark()

export const clipboard = useClipboard()

export const dirty = ref(false)

export default { store, draft, jsonify, clipboard, dirty }
