<template>
  <div class="tracks-drawer" style="height: calc(100% - 72px); overflow: auto;">
    <div>
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
    </div>

    <v-footer
      fixed
      inset
      height="72"
      :color="!$vuetify.breakpoint.mobile ? 'rgb(12, 12, 12)' : 'grey darken-4'"
      style="border-right: 1px solid rgba(255, 255, 255, 0.12)"
    >
      <v-list-item>
        <v-list-item-content>
          <v-row
            no-gutters
            justify="center"
          >
            <v-spacer />
            <v-col>
              <v-btn icon>
                <v-icon>mdi-sort</v-icon>
              </v-btn>
            </v-col>

            <v-spacer />
            <v-col>
              <nuke />
            </v-col>

            <v-spacer />
            <v-col>
              <archive />
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-footer>
  </div>
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

<style lang="sass" scoped>
.track-drawer
  height: calc(100% - 72px)
  overflow: auto
