<template>
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

    <v-btn
      icon
      class="mr-4"
    >
      <!-- <v-icon>mdi-code-tags</v-icon> -->
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <!-- <v-btn-toggle -->
    <!--   dense -->
    <!--   multiple -->
    <!-- > -->
    <!--   <v-btn> -->
    <!--     <v-icon>mdi-sync</v-icon> -->
    <!--   </v-btn> -->

    <!--   <v-btn> -->
    <!--     <v-icon>mdi-eye-settings</v-icon> -->
    <!--   </v-btn> -->

    <!--   <v-btn> -->
    <!--     <v-icon>mdi-format-underline</v-icon> -->
    <!--   </v-btn> -->

    <!--   <v-btn> -->
    <!--     <v-icon>mdi-format-color-fill</v-icon> -->
    <!--   </v-btn> -->
    <!-- </v-btn-toggle> -->

    <!-- <v-spacer /> -->

    <volume />

    <v-spacer />

    <play />
  </v-toolbar>
</template>

<script>
import Play from './controls/Play'
import Volume from './controls/Volume'

import { toggle, playing } from '@/use/player'
import { dirty } from '@/use/editor'

export default {
  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value,
  },

  methods: {
    toggle
  },

  components: {
    Play,
    Volume
  }
}
</script>
