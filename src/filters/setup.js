import { numberless, fractionize, meter, round, numeric, when } from './'
import Vue from 'vue'

Vue.filter('numberless', numberless)
Vue.filter('fractionize', fractionize)
Vue.filter('meter', meter)
Vue.filter('round', round)
Vue.filter('numeric', numeric)
Vue.filter('when', when)
