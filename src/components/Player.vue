<template>
  <v-container class="mt-2">
    <v-row>
      <v-col
        v-for="(section, $index) in sections"
        :key="$index"
        :style="{ 'flex': `${section.duration} 0 100px` }"
      >
        <v-card
          color="transparent"
          class="pa-2"
          :elevation="active($index) ? 8 : 0"
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

          <v-card-text>
            <span
              v-for="note in notesIn(section)"
              :key="note"
              class="mr-2"
            >
              {{ note | numberless }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { sections, index, part, playing, notesIn } from '@/use/player'

export default {
  computed: {
    index: () => index.value,
    sections: () => sections.value,
    part: () => part.value,
    playing: () => playing.value
  },

  data: () => ({
    max: 3
  }),

  methods: {
    active (index) {
      return this.playing && this.index === index
    },

    notesIn (section) {
      return notesIn(section)
    }
  },

  filters: {
    numberless: text => {
      return text.replace(/[0-9]+$/, '')
    }
  }
}
</script>
