<template>
  <v-fade-transition>
    <div
      v-show="playing"
      class="player-progress"
    >
      <div
        class="player-progress__value"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </v-fade-transition>
</template>

<script>
import { gig, index, playing } from '@/use/player'

let interval = null

export default {
  data: () => ({
    progress: 0
  }),

  computed: {
    playing: () => playing.value,
    index: () => index.value
  },

  methods: {
    sync () {
      if (!this.playing || gig.value.completion > 1) return this.clear()

      const unit = gig.value.durations.time['16n']

      interval = requestAnimationFrame(() => {
        this.progress = gig.value.completion * 100

        this.sync()
      })//, unit)
    },

    clear () {
      cancelAnimationFrame(interval)

      this.progress = 0
    }
  },

  watch: {
    playing () {
      this.sync()
    },

    index () {
      this.sync()
    }
  }
}
</script>

<style lang="sass" scoped>
.player-progress
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 2px
  background: darken(rgba(12, 12, 12), 10%)

  &__value
    position: relative
    background: #FAA372 // primary (TODO: Import from Vuetify)
    height: 2px
    width: 0

.v-progress-linear__determinate
  transition: unset !important
</style>
