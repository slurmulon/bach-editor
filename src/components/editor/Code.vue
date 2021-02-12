<template>
  <div>
    <!-- <v-toolbar -->
    <!--   dense -->
    <!-- > -->
    <!--   <v-spacer /> -->

    <!--   <v-btn icon> -->
    <!--     <v-icon>mdi-clipboard-text-play</v-icon> -->
    <!--   </v-btn> -->

    <!--   <v-btn -->
    <!--     icon -->
    <!--     color="primary" -->
    <!--   > -->
    <!--     <1!-- <v-icon>play_arrow</v-icon> --1> -->
    <!--     <v-icon>mdi-play-circle</v-icon> -->
    <!--   </v-btn> -->
    <!-- </v-toolbar> -->
    <prism-editor
      v-model="code"
      class="bach-editor"
      :highlight="highlighter"
      language="bach"
      line-numbers
    />
  </div>
</template>

<script>
import { draft } from '@/use/editor'
// import template from '@/bach/template.bach'
import Prism from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'
// import 'vue-prism-editor/dist/prismeditor.min.css'

// import 'prismjs/components/prism-markup'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-css'
// import 'prismjs/components/prism-elixir'

// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/themes/prism-dark.css'
// import 'prismjs/themes/prism-twilight.css'

import { highlight, languages } from 'prismjs/components/prism-core'

global.Prism = Prism

// const CODE_TEMPLATE = `@Tempo = 120
// @Meter = 4|4`

// const CODE_TEMPLATE = template

export default {
  components: {
    PrismEditor
  },

  data: () => ({
    // code: CODE_TEMPLATE
    code: draft.value.trim()
  }),

  methods: {
    highlighter (code) {
      return highlight(code, Prism.languages.bach, 'bach')
    },

    highlighter_ORIG (code) {
      // TODO: Eventually write a real prism syntax highlighter for bach
      // return highlight(code, languages.ruby)
      return highlight(
        code,
        {
          ...languages.markup,
          ...languages.js,
          ...languages.elixir,
          ...languages.css
        },
        'markup'
        // 'elixir'
      )
    }
  }
}
</script>
