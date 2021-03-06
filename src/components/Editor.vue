<template>
  <div ref="editor">
    <v-toolbar
      flat
      color="transparent"
    >
      <v-toolbar-title class="text-h4 mr-2">
        {{ name }}
      </v-toolbar-title>

      <dialog-rename class="ml-4" />

      <v-spacer />

      <v-tooltip
        top
        open-delay="500"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            @click="copy"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>mdi-clipboard-text-play</v-icon>
          </v-btn>
        </template>
        <span>Copy code</span>
      </v-tooltip>

      <v-tooltip
        top
        open-delay="500"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            :disabled="!dirty"
            :loading="compiling"
            @click="save"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Save locally</span>
      </v-tooltip>
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

    <dialog-warn />
  </div>
</template>

<script>
import { commit as save, tab, draft, name, dirty, compiling, copy } from '@/use/editor'
import { toggle, playing, settings } from '@/use/player'
import { load } from '@/use/tracks'

import BachCode from './editor/Code'
import BachJson from './editor/Json'
import BachAudio from './editor/Audio'
import DialogRename from './editor/dialog/Rename'
import DialogWarn from './dialog/Warn'

import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'

import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/themes/prism-twilight.css'

export default {
  components: {
    BachCode,
    BachJson,
    BachAudio,
    DialogRename,
    DialogWarn
  },

  data: () => ({
    items: ['code', 'json', 'audio'],
    dialog: {
      rename: false
    }
  }),

  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value,
    compiling: () => compiling.value,
    name: () => name.value,

    tab: {
      get: () => tab.value,
      set: (value) => tab.value = value
    }
  },

  methods: {
    save,
    copy,
    toggle,
    leaving (event) {
      event.preventDefault()
      event.returnValue = ''
    }
  },

  mounted () {
    load()
  },

  watch: {
    playing (next, prev) {
      if (!next && prev && settings.value.coder) {
        this.$vuetify.goTo(0, { duration: 750, easing: 'easeOutQuad' })
      }
    },

    dirty (next) {
      if (next) {
        window.addEventListener('beforeunload', this.leaving)
      } else {
        window.removeEventListener('beforeunload', this.leaving)
      }
    }
  }
}
</script>

<style lang="sass">
// TODO: Move to main.css or the like
.v-tabs-items
  // border: 1px solid #1e1e1e
  border: 1px solid rgba(255, 255, 255, 0.12) !important
  background-color: transparent !important

/* required class */
.bach-editor
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace
  font-size: 14px
  line-height: 1.5
  padding: 5px
  max-height: 300px
  // background-color: darken(#0d0d0d, 2%)

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
