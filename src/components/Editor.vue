<template>
  <v-tabs
    v-model="tab"
    background-color="transparent"
  >
    <v-tabs-slider color="primary" />

    <v-tab
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </v-tab>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <component
          :is="`bach-${item}`"
          keep-alive
        />
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import BachCode from './editor/Code'
import BachJson from './editor/Json'

import 'prismjs/components/prism-markup'

import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/themes/prism-twilight.css'

export default {
  components: {
    BachCode,
    BachJson
  },

  data: () => ({
    tab: null,
    items: ['code', 'json']
  }),

  methods: {

  }
}
</script>

<style lang="css">
 /* required class */
.bach-editor {
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.bach-editor span.token.play {
  color: #AFEEEE;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
