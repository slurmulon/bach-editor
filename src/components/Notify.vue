<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="color"
    multi-line
    bottom
    elevation="24"
  >
    <v-icon>{{ icon }}</v-icon>
    <span>{{ text }}</span>

    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { open, text, color, icon, timeout } from '@/use/notify'

export default {
  computed: {
    text: () => text.value,
    color: () => color.value,
    icon: () => icon.value,
    timeout: () => timeout.value,

    show: {
      get () {
        return open.value
      },

      set (show) {
        open.value = show
      }
    }
  }
}
</script>
