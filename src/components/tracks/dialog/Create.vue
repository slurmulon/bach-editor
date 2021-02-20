<template>
  <v-dialog
    v-model="open"
    max-width="400"
  >
    <template #activator="dialog">
      <v-tooltip :value="tip" top>
        <template #activator="tooltip">
          <div
            v-on="tooltip.on"
            v-bind="tooltip.attrs"
          >
            <v-btn
              fab
              small
              color="secondary"
              v-on="dialog.on"
              v-bind="dialog.attrs"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </template>
        <span>Create new track</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-toolbar>
        <v-toolbar-title>New Track</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          v-model="inputs.name"
          label="Name"
          outlined
          counter
          maxlength="32"
          required
          autofocus
          class="mt-8"
        />
      </v-card-text>
      <v-divider />

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
    tip: false,
    inputs: {
      name: ''
    }
  }),

  methods: {
    save () {
      create(this.inputs)

      this.open = false
    }
  },

  watch: {
    open (next) {
      if (next) {
        this.inputs.name = ''
        this.tip = false
      }
    }
  }
}
</script>
