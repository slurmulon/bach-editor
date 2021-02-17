<template>
  <v-sheet
    outlined
    color="transparent"
    class="mt-4"
  >
    <v-container>
      <v-row justify="center">
        <v-col
          v-for="(section, $index) in sections"
          :key="$index"
          :cols="colsOf(section)"
          align-self="center"
        >
          <!-- <v-sheet> -->
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

                <v-card-text v-if="section">
                  <v-chip
                    v-for="note in notesIn(section, key)"
                    :key="note"
                    class="mr-2 mt-2"
                    pill
                    small
                  >
                    {{ note | numberless }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- </v-sheet> -->
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { music, sections, index, part, playing, notesIn } from '@/use/player'

const GRID_SIZE = 12

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

    notesIn (section, part) {
      return notesIn(section, part)
    },

    ratioOf (section) {
      return music.value.ratio(section.duration)
    },

    colsOf (section) {
      return Math.round((section.duration / music.value.longest.duration) * (GRID_SIZE / 2))
    }
  },

  filters: {
    numberless: text => text.replace(/[0-9]+$/, '')
  }
}
</script>
