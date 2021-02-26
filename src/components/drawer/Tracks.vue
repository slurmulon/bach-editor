<template>
  <v-list shaped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Tracks
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ count }} local tracks
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <create />
      </v-list-item-action>
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-list-item-content>
        <v-row
          no-gutters
          justify="center"
        >
          <v-spacer />
          <!-- <v-col cols="2"> -->
          <v-col>
            <v-btn icon>
              <v-icon>mdi-sort</v-icon>
            </v-btn>
          </v-col>
          <v-spacer />
          <!-- <v-col cols="2"> -->
          <v-col>
            <!-- <v-btn icon> -->
            <!--   <v-icon>mdi-delete-outline</v-icon> -->
            <!-- </v-btn> -->
            <nuke />
          </v-col>
          <v-spacer />
          <!-- <v-col cols="2"> -->
          <v-col>
            <archive />
          </v-col>
          <!-- <v-spacer /> -->
        </v-row>
      </v-list-item-content>
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
import { all, current, active, multiple, count, open, destroy } from '@/use/tracks'
import { dirty } from '@/use/editor'
import { warn } from '@/use/warn'
import { get } from '@vueuse/core'

import Create from '@/components/tracks/dialog/Create'
import Archive from '@/components/tracks/archive/Menu'
import Nuke from '@/components/tracks/Nuke'

export default {
  components: {
    Create,
    Archive,
    Nuke
  },

  computed: {
    all: () => get(all),
    count: () => get(count),
    multiple: () => get(multiple)
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
