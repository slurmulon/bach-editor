<template>
  <div style="width: 100%">
    <progress-bar />
    <!-- <v-progress-linear -->
    <!--   :value="progress" -->
    <!--   top -->
    <!--   absolute -->
    <!--   height="2" -->
    <!-- /> -->

    <v-toolbar
      flat
      color="transparent"
    >
      <!-- <div v-if="dirty"> -->
      <!--   Unsaved changes -->
      <!-- </div> -->
      <!-- <div v-else> -->
      <!--   <v-icon color="success">mdi-check</v-icon> -->
      <!-- </div> -->

      <!-- <v-btn -->
      <!--   icon -->
      <!--   class="mr-4" -->
      <!-- > -->
      <!--   <1!-- <v-icon>mdi-code-tags</v-icon> --1> -->
      <!--   <v-icon>mdi-cog</v-icon> -->
      <!-- </v-btn> -->

      <settings class="mr-4" />

      <volume />

      <v-spacer />

      <play />
    </v-toolbar>
  </div>
</template>

<script>
import Play from './controls/Play'
import Volume from './controls/Volume'
import Settings from './controls/Settings'
import ProgressBar from './controls/Progress'

import { toggle, playing } from '@/use/player'
import { dirty } from '@/use/editor'

export default {
  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value
  },

  methods: {
    toggle
  },

  components: {
    Play,
    Volume,
    Settings,
    ProgressBar
  }
}
</script>
