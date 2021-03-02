<template>
  <v-app id="inspire">
    <v-app-bar
      app
      dense
      clipped-left
      clipped-right
    >
      <v-app-bar-nav-icon @click="left = !left" />
        <v-app-bar-title>
          <logo />
        </v-app-bar-title>
      <v-spacer />

      <v-btn
        v-for="link in links"
        :key="link.name"
        :href="link.href"
        :target="link.target"
        :icon="!!link.icon"
        text
        :class="['font-weight-light', ...(link.classes || [])]"
      >
        <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
        <span v-else>{{ link.name }}</span>
      </v-btn>

      <preferences />

      <v-btn
        icon
        @click="right = !right"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="left"
      app
      clipped
      hide-overlay
      width="300"
      :color="!$vuetify.breakpoint.mobile ? 'transparent' : 'grey darken-4'
"
    >
      <tracks />
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="right"
      app
      clipped
      right
      :stateless="$vuetify.breakpoint.smAndUp"
      :color="$vuetify.breakpoint.smAndUp ? 'transparent' : 'grey darken-4'"
    >
      <info />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-footer
      app
      inset
      height="72"
      color="rgb(12, 12, 12)"
      elevation="12"
    >
      <slot name="footer" />
    </v-footer>

    <notify />
  </v-app>
</template>

<script>
import Logo from './Logo'
import Tracks from './drawer/Tracks'
import Info from './drawer/Info'
import Preferences from './Preferences'
import Notify from './Notify'

import { left, right } from '@/use/drawer'

export default {
  components: {
    Logo,
    Tracks,
    Info,
    Preferences,
    Notify
  },

  data: () => ({
    links: [
      {
        name: 'Learn',
        target: 'bach-learn',
        href: 'https://slurmulon.github.io/bach/#/guide',
        classes: 'hidden-xs-only'
      },
      {
        name: 'Support',
        target: 'bach-support',
        href: 'https://github.com/slurmulon/bach-editor/issues',
        classes: 'hidden-xs-only'
      },
      {
        name: 'Docs',
        target: 'bach-learn',
        icon: 'mdi-book-open-variant',
        href: 'https://slurmulon.github.io/bach',
        classes: 'hidden-sm-and-up'
      },
      {
        name: 'Github',
        target: 'bach-github',
        icon: 'mdi-github',
        href: 'https://github.com/slurmulon/bach-editor'
      }
    ]
  }),

  computed: {
    left: {
      get: () => left.value,
      set: (value) => left.value = value
    },

    right: {
      get: () => right.value,
      set: (value) => right.value = value
    }
  }
}
</script>

<style lang="sass">
// ORIG
$color: #121212
// ALT
// $color: rgb(12, 12, 12)

.v-main
  // EXPERIMENTAL: Looks nice, but causes tile flashing sometimes due to GPU painting
  // background: linear-gradient(360deg, darken($color, 3%), $color)
  background: darken($color, 3%)

.v-footer
  border-top: 1px solid rgba(255, 255, 255, 0.12) !important
</style>
