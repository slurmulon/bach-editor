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
          <div class="text-h5 text-center my-4">
            <span :class="active($index) ? 'white--text' : 'grey--text text--lighten-1'">
              {{ durationOf(section) }}
            </span>
          </div>

          <v-sheet
            rounded
            elevation="6"
            class="px-3 pt-3"
          >
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
                :color="active($index) ? 'grey darken-3' : null"
              >
                <v-row>
                  <v-col align-content="start">
                <v-card-title :style="{ color: active($index) ? $vuetify.theme.themes.dark.primary: null }">
                  <!-- {{ section.parts.chord.value }} -->
                  <!-- {{ valueOf(section) }} -->
                  {{ part.value }}
                </v-card-title>

                <v-card-subtitle>
                  <span class="text-capitalize">
                    {{ key }}
                  </span>
                </v-card-subtitle>
                  </v-col>

                  <!-- <v-col>Duration: {{ durationOf(section) }}</v-col> -->

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
      const bar = section.duration / this.durations.bar.pulse
      const longest = music.value.longest.duration / this.durations.bar.pulse

      console.log('colsOf bar', bar)

      return Math.round((section.duration / music.value.longest.duration) * (GRID_SIZE / 2))
      // return Math.floor((bar / longest) * GRID_SIZE)
      // return Math.round((bar / longest) * (GRID_SIZE / 2))
    },

    durationOf (section) {
      // return this.durations.cast(section.duration, { as: 'beat' })
      const beats = this.durations.cast(section.duration)
      const bar = this.durations.bar.beat
      const kind = beats <  bar ? 'beat' : 'bar'
      const value = beats < bar ? beats : (beats / bar)
      const pretty = this.$options.filters.fractionize(value)

      return `${pretty} ${kind}` + (value > 1 ? 's' : '')

    }
  },

  filters: {
    numberless: text => text.replace(/[0-9]+$/, ''),
    fractionize: text => {
      if (!text) return

      return new Fraction(text).toFraction(true).replace(/\s/, ' + ')
    }
  }
}
</script>
