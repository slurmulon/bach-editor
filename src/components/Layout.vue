<template>
  <v-app id="inspire">
    <v-app-bar
      app
      dense
      clipped-left
      clipped-right
      color="grey darken-4"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
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
      v-model="drawer"
      app
      clipped
      width="300"
      color="transparent"
    >
      <v-navigation-drawer
        v-model="drawer"
        absolute
        mini-variant
        color="transparent"
      >
        <v-tooltip right>
          <template #activator="{ on, attrs }">
            <v-avatar
              class="d-block text-center mx-auto mt-4"
              color="grey darken-2"
              size="36"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon>mdi-cog-outline</v-icon>
            </v-avatar>
          </template>
          <span>Change settings</span>
        </v-tooltip>

        <v-divider class="mx-3 my-5" />

        <v-tooltip
          v-for="control in controls"
          :key="control.ref"
          color="secondary"
          right
        >
          <template #activator="{ on, attrs }">
            <v-avatar
              class="d-block text-center mx-auto mb-9"
              size="28"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon>{{ control.icon }}</v-icon>
            </v-avatar>
          </template>
          <span>{{ control.tip }}</span>
        </v-tooltip>
      </v-navigation-drawer>

      <tracks />
    </v-navigation-drawer>

    <v-navigation-drawer
      :value="$vuetify.breakpoint.name !== 'sm'"
      app
      clipped
      right
      stateless
      color="transparent"
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

export default {
  components: {
    Logo,
    Tracks,
    Info,
    Notify
  },

  data: () => ({
    drawer: null,
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
      // {
        // ref: 'github',
        // icon: 'mdi-github',
        // target: 'bach-source',
        // link: 'https://github.com/slurmulon/bach-editor'
      // },
      {
        ref: 'settings',
        // icon: 'mdi-cog-outline',
        icon: 'mdi-github',
        tip: 'Editor source code',
        click: () => {}
      },
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
      }
    ]
  })
}
</script>
