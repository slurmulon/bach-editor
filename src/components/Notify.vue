<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="color"
    elevation="24"
    bottom
    v-bind="attrs"
  >
    <v-icon>{{ icon }}</v-icon>
    <span>{{ text }}</span>

    <template #action="{ attrs }">
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
import { open, text, color, icon, timeout, attrs } from '@/use/notify'

export default {
  computed: {
    text: () => text.value,
    color: () => color.value,
    icon: () => icon.value,
    timeout: () => timeout.value,
    attrs: () => attrs.value,

    show: {
      get: () => open.value,
      set: (value) => open.value = value
    }
  }
}
</script>
