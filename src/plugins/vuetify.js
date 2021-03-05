import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        // primary: '#FAA372',
        primary: '#FA9F6D',
        // ice blue
        secondary: '#7C9EC3',
        // mustard
        // secondary: '#F9EE9A',
        // light salmon
        accent: '#FFD89A',
        // ice blue
        // accent: '#7C9EC3',
        error: '#E57373'
      }
    }
  }
})
