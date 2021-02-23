<template>
  <div style="width: 200px">
    <v-slider
      v-model="volume"
      :min="limit.min"
      :max="limit.max"
      :prepend-icon="!muted ? 'mdi-volume-high' : 'mdi-volume-off'"
      color="white"
      hide-details
      @click:prepend="toggle"
    />
  </div>
</template>

<script>
import { settings, gain, muted, mute, DECIBALS } from '@/use/player'

export default {
  computed: {
    volume: {
      get: ({ muted }) => !muted ? settings.value.volume : DECIBALS.min,
      set: (value) => gain(value)
    },

    muted: {
      get: () => settings.value.muted,
      set: (value) => mute(value)
    },

    limit: () => DECIBALS
  },

  methods: {
    toggle () {
      mute(!this.muted)
    }
  }
}
</script>
