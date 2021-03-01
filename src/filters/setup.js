import { numberless, fractionize, meter, round, when } from './'
import Vue from 'vue'

Vue.filter('numberless', numberless)
Vue.filter('fractionize', fractionize)
Vue.filter('meter', meter)
Vue.filter('round', round)
Vue.filter('when', when)
