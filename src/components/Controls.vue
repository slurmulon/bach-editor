<template>
  <div style="width: 100%">
    <progress-bar />

    <v-toolbar
      flat
      color="transparent"
    >
      <settings v-if="!$vuetify.breakpoint.mobile" />

      <volume />
      <v-spacer />

      <metronome />
      <play />
    </v-toolbar>
  </div>
</template>

<script>
import Play from './controls/Play'
import Volume from './controls/Volume'
import Metronome from './controls/Metronome'
import Settings from './controls/Settings'
import ProgressBar from './controls/Progress'

import { toggle, playing } from '@/use/player'
import { dirty } from '@/use/editor'

export default {
  computed: {
    playing: () => playing.value,
    dirty: () => dirty.value
  },

  methods: {
    toggle
  },

  components: {
    Play,
    Volume,
    Metronome,
    Settings,
    ProgressBar
  }
}
</script>
