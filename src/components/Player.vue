<template>
  <v-sheet
    outlined
    class="player mt-8"
  >
    <!-- <v-divider /> -->
    <v-container>
      <!-- TODO: Probably put a header with a legend to show measurement of one bar/measure -->
      <v-row justify="center">
        <v-col
          v-for="(section, $index) in sections"
          :key="$index"
          :ref="`section-${$index}`"
          :cols="colsOf(section)"
          align-self="center"
        >
          <div class="text-h5 text-center my-4">
            <span :class="active($index) ? 'white--text' : 'grey--text text--lighten-1'">
              {{ durationOf(section) }}
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
              v-for="(part, key) in section.parts"
              :key="key"
              cols="12"
            >
              <v-card
                outlined
                class="fill-height"
                :color="active($index) ? 'grey darken-3' : null"
                :raised="active($index)"
                :disabled="!active($index)"
              >
                <v-row no-gutters>
                  <v-col align-content="start">
                    <v-card-title
                      :style="{
                        'color': active($index) ? $vuetify.theme.themes.dark.primary: null,
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

                  <v-col :cols="($vuetify.breakpoint.mobile || colsOf(section) < 6) ? 12 : null">
                    <v-card-text
                      v-if="section"
                      class="d-block"
                    >
                      <v-chip
                        v-for="note in notesIn(section, key)"
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
import { music, sections, index, part, playing, played, settings, notesIn } from '@/use/player'
import { bach } from '@/use/editor'

import { Durations } from 'bach-js'

const GRID_SIZE = 12

export default {
  computed: {
    sections: () => sections.value,
    index: () => index.value,
    part: () => part.value,
    playing: () => playing.value,
    played: () => played.value,
    settings: () => settings.value,
    durations: () => new Durations(bach.value)
  },

  methods: {
    active (index) {
      return this.playing && this.index === index
    },

    notesIn (section, part) {
      return notesIn(section, part)
    },

    ratioOf (section) {
      return music.value.ratio(section.duration)
    },

    colsOf (section) {
      const { longest } = this.durations
      const bar = this.durations.bar.pulse
      const size = section.duration / Math.max(bar, longest)

      return Math.floor(size * GRID_SIZE)
    },

    durationOf (section) {
      const beats = this.durations.unitize(section.duration, { as: 'beat' })
      const bar = this.durations.bar.beat
      const kind = beats < bar ? 'beat' : 'bar'
      const value = beats < bar ? beats : (beats / bar)
      const pretty = this.$options.filters.fractionize(value)

      return `${pretty} ${kind}` + (value > 1 ? 's' : '')
    }
  },

  watch: {
    played (next, prev) {
      if (this.settings.follow && next && next !== prev) {
        const [target] = this.$refs[`section-${this.index}`]

        this.$vuetify.goTo(target, {
          duration: this.durations.time.quarter,
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
