<template>
  <v-app id="inspire">
    <!-- <v-system-bar app> -->
    <!--   <v-spacer /> -->

    <!--   <v-icon>mdi-square</v-icon> -->

    <!--   <v-icon>mdi-circle</v-icon> -->

    <!--   <v-icon>mdi-triangle</v-icon> -->
    <!-- </v-system-bar> -->

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
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        />

        <v-divider class="mx-3 my-5" />

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        />
      </v-navigation-drawer>

      <tracks />
    </v-navigation-drawer>

    <v-navigation-drawer
      app
      clipped
      right
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
      { name: 'Learn', href: 'https://slurmulon.github.io/bach/#/guide' },
      { name: 'Support', href: 'https://github.com/slurmulon/bach-editor/issues' }
    ]
  })
}
</script>
