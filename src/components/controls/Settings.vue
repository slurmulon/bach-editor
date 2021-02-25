<template>
  <v-btn-toggle
    :value="toggles"
    dense
    group
    shaped
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

    <v-tooltip
      top
      open-delay="250"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          @click="coder = !coder"
        >
          <!-- <v-icon>mdi-home-roof</v-icon> -->
          <v-icon>mdi-code-braces</v-icon>
        </v-btn>
      </template>
      <span>Return to code on stop</span>
    </v-tooltip>
  </v-btn-toggle>
</template>

<script>
import { settings, configure, loops } from '@/use/player'

export default {
  computed: {
    all: () => [settings.value.loop, settings.value.follow, settings.value.coder],

    toggles: ({ all }) => all.map((value, index) => value ? index : null),

    loop: {
      get: () => settings.value.loop,
      set: (value) => loops(value)
    },

    follow: {
      get: () => settings.value.follow,
      set: (value) => configure({ follow: value })
    },

    coder: {
      get: () => settings.value.coder,
      set: (value) => configure({ coder: value })
    }
  }
}
</script>
