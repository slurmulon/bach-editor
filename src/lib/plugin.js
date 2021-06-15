// AppBachEditor
import BachEditor from '@/components/Editor'
import BachPlayer from '@/components/Player'
import BachControls from '@/components/Controls'
import BachPreferences from '@/components/Preferences'

import BachLayout from '@/components/Layout'
import BachTrackDrawer from '@/components/drawer/Tracks'
import BachInfoDrawer from '@/components/drawer/Info'

module.exports = {
  install (Vue, options) {
    const { modules } = options

    Vue.component('v-bach-editor', BachEditor)
    Vue.component('v-bach-player', BachPlayer)
    Vue.component('v-bach-controls', BachControls)
    Vue.component('v-bach-preferences', BachPreferences)
    Vue.component('v-bach-layout', BachLayout)
    Vue.component('v-bach-track-drawer', BachTrackDrawer)
    Vue.component('v-bach-info-drawer', BachInfoDrawer)

    // Vue.prototype.$editor = require('@/use/app').setup(options)

    // TODO: do this in HOC wrapper
    // Vue.prototype.$use = module => {
    //   return modules.use[module] || import(`@/use/${module}`)
    // }
  }
}
