import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#FAA372',
        secondary: '#7C9EC3',
        accent: '#FFD89A',
        error: '#E57373'
      }
    }
  }
})
