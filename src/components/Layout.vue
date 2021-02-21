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
      <!-- <v-navigation-drawer -->
      <!--   v-model="drawer" -->
      <!--   absolute -->
      <!--   mini-variant -->
      <!--   :color="!$vuetify.breakpoint.mobile ? 'transparent' : null" -->
      <!-- > -->
      <!--   <v-tooltip right> -->
      <!--     <template #activator="{ on, attrs }"> -->
      <!--       <v-avatar -->
      <!--         class="d-block text-center mx-auto mt-4" -->
      <!--         color="grey darken-2" -->
      <!--         size="36" -->
      <!--         v-on="on" -->
      <!--         v-bind="attrs" -->
      <!--       > -->
      <!--         <v-icon>mdi-cog-outline</v-icon> -->
      <!--       </v-avatar> -->
      <!--     </template> -->
      <!--     <span>Change settings</span> -->
      <!--   </v-tooltip> -->

      <!--   <v-divider class="mx-3 my-5" /> -->

      <!--   <v-tooltip -->
      <!--     v-for="control in controls" -->
      <!--     :key="control.ref" -->
      <!--     color="secondary" -->
      <!--     right -->
      <!--   > -->
      <!--     <template #activator="{ on, attrs }"> -->
      <!--       <v-avatar -->
      <!--         class="d-block text-center mx-auto mb-9" -->
      <!--         size="28" -->
      <!--         v-on="on" -->
      <!--         v-bind="attrs" -->
      <!--       > -->
      <!--         <v-icon>{{ control.icon }}</v-icon> -->
      <!--       </v-avatar> -->
      <!--     </template> -->
      <!--     <span>{{ control.tip }}</span> -->
      <!--   </v-tooltip> -->
      <!-- </v-navigation-drawer> -->

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
      color="transparent"
      height="72"
      inset
    >
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

import { left, right, mini } from '@/use/drawer'

export default {
  components: {
    Logo,
    Tracks,
    Info,
    Notify
  },

  data: () => ({
    // drawer: null,
    // mini: true,
    links: [
      // { name: 'Showcase', href: '/showcase' },
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
    },

    mini: {
      get: () => mini.value,
      set: (value) => mini.value = value
    }
  }
}
</script>
