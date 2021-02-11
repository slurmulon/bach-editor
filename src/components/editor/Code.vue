<template>
  <div>
  <prism-editor
    v-model="code"
    class="bach-editor"
    :highlight="highlighter"
    language="elixir"
    line-numbers
  />
  </div>
</template>

<script>
import Prism from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/components/prism-clike'

// import 'prismjs/components/prism-markup'
// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-css'
import 'prismjs/components/prism-elixir'

import { highlight, languages } from 'prismjs/components/prism-core'

global.Prism = Prism

const CODE_TEMPLATE = `@Tempo = 120
@Meter = 4|4`

export default {
  components: {
    PrismEditor
  },

  data: () => ({
    code: CODE_TEMPLATE
  }),

  methods: {
    highlighter (code) {
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
        // 'markup'
        'elixir'
      )
    }
  }
}
</script>

<style>
/* required class */
.bach-editor {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
