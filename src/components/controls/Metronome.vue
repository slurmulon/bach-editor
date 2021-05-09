<template>
  <v-col
    cols="6"
    sm="4"
  >
    <v-row nowrap no-gutters>
      <v-col class="grow">
        <v-row
          nowrap
          no-gutters
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-col
            v-for="beat in beats"
            :key="beat"
          >
            <v-icon :color="color(beat)">
              mdi-circle-small
            </v-icon>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="shrink pr-2">
        <!-- <v-btn-toggle -->
        <!--   :value="[audible ? 0 : null]" -->
        <!--   borderless -->
        <!--   dense -->
        <!-- > -->
          <v-btn small icon :input-value="audible || null" @click.stop="audible = !audible">
            <v-icon small>mdi-ear-hearing</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { music, metronome, playing, settings, configure } from '@/use/player'
import dlv from 'dlv'

export default {
  computed: {
    playing: () => playing.value,
    current: () =>  metronome.value,
    beats: () => dlv(music.value, 'units.bar.pulse') || 0,
    audible: {
      get: (metronome) => settings.value.metronome,
      set: (metronome) => { console.log('settttt', metronome); return configure({ metronome }) }
    }
  },

  methods: {
    color (beat) {
      if (!this.playing)
        return 'grey darken-3'
      if (this.current != null && (beat - 1 <= this.current))
        return 'primary'
    }
  }
}
</script>
