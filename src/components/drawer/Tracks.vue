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
    </v-list-item>

    <v-divider />

    <v-list-item
      v-for="track in all"
      :key="track.id"
      link
    >
      <v-list-item-content>
        <v-list-item-title>{{ track.id }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { all } from '@/use/tracks'

export default {
  computed: {
    all: () => all.value
  }
}
</script>
