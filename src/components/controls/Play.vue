<template>
  <v-tooltip
    top
    open-delay="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        x-large
        :disabled="dirty"
        :color="playing ? 'primary' : 'secondary'"
        v-on="on"
        v-bind="attrs"
        @click="toggle"
      >
        <v-icon x-large v-if="!playing">mdi-play-circle</v-icon>
        <v-icon x-large v-else>mdi-stop-circle</v-icon>
      </v-btn>
    </template>
    <span>Play/Stop</span>
  </v-tooltip>
</template>

<script>
import { toggle, playing } from '@/use/player'
import { dirty } from '@/use/editor'

export default {
  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value
  },

  methods: { toggle }
}
</script>
