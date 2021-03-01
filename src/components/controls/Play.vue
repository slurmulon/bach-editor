<template>
  <v-tooltip
    top
    open-delay="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        x-large
        :color="playing ? 'primary' : 'secondary'"
        v-on="on"
        v-bind="attrs"
        @click="click"
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
import { commit as save } from '@/use/editor'
import { dirty } from '@/use/editor'

export default {
  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value
  },

  methods: {
    click () {
      if (this.dirty) save()

      toggle()
    }
  }
}
</script>
