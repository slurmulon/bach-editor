<template>
  <v-list
    class="pl-14"
    shaped
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Tracks
        </v-list-item-title>
        <v-list-item-subtitle>
          Your local tracks
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <dialog-create />
      </v-list-item-action>
    </v-list-item>

    <v-divider />

    <!-- <v-list-item> -->
    <!--   <v-list-item-content> -->
    <!--     <v-text-field -->
    <!--       prepend-icon="mdi-search" -->
    <!--       outlined -->
    <!--     /> -->
    <!--   </v-list-item-content> -->
    <!-- </v-list-item> -->

    <!-- <v-list-item> -->
    <!--   <v-list-item-content> -->
    <!--     <v-row no-gutters justify="center"> -->
    <!--       <v-col cols="2"> -->
    <!--         <v-icon>mdi-delete</v-icon> -->
    <!--       </v-col> -->
    <!--       <v-col cols="2"> -->
    <!--         <v-icon>mdi-plus</v-icon> -->
    <!--       </v-col> -->
    <!--     </v-row> -->
    <!--   </v-list-item-content> -->
    <!-- </v-list-item> -->

    <v-list-item
      v-for="track in all"
      :key="track.id"
      :input-value="active(track)"
      @click="open(track)"
      link
      two-line
    >
      <v-list-item-content>
        <v-list-item-title>{{ track.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ track.id }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon
          small
          @click="destroy(track)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { all, current, open, destroy } from '@/use/tracks'
import { get } from '@vueuse/core'

import DialogCreate from '@/components/tracks/dialog/Create'

export default {
  components: {
    DialogCreate
  },

  computed: {
    all: () => all.value
  },

  methods: {
    active (track) {
      return track.id === get(current).id
    },

    open,
    destroy
  }
}
</script>
