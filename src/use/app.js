import { ref } from '@vue/composition-api'
import Emitter from 'tiny-emitter'

export const app = ref(null)

export function use (runtime, options = {}) {
  // TODO: Use https://github.com/developit/mitt instead, for Vue 3 compatibility
  // @see: https://v3.vuejs.org/guide/migration/events-api.html#migration-strategy
  // const channel = new Vue()
  const emitter = new Emitter()

  app.value = runtime({
    use: require('@/use'),
    emitter,
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter),
    once: emitter.once.bind(emitter),
    emit: emitter.emit.bind(emitter)
  }, options)
}

export function emit (topic, ...args) {
  app.value.emit(topic, ...args)
}

export function clear () {

}

export default { app, use, emit }

// NEXT UP: Add props and slots wherever possible to every component and then use HOC to populate the default implementation for web localstorage
