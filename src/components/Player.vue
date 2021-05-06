<template>
  <v-sheet
    outlined
    class="player mt-3"
  >
    <v-container>
      <v-row justify="center">
        <v-col
          v-for="beat in beats"
          :key="beat.index"
          :ref="`beat-${beat.index}`"
          :cols="colsOf(beat)"
          align-self="center"
        >
          <div class="text-h5 text-center my-4">
            <span :class="active(beat) ? 'white--text' : 'grey--text text--lighten-1'">
              {{ durationOf(beat) }}
            </span>
          </div>

          <v-sheet
            color="transparent"
            class="px-3 pt-3"
          >
            <v-row
              justify="center"
              class="mb-4"
            >
              <v-col
                v-for="(part, key) in beat.parts"
                :key="key"
                cols="12"
              >
                <v-card
                  outlined
                  class="fill-height"
                  :color="active(beat) ? 'grey darken-3' : null"
                  :raised="active(beat)"
                  :disabled="!active(beat)"
                  :style="{
                    'background-color': '#131313',
                    'border': '1px solid rgba(255, 255, 255, 0.12)'
                  }"
                >
                  <v-row no-gutters>
                    <v-col align-content="start">
                      <v-card-title
                        :style="{
                          'color': active(beat) ? $vuetify.theme.themes.dark.primary: null,
                          'word-break': 'break-word'
                        }"
                      >
                        {{ part.value }}
                      </v-card-title>

                      <v-card-subtitle>
                        <span class="text-capitalize">
                          {{ key }}
                        </span>
                      </v-card-subtitle>
                    </v-col>

                    <v-col :cols="($vuetify.breakpoint.mobile || colsOf(beat) < 6) ? 12 : null">
                      <v-card-text
                        v-if="beat"
                        class="d-block"
                      >
                        <v-chip
                          v-for="note in notesIn(beat, key)"
                          :key="note"
                          class="elevation-4 mr-2 my-1"
                          pill
                          small
                        >
                          {{ note | numberless }}
                        </v-chip>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { beats, current, playing, played, settings, notesIn } from '@/use/player'
import { bach } from '@/use/editor'

import { Durations } from 'bach-js'

const GRID_SIZE = 12

export default {
  computed: {
    beats: () => beats.value,
    current: () => current.value,
    playing: () => playing.value,
    played: () => played.value,
    settings: () => settings.value,
    durations: () => new Durations(bach.value)
  },

  methods: {
    active (beat) {
      return this.playing && this.current.index === beat.index
    },

    notesIn (beat, part) {
      return notesIn(beat, part)
    },

    ratioOf (beat) {
      return this.durations.ratio(beat.duration)
    },

    colsOf (beat) {
      const { min, max, bar } = this.durations
      const cols = Math.min(1, beat.duration / Math.min(bar, max))

      return Math.floor(cols * GRID_SIZE)
    },

    durationOf (beat) {
      const { durations } = this
      const beats = durations.cast(beat.duration, { as: 'pulse' })
      const bar = durations.cast(durations.bar, { as: 'pulse' })
      const kind = beats < bar ? 'beat' : 'bar'
      const value = beats < bar ? beats : (beats / bar)
      const fraction = this.$options.filters.fractionize(value)

      return `${fraction} ${kind}` + (value > 1 ? 's' : '')
    }
  },

  watch: {
    played (next, prev) {
      if (this.settings.follow && next && next !== prev) {
        const [elem] = this.$refs[`beat-${this.current.index}`]
        const target = this.durations.time(this.durations.min, { as: 'ms' })
        const duration = this.durations.rhythmic({
          duration: target,
          units: ['2n', '4n'],
          size: 'max',
          calc: 'ceil'
        })

        this.$vuetify.goTo(elem, {
          duration: Math.min(target, duration),
          easing: 'easeOutQuad'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
// TODO; Import from Vuetify instead
// $color: #121212

// .player > .container
//   background: linear-gradient(360deg, darken($color, 2.5%), $color)

.player
  background-color: transparent !important
</style>
