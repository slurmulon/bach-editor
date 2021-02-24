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
import { useIntervalFn } from '@vueuse/core'

export default {
  data: () => ({
    progress: 0,
    control: null
  }),

  computed: {
    playing: () => playing.value,
    index: () => index.value
  },

  methods: {
    sync () {
      if (!this.playing) {
        clearInterval(this.control)
        this.progress = 0
        return
      }

      const unit = gig.value.durations.time['16n']

      // TODO: Rename to interval
      this.control = setInterval(() => {
        // this.progress = gig.value.progress * 100
        // this.progress = (gig.value.elapsed / gig.value.duration) * 100
        this.progress = gig.value.completion * 100

        if ((!this.playing && this.control) || this.progress >= 100) {
          clearInterval(this.control)
          this.progress = 0
        }
      }, unit)
    }
  },

  watch: {
    playing () {
      this.sync()
    },

    index () {
      this.sync()
    },

    index_ORIG (next, prev) {
      if (next) {
        this.control = useIntervalFn(() => {
          this.progress = gig.value.progress * 100

          if (!this.playing) {
            this.control.stop()
            this.progress = 0
          }
        }, gig.value.durations.time['16n'])
      } else {
        this.progress = 0
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.player-progress
  position: absolute
  top: 0
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
