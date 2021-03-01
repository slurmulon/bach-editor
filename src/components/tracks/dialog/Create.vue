<template>
  <v-dialog
    v-model="open"
    max-width="400"
  >
    <template #activator="dialog">
      <v-tooltip
        top
        open-delay="500"
      >
        <template #activator="tooltip">
          <div
            v-on="tooltip.on"
            v-bind="tooltip.attrs"
          >
            <v-btn
              fab
              small
              :color="btn.color || 'secondary'"
              v-on="dialog.on"
              v-bind="{ ...btn, ...dialog.attrs }"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </template>
        <span>Create new track</span>
      </v-tooltip>
    </template>

    <v-form @submit.prevent="save">
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
            text
            color="primary"
            @click="save"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { create } from '@/use/tracks'

export default {
  props: {
    btn: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

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
  },

  watch: {
    open (next) {
      if (next) {
        this.inputs.name = ''
      }
    }
  }
}
</script>
