<template>
  <div>
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="text-h4">
        <!-- {{ name }} -->

        <span @click="dialog.rename = true">{{ name }}</span>
        <dialog-rename
          :show.sync="dialog.rename"
        />
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        icon
        @click="copy"
      >
        <v-icon>mdi-clipboard-text-play</v-icon>
      </v-btn>

      <v-btn
        icon
        :disabled="!dirty"
        @click="save"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>

      <v-btn
        icon
        x-large
        :disabled="dirty"
        :color="playing ? 'primary' : 'secondary'"
        @click="toggle"
      >
        <v-icon v-if="!playing">mdi-play-circle</v-icon>
        <v-icon v-else>mdi-stop-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider />

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

      <v-tabs-items
        v-model="tab"
        class="mt-4"
        background-color="transparent"
      >
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

    <dialog-ask />
  </div>
</template>

<script>
import { commit as save, draft, name, dirty, copy } from '@/use/editor'
import { toggle, playing } from '@/use/player'
import { load } from '@/use/tracks'

import BachCode from './editor/Code'
import BachJson from './editor/Json'
import DialogRename from './editor/dialog/Rename'
import DialogAsk from './Ask'

import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'

import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/themes/prism-twilight.css'

export default {
  components: {
    BachCode,
    BachJson,
    DialogRename,
    DialogAsk
  },

  data: () => ({
    tab: null,
    items: ['code', 'json'],
    dialog: {
      rename: false
    }
  }),

  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value,
    name: () => name.value
  },

  methods: {
    save,
    copy,
    toggle

  },

  mounted () {
    load()
  }
}
</script>

<style lang="sass">
// TODO: Move to main.css or the like
.v-tabs-items
  border: 1px solid #1e1e1e
  background-color: transparent !important

/* required class */
.bach-editor
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace
  font-size: 14px
  line-height: 1.5
  padding: 5px
  max-height: 300px

  .token.play,
  .token.keyword
    /* color: #AFEEEE; */
    color: #95B4C5 !important

  .token.variable
    // color: darken(whitesmoke, 30%) !important
    // color: lighten(#95B4C5, 22%) !important
    color: #60899F !important
    // color: #FFE1BD !important
    // color: #FACB92 !important

//.bach-editor span.token.variable {
//  color: #FFD9C3 !important;
//}

/* optional class for removing the outline */
//.prism-editor__textarea:focus
  //outline: none
</style>
