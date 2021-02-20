<template>
  <v-sheet
    outlined
    color="transparent"
    class="mt-8"
  >
    <!-- <v-divider /> -->
    <v-container>
      <!-- TODO: Probably put a header with a legend to show measurement of one bar/measure -->
      <v-row justify="center">
        <v-col
          v-for="(section, $index) in sections"
          :key="$index"
          :cols="colsOf(section)"
          align-self="center"
        >
          <!-- :xl="colsOf(section)" -->
          <!-- :xs="section.duration < 3 ? (colsOf(section) * 2) % 12 : colsOf(section)" -->
          <div class="text-h5 text-center my-4">
            <span :class="active($index) ? 'white--text' : 'grey--text text--lighten-1'">
              {{ durationOf(section) }}
            </span>
          </div>

          <v-sheet
            color="transparent"
            class="px-3 pt-3"
          >
            <!-- :color="active($index) ? 'grey darken-3' : 'transparent'" -->
          <!-- <v-row align="stretch"> -->
          <v-row justify="center" class="mb-4">
            <v-col
              v-for="(part, key) in section.parts"
              :key="key"
              cols="12"
            >
              <v-card
                outlined
                class="fill-height pa-2"
                :raised="active($index)"
                :disabled="!active($index)"
              >
                <v-row>
                  <v-col align-content="start">
                    <v-card-title :style="{ color: active($index) ? $vuetify.theme.themes.dark.primary: null }">
                      {{ part.value }}
                    </v-card-title>

                    <v-card-subtitle>
                      <span class="text-capitalize">
                        {{ key }}
                      </span>
                    </v-card-subtitle>
                  </v-col>

                  <v-col :cols="colsOf(section) < 4 ? 12 : null">
                    <v-card-text v-if="section">
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
import { music, sections, index, part, playing, notesIn } from '@/use/player'
import { bach } from '@/use/editor'

import { Durations } from 'bach-js'
import Fraction from 'fraction.js'

const GRID_SIZE = 12

export default {
  computed: {
    sections: () => sections.value,
    index: () => index.value,
    part: () => part.value,
    playing: () => playing.value,
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
      return Math.round((section.duration / music.value.longest.duration) * (GRID_SIZE / 2))
      // return Math.round((section.duration / music.value.longest.duration))
      // return Math.round(Math.min(GRID_SIZE / 4, Math.max(GRID_SIZE, (section.duration / music.value.longest.duration))))
      // const ratio = music.value.shortest.duration / music.value.longest.duration
      // const max = 3
      // const min = GRID_SIZE * (1/3)

      // return Math.round((section.duration
    },

    durationOf (section) {
      const beats = this.durations.cast(section.duration, { as: 'beat' })
      const bar = this.durations.bar.beat
      const kind = beats <  bar ? 'beat' : 'bar'
      const value = beats < bar ? beats : (beats / bar)
      const pretty = this.$options.filters.fractionize(value)

      return `${pretty} ${kind}` + (value > 1 ? 's' : '')

    }
  },

  filters: {
    numberless: text => text.replace(/[0-9]+$/, ''),
    fractionize: text => new Fraction(text).toFraction(true).replace(/\s/, ' + ')
  }
}
</script>
