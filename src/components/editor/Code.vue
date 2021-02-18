<template>
  <div :style="{ filter: disabled ? 'grayscale(1)' : null }">
    <prism-editor
      v-model="source"
      class="bach-editor"
      :highlight="highlighter"
      :readonly="disabled"
      language="bach"
      line-numbers
    />
  </div>
</template>

<script>
import { code, input } from '@/use/editor'
import { playing } from '@/use/player'
import Prism from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'

import { highlight, languages } from 'prismjs/components/prism-core'

export default {
  components: {
    PrismEditor
  },

  computed: {
    source: {
      get: () => code.value,
      set: (source) => input(source)
    },

    disabled: () => playing.value
  },

  methods: {
    highlighter: (code) => highlight(code, Prism.languages.bach, 'bach')
  }
}
</script>
