<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Information
        </v-list-item-title>
        <v-list-item-subtitle>
          Useful track data
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          icon
          @click="open = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-divider />

    <v-expansion-panels
      accordion
      multiple
      class="mb-6"
      v-model="panel"
    >
      <v-expansion-panel
        v-for="(group, key) in metrics"
        :key="key"
        style="background: transparent"
      >
        <v-expansion-panel-header expand-icon="mdi-menu-down">
          <span class="text-capitalize">{{ key }}</span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list
            subheader
            two-line
          >
            <v-list-item
              v-for="(metric, index) in group"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title v-text="pretty(metric)" />
                <v-list-item-subtitle v-text="metric.name" />
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  icon
                  @click="copy(metric)"
                >
                  <v-icon small>mdi-clipboard-text-play</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>

<script>
import { current } from '@/use/tracks'
import { headers } from '@/use/player'
import { clipboard } from '@/use/editor'
import { right as open, mini } from '@/use/drawer'

export default {
  data: () => ({
    panel: [1, 1, 0]
  }),

  computed: {
    track: () => current.value,
    headers: () => headers.value,

    open: {
      get: () => open.value,
      set: (value) => open.value = value
    },

    metrics () {
      console.log('wut', this.track, current.value)
      return {
        general: [
          {
            name: 'Created',
            filter: 'when',
            value: this.track.created
          },
          {
            name: 'Updated',
            filter: 'when',
            value: this.track.updated
          },
          {
            name: 'ID',
            value: this.track.id
          },
        ],
        timing: [
          {
            name: 'Meter',
            header: 'meter',
            filter: 'meter'
          },
          {
            name: 'Tempo',
            header: 'tempo',
            filter: ''
          }
        ],
        durations: [
          {
            name: 'beat unit',
            header: 'beat-unit',
            filter: 'fractionize'
          },
          {
            name: 'pulse beat',
            header: 'pulse-beat',
            filter: 'fractionize'
          },
          {
            name: 'beat units in bar',
            header: 'beat-units-per-measure',
            filter: ''
          },
          {
            name: 'pulse beats in bar',
            header: 'pulse-beats-per-measure',
            filter: ''
          },

          {
            name: 'total bars',
            // TODO: Update name of this header in `bach`, poorly named (or create alias such as `total-measures`
            header: 'total-beats',
            filter: 'fractionize'
          },
          {
            name: 'total beat units',
            header: 'total-beat-units',
            filter: ''
          },
          {
            name: 'total pulse beats',
            header: 'total-pulse-beats',
            filter: ''
          },
          {
            name: 'ms per beat unit',
            header: 'ms-per-beat-unit',
            filter: 'round'
          },
          {
            name: 'ms per pulse beat',
            header: 'ms-per-pulse-beat',
            filter: 'round'
          }
        ]
      }
    }
  },

  methods: {
    valueOf (metric) {
      return metric.value || this.headers[metric.header]
    },

    pretty (metric) {
      const value = this.valueOf(metric)

      if (metric.filter) {
        return this.$options.filters[metric.filter](value)
      }

      return value
    },

    copy (metric) {
      if (clipboard.isSupported) {
        clipboard.copy(this.valueOf(metric))
      }
    },
  }
}
</script>
