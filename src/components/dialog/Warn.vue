<template>
  <v-dialog
    v-model="show"
    max-width="450"
  >
    <v-card>
      <v-toolbar>
        <v-icon class="mr-3">{{ icon }}</v-icon>
        <v-toolbar-title>Warning</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <div class="pt-9">
          {{ text }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-checkbox
          v-if="ignorable"
          v-model="ignore"
          label="Ignore"
        />

        <v-spacer />

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
import { open, yes, no, prob, text, icon, ignorable, ignoring, ignore } from '@/use/warn'

export default {
  computed: {
    text: () => text.value,
    icon: () => icon.value,
    ignorable: () => ignorable.value,

    show: {
      get: () => open.value,
      set: (value) => open.value = value
    },

    ignore: {
      get: () => ignoring().value,
      set: (value) => ignore()
    }
  },

  methods: {
    yes,
    no
  }
}

</script>
