<template>
  <v-btn-toggle
    :value="toggles"
    dense
    group
    shaped
    multiple
  >
    <v-tooltip
      v-for="item in items"
      :key="item.key"
      top
      open-delay="250"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          @click.stop="toggle(item.key)"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ item.tip }}</span>
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
    },

    items () {
      return [
        {
          key: 'loop',
          icon: 'mdi-sync',
          tip: 'Loop'
        },
        {
          key: 'follow',
          icon: 'mdi-eye-settings',
          tip: 'Scroll with music'
        },
        {
          key: 'coder',
          icon: 'mdi-code-braces',
          tip: 'Scroll to code on stop'
        }
      ]
    }
  },

  methods: {
    toggle (key) {
      this[key] = !this[key]
    }
  }
}
</script>
