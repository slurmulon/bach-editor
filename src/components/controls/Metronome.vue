<template>
  <v-row
    nowrap
    no-gutters
  >
    <v-col
      v-for="beat in beats"
      :key="beat"
    >
      <v-icon :color="(current != null && (beat - 1 <= current)) ? 'primary' : null">
        mdi-circle-small
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { headers, metronome, playing } from '@/use/player'

export default {
  computed: {
    playing: () => playing.value,
    current: () =>  metronome.value,
    beats: () => headers.value['beat-units-per-measure']
  }
}
</script>
