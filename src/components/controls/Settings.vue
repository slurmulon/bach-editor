<template>
  <v-btn-toggle
    :value="toggle"
    dense
    group
    tile
    multiple
  >
    <v-tooltip
      top
      open-delay="250"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          @click.stop="loop = !loop"
        >
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </template>
      <span>Loop</span>
    </v-tooltip>

    <v-tooltip
      top
      open-delay="250"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          @click="follow = !follow"
        >
          <v-icon>mdi-eye-settings</v-icon>
        </v-btn>
      </template>
      <span>Scroll with music</span>
    </v-tooltip>
  </v-btn-toggle>
</template>

<script>
import { settings, configure } from '@/use/player'

export default {
  computed: {
    toggle: ({ loop, follow }) => [loop, follow].map((value, index) => value ? index : null),

    loop: {
      get: () => settings.value.loop,
      set: (value) => configure({ loop: value })
    },

    follow: {
      get: () => settings.value.follow,
      set: (value) => configure({ follow: value })
    }
  }
}
</script>
