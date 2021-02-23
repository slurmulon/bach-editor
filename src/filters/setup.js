import { numberless, fractionize, meter, round } from './'
import Vue from 'vue'

Vue.filter('numberless', numberless)
Vue.filter('fractionize', fractionize)
Vue.filter('meter', meter)
Vue.filter('round', round)
