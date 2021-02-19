<template>
  <v-dialog
    v-model="show"
    max-width="300"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar>
        <v-icon class="mr-3">{{ icon }}</v-icon>
        <v-toolbar-title>Warning</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="pt-4">
          {{ text }}
        </div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          text
          @click="no"
        >
          Cancel
        </v-btn>

        <v-btn
          text
          color="primary"
          @click="yes"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { open, yes, no, text, icon } from '@/use/warn'

export default {
  computed: {
    text: () => text.value,
    icon: () => icon.value,

    show: {
      get: () => open.value,
      set: (value) => open.value = value
    }
  },

  methods: {
    yes,
    no
  }
}

</script>
