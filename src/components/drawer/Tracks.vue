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
          v-if="multiple"
          icon
          small
          @click.stop="remove(track)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { all, current, active, open, destroy } from '@/use/tracks'
import { dirty } from '@/use/editor'
import { warn } from '@/use/warn'
import { get } from '@vueuse/core'

import DialogCreate from '@/components/tracks/dialog/Create'

export default {
  components: {
    DialogCreate
  },

  computed: {
    all: () => get(all),
    multiple: () => Object.keys(get(all)).length > 1
  },

  methods: {
    open,

    active: track => get(active(track)),

    remove: track => {
      if (get(dirty) && get(active(track))) {
        warn({
          problem: 'removing',
          then: () => destroy(track)
        })
      } else {
        destroy(track)
      }
    }
  }
}
</script>
