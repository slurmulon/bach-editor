<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="color"
    elevation="24"
  >
    {{ text }}
  </v-snackbar>
</template>

<script>
import { open, text, color, timeout } from '@/use/notify'

export default {
  computed: {
    text: () => text.value,
    color: () => color.value,
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
