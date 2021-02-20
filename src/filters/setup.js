import { numberless, fractionize, round } from './'
import Vue from 'vue'

Vue.filter('numberless', numberless)
Vue.filter('fractionize', fractionize)
Vue.filter('round', round)
