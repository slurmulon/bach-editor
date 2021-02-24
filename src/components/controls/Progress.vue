<template>
  <v-progress-linear
    :value="progress"
    top
    absolute
    height="2"
  />
</template>

<script>
import { gig, playing } from '@/use/player'
import { useIntervalFn } from '@vueuse/core'

export default {
  data: () => ({
    progress: 0,
    control: null
  }),

  computed: {
    playing: () => playing.value
  },

  watch: {
    playing (next, prev) {
      console.log('playing watcher!!!', next)
      if (next) {
        this.control = useIntervalFn(() => {
          this.progress = gig.value.progress * 100

          if (!this.playing) {
            this.control.stop()
            this.progress = 0
          }
        }, 50)
      } else {
        this.progress = 0
      }
    },

    playing_OLD (next, prev) {
      if (next) {
        this.control = this.control || useRafFn((ts) => {
          console.log('rafffin', ts, gig.value.progress)
          this.progress = gig.value.progress
        })

        this.control.resume()
      } else if (this.control) {
        this.control.pause()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.v-progress-linear__determinate
  transition: unset !important
</style>
