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
        v-for="(group, key) in items"
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
import { selected as track } from '@/use/tracks'
import { music, durations } from '@/use/player'
import { clipboard } from '@/use/editor'
import { right as open, mini } from '@/use/drawer'

import { get, set } from '@vueuse/core'
import dlv from 'dlv'

export default {
  data: () => ({
    panel: [1, 1, 0, 0]
  }),

  computed: {
    track: () => get(track),
    music: () => get(music),

    open: {
      get: () => get(open),
      set: (value) => set(open, value)
    },

    items () {
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
        units: [
          {
            name: 'pulse beat',
            unit: 'beat.pulse',
            filter: 'fractionize'
          },
          {
            name: 'step beat',
            unit: 'beat.step',
            filter: 'fractionize'
          },
          {
            name: 'pulse beats in bar',
            unit: 'bar.pulse',
            filter: ''
          },
          {
            name: 'step beats in bar',
            unit: 'bar.step',
            filter: ''
          },
          {
            name: 'ms per pulse beat',
            unit: 'time.pulse',
            filter: 'numeric'
          },
          {
            name: 'sec. per pulse beat',
            value: get(durations).cast(get(durations).times.pulse, { is: 'ms', as: 'second' }),
            filter: 'numeric'
          },
          {
            name: 'ms per step beat',
            unit: 'time.step',
            filter: 'numeric'
          },
          {
            name: 'sec. per step beat',
            value: get(durations).cast(get(durations).times.step, { is: 'ms', as: 'second' }),
            filter: 'numeric'
          },
          {
            name: 'ms per bar',
            value: get(durations).cast(get(durations).bar, { as: 'ms' }),
            filter: 'numeric'
          },
          {
            name: 'seconds per bar',
            value: get(durations).cast(get(durations).bar, { as: 'second' }),
            filter: 'numeric'
          }
        ],
        totals: [
          {
            name: 'total bars',
            value: get(durations).cast(get(durations).total, { as: 'bar' }),
            filter: 'fractionize'
          },
          {
            name: 'total pulse beats',
            value: get(durations).cast(get(durations).total, { as: 'pulse' }),
            filter: ''
          },
          {
            name: 'total step beats',
            metric: 'total',
            filter: ''
          },
          {
            name: 'total ms',
            value: get(durations).cast(get(durations).total, { as: 'ms' }),
            filter: 'numeric'
          },
          {
            name: 'total seconds',
            value: get(durations).cast(get(durations).total, { as: 'second' }),
            filter: 'numeric'
          }
        ]
      }
    }
  },

  methods: {
    valueOf (item) {
      return item.value
        || dlv(this.music.headers, item.header || '')
        || dlv(this.music.units, item.unit || '')
        || dlv(this.music.metrics, item.metric || '')
    },

    pretty (item) {
      const value = this.valueOf(item)

      if (item.filter) {
        return this.$options.filters[item.filter](value)
      }

      return value
    },

    copy (item) {
      if (clipboard.isSupported) {
        clipboard.copy(this.valueOf(item))
      }
    }
  }
}
</script>
