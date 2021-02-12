<template>
  <div>
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
import { input, draft } from '@/use/editor'
import Prism from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'

import { highlight, languages } from 'prismjs/components/prism-core'

global.Prism = Prism

export default {
  components: {
    PrismEditor
  },

  computed: {
    code: {
      get () {
        return draft.value.trim()
      },

      set (code) {
        // draft.value = code
        // dirty.value = true
        input(code)
      }
    }
  },

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
