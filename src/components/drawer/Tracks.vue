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
      :input-value="active(track)"
      @click="edit(track)"
      link
      two-line
    >
      <!-- {{ track.name }} ({{ track.id }}) {{ active(track) }} -->
      <v-list-item-content>
        <v-list-item-title>{{ track.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ track.id }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon
          small
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { id } from '@/use/editor'
import { all, edit } from '@/use/tracks'

export default {
  computed: {
    all: () => all.value
  },

  methods: {
    active (track) {
      console.log('active?', track, id.value, track.id === id.value)
      return track.id === id.value
    },

    edit
  }
}
</script>
