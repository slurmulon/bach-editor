<template>
  <v-container class="mt-2">
    <v-row>
      <v-col
        v-for="(section, $index) in sections"
        :key="$index"
        :cols="colsOf(section)"
      >
        <!-- :cols="colsOf(section)" -->
        <!-- :style="{ 'flex': `1 0 ${section.duration}` }" -->
        <v-card
          class="pa-2"
          outlined
          :raised="active($index)"
          :disabled="!active($index)"
        >
          <v-card-title :style="{ color: active($index) ? $vuetify.theme.themes.dark.primary: null }">
            {{ section.parts.chord.value }}
          </v-card-title>

          <v-card-subtitle>
            <span class="text-capitalize">
              {{ part }}
            </span>
          </v-card-subtitle>

          <v-card-text v-if="section">
            <v-chip
              v-for="note in notesIn(section)"
              :key="note"
              class="mr-2"
              pill
              small
            >
              {{ note | numberless }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { music, sections, index, part, playing, notesIn } from '@/use/player'

// TODO: Probably make this reactive to device size, could use @vueuse for this
// const MAX_COLS = 3
// const GRID_SIZE = 12

export default {
  computed: {
    sections: () => sections.value,
    index: () => index.value,
    part: () => part.value,
    playing: () => playing.value
  },

  methods: {
    active (index) {
      return this.playing && this.index === index
    },

    notesIn (section) {
      return notesIn(section)
    },

    ratioOf (section) {
      return music.value.ratio(section.duration)
    },

    colsOf (section) {
      // const ratio = this.ratioOf(section)
      // const { length } = music
      // const wraps = length > MAX_COLS
      // const interpolate = (duration) => Math.round(duration / 2) * 2
      // const interpolate = (duration) => {
      // }

      // const { shortest, longest } = music
      // const variance = (shortest / longest)// - ratio
      // const complex = variance >

      // if not complex, use MAX_COLS

      // const cols = interpolate(section.duration)
      // LAST
      // const cols = section.duration * MAX_COLS
      // const cols = (section.duration / music.value.longest.duration) * 12
      const cols = Math.round((section.duration / music.value.longest.duration) * 6)

      console.log('cols of section', cols, section.duration, music.value.longest)

      return cols
    }
  },

  filters: {
    numberless: text => {
      return text.replace(/[0-9]+$/, '')
    }
  }
}
</script>
