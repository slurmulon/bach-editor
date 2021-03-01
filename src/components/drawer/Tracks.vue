<template>
  <div class="tracks-drawer">
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
          <v-list-item-subtitle>{{ track.updated | when }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <remove :track="track" />
        </v-list-item-action>
      </v-list-item>
    </v-list>
    </div>

    <v-footer
      fixed
      inset
      height="72"
      :color="!$vuetify.breakpoint.mobile ? 'rgb(12, 12, 12)' : 'grey darken-4'"
    >
      <v-list-item>
        <v-list-item-content>
          <v-row
            no-gutters
            justify="center"
          >
            <v-col class="text-center">
              <create :btn="{ color: 'white', fab: false, icon: true }" />
            </v-col>

            <!-- TODO: Enable eventually -->
            <!-- <v-spacer /> -->
            <!-- <v-col> -->
            <!--   <v-btn icon> -->
            <!--     <v-icon>mdi-sort</v-icon> -->
            <!--   </v-btn> -->
            <!-- </v-col> -->

            <v-col class="text-center">
              <nuke />
            </v-col>

            <v-col class="text-center">
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
import Remove from '@/components/tracks/Remove'
import Archive from '@/components/tracks/archive/Menu'
import Nuke from '@/components/tracks/Nuke'

export default {
  components: {
    Create,
    Remove,
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
    active: track => get(active(track))
  }
}
</script>

<style lang="sass" scoped>
.tracks-drawer
  height: calc(100% - 72px) !important
  overflow: auto !important

  .v-footer
    border-top: 1px solid rgba(255, 255, 255, 0.12) !important
    border-right: 1px solid rgba(255, 255, 255, 0.12) !important
</style>
