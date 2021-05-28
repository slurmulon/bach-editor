<template>
  <div :style="{ filter: disabled ? 'grayscale(1)' : null }">
    <v-text-field
      v-model="current"
      label="Audio URL"
    />

    <v-btn
      @click="save(current)"
      text
    >
      Save
    </v-btn>
  </div>
</template>

<script>
import { selected as track } from '@/use/tracks'
import { current, save } from '@/use/audio'
import { compiling } from '@/use/editor'
import { playing } from '@/use/player'

export default {
  data: () => ({
    draft: current.value
  }),

  computed: {
    current: {
      get: () => current.value,
      set: (current) => save(current)
    },

    disabled: () => playing.value || compiling.value
  },

  methods: {
    save
  }
}
</script>
