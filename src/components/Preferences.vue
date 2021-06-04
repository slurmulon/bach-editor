<template>
  <v-dialog
    v-model="open"
    max-width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar>
        <v-toolbar-title>
          <v-icon class="mr-3">
            {{ icon }}
          </v-icon>
          <span>Change Your Preferences</span>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-row class="mt-3">
          <v-col>
            <span class="text-subtitle-1">Player</span>

            <v-switch
              v-model="loop"
              label="Loop track forever"
              hide-details
            />

            <v-switch
              v-model="follow"
              label="Scroll with music"
              hide-details
            />

            <v-switch
              v-model="coder"
              label="Scroll to code on stop"
              hide-details
            />

            <v-switch
              v-model="metronome"
              label="Audible metronome"
              hide-details
            />
          </v-col>
          <v-col>
            <span class="text-subtitle-1">Warnings</span>

            <v-switch
              v-for="(scenario, $index) in scenarios"
              :key="$index"
              :input-value="concerned(scenario.key).value"
              :label="scenario.label"
              @change="warns({ [scenario.key]: $event })"
              hide-details
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="open = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { configure as plays, settings as player, loops } from '@/use/player'
import { configurable as scenarios, configure as warns, concerned } from '@/use/warn'

export default {
  props: {
    icon: {
      type: String,
      required: false,
      default: 'mdi-account-cog'
    }
  },

  data: () => ({
    open: false
  }),

  computed: {
    scenarios: () => scenarios,

    loop: {
      get: () => player.value.loop,
      set: (value) => loops(value)
    },

    follow: {
      get: () => player.value.follow,
      set: (value) => plays({ follow: value })
    },

    coder: {
      get: () => player.value.coder,
      set: (value) => plays({ coder: value })
    },

    metronome: {
      get: () => player.value.metronome,
      set: (value) => plays({ metronome: value })
    }
  },

  methods: {
    concerned,
    warns
  }
}
</script>
