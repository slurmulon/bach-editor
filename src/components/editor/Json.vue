<template>
  <div>
    <prism-editor
      v-model="json"
      class="bach-json-editor"
      :highlight="highlighter"
      language="json"
      readonly
      line-numbers
    />
  </div>
</template>

<script>
import { jsonify, draft } from '@/use/editor'
// import template from '@/bach/template.bach'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'

import 'prismjs/components/prism-json'

import 'prismjs/themes/prism-tomorrow.css'

import { highlight, languages } from 'prismjs/components/prism-core'

export default {
  components: {
    PrismEditor
  },

  computed: {
    json: () => {
      const res = jsonify(draft.value).value
      console.log('das json', typeof res, res)
      return res
      // return 'wut'
      // return jsonify(draft.value).value
      // return JSON.stringify(jsonify(draft.value).value, null, 2))
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
          ...languages.js,
          ...languages.json
        },
        'json'
      )
    }
  }
}
</script>

<style>
/* required class */
.bach-json-editor {
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
