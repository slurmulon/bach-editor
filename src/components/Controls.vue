<template>
  <v-toolbar color="transparent">
    <!-- <div v-if="dirty"> -->
    <!--   Unsaved changes -->
    <!-- </div> -->
    <!-- <div v-else> -->
    <!--   <v-icon color="success">mdi-check</v-icon> -->
    <!-- </div> -->
    <v-btn
      icon
      color="grey"
    >
      <!-- <v-icon>mdi-code-tags</v-icon> -->
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-spacer />

    <v-btn
      icon
    >
      <v-icon>mdi-volume</v-icon>
    </v-btn>

    <play />
  </v-toolbar>
</template>

<script>
import Play from './controls/Play'

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
    Play
  }
}
</script>
