<template>
  <v-col
    cols="5"
    sm="3"
  >
    <v-row
      nowrap
      no-gutters
    >
      <v-col
        v-for="beat in beats"
        :key="beat"
      >
        <v-icon :color="color(beat)">
          mdi-circle-small
        </v-icon>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { metronome, headers, playing } from '@/use/player'

export default {
  computed: {
    playing: () => playing.value,
    current: () =>  metronome.value,
    beats: () => headers.value['beat-units-per-measure']
  },

  methods: {
    color (beat) {
      if (!this.playing)
        return 'grey darken-3'
      if (this.current != null && (beat - 1 <= this.current))
        return 'primary'
    }
  }
}
</script>
