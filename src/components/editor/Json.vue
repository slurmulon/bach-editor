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
import { jsonify, track } from '@/use/editor'
import { PrismEditor } from 'vue-prism-editor'

import { highlight, languages } from 'prismjs/components/prism-core'

export default {
  components: {
    PrismEditor
  },

  computed: {
    json: () => {
      return jsonify(track.value).value
    }
  },

  methods: {
    highlighter (code) {
      // return highlight(
      //   code,
      //   languages.json
      // )

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
