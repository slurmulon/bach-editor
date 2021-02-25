<template>
  <v-row
    nowrap
    no-gutters
  >
    <v-col
      v-for="beat in beats"
      :key="beat"
    >
      <v-icon :color="beat - 1 <= current ? 'primary' : null">
        mdi-circle-small
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import { gig, headers, playing } from '@/use/player'

import { useRafFn } from '@vueuse/core'

let timeline = null

export default {
  data: () => ({
    current: null
  }),

  computed: {
    playing: () => playing.value,
    beats: () => headers.value['beat-units-per-measure']
  },

  methods: {
    play () {
      this.current = null

      timeline.resume()
    },

    stop () {
      this.current = null

      timeline.pause()
    }
  },

  mounted () {
    timeline = useRafFn(() => {
      this.current = gig.value.metronome
      console.log('metronome!', this.current)
    })

    timeline.pause()
  },

  watch: {
    playing (next, prev) {
      if (next) {
        this.play()
      } else {
        this.stop()
      }
    }
  }
}
</script>
