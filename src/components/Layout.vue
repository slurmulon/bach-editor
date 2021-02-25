<template>
  <v-app id="inspire">
    <v-app-bar
      app
      dense
      clipped-left
      clipped-right
      color="grey darken-4"
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
        text
        class="font-weight-light"
      >
        {{ link.name }}
      </v-btn>

      <v-btn
        icon
        @click="right = !right"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <!-- <v-responsive max-width="156"> -->
      <!--   <v-text-field -->
      <!--     dense -->
      <!--     flat -->
      <!--     hide-details -->
      <!--     rounded -->
      <!--     solo-inverted -->
      <!--   /> -->
      <!-- </v-responsive> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="left"
      app
      clipped
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
      <!-- outlined -->
      <slot name="footer" />
      <!-- <v-text-field -->
      <!--   dense -->
      <!--   flat -->
      <!--   hide-details -->
      <!--   rounded -->
      <!--   solo -->
      <!-- /> -->
    </v-footer>

    <notify />
  </v-app>
</template>

<script>
import Logo from './Logo'
import Tracks from './drawer/Tracks'
import Info from './drawer/Info'
import Notify from './Notify'

import { left, right } from '@/use/drawer'

export default {
  components: {
    Logo,
    Tracks,
    Info,
    Notify
  },

  data: () => ({
    links: [
      {
        name: 'Learn',
        target: 'bach-learn',
        href: 'https://slurmulon.github.io/bach/#/guide'
      },
      {
        name: 'Support',
        target: 'bach-support',
        href: 'https://github.com/slurmulon/bach-editor/issues'
      }
    ],
    controls: [
      {
        ref: 'import-all',
        icon: 'mdi-upload-outline',
        tip: 'Import entire collection',
        click: () => {}
      },
      {
        ref: 'export-all',
        icon: 'mdi-download-outline',
        // icon: 'mdi-content-save-settings-outline',
        tip: 'Export entire collection',
        click: () => {}
      },
      {
        ref: 'github',
        icon: 'mdi-github',
        target: 'bach-source',
        tip: 'Editor source code',
        link: 'https://github.com/slurmulon/bach-editor'
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
// NICE ALT
// $color: rgb(12, 12, 12)

.v-main
  background: linear-gradient(360deg, darken($color, 3%), $color)

.v-footer
  border-top: 1px solid rgba(255, 255, 255, 0.12) !important
</style>
