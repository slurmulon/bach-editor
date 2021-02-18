<template>
  <div>
    <prism-editor
      v-model="json"
      class="bach-editor"
      :highlight="highlighter"
      language="json"
      readonly
      line-numbers
    />
  </div>
</template>

<script>
import { json } from '@/use/editor'
import { PrismEditor } from 'vue-prism-editor'

import { highlight, languages } from 'prismjs/components/prism-core'

export default {
  components: {
    PrismEditor
  },

  computed: {
    json: () => json.value
  },

  methods: {
    highlighter (code) {
      return highlight(
        code,
        {
          ...languages.markup,
          ...languages.json
        }
      )
    }
  }
}
</script>
