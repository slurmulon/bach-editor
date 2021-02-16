<template>
  <v-dialog
    v-model="open"
    max-width="300"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        fab
        small
        color="secondary"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">New Track</span>
      </v-card-title>

      <v-card-text class="pt-4 pb-0">
        <v-text-field
          v-model="inputs.name"
          label="Name"
          outlined
          counter
          maxlength="32"
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="open = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="save"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { create } from '@/use/tracks'

export default {
  data: () => ({
    open: false,
    inputs: {
      name: ''
    }
  }),

  methods: {
    save () {
      create(this.inputs)

      this.open = false
    }
  }
}
</script>
