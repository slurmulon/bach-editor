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
import { progress, playing } from '@/use/player'

export default {
  computed: {
    playing: () => playing.value,
    progress: () => progress.value
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
