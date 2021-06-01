<template>
  <div :style="{ filter: disabled ? 'grayscale(1)' : null }">
    <v-row align="center" justify="center" class="pa-4">
      <v-col cols="10">
        <v-text-field
          v-model="draft"
          outlined
          hide-details
          full-width
          label="Audio URL"
        />
      </v-col>

      <v-col cols="2">
        <v-btn
          @click="save(draft)"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { selected as track } from '@/use/tracks'
import { player, current, save } from '@/use/audio'
import { compiling } from '@/use/editor'
import { music, playing } from '@/use/player'

export default {
  data: () => ({
    draft: current.value,
    stats: null
  }),

  computed: {
    current: () => current.value,
    disabled: () => playing.value || compiling.value
  },

  methods: {
    save
  },

  watch: {
    current (next, prev) {
      this.draft = next
    }
  }
}
</script>
