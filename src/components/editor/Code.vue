<template>
  <div>
    <prism-editor
      v-model="code"
      class="bach-editor"
      :highlight="highlighter"
      language="bach"
      line-numbers
      :readonly="disabled"
    />
  </div>
</template>

<script>
import { input, draft } from '@/use/editor'
import { playing } from '@/use/player'
import Prism from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'

import { highlight, languages } from 'prismjs/components/prism-core'

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
        input(code)
      }
    },

    disabled: () => playing.value
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
