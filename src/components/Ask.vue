<template>
  <v-dialog
    v-model="show"
    transition="dialog-bottom-transition"
    max-width="300"
  >
    <v-card>
      <v-toolbar
        dark
      >
        Warning
      </v-toolbar>
      <v-card-text>
        {{ text }}
        <!-- <div class="text-h2 pa-12">Hello world!</div> -->
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
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { open, yes, no, text, icon } from '@/use/ask'

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
