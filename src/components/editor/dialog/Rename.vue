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
              icon
              small
              v-on="dialog.on"
              v-bind="dialog.attrs"
            >
              <v-icon small>mdi-pencil-outline</v-icon>
            </v-btn>
          </div>
        </template>
        <span>Rename track</span>
      </v-tooltip>
    </template>

    <v-card>
      <v-toolbar>
        <v-toolbar-title>Rename Track</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          outlined
          counter
          maxlength="32"
          required
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
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { name } from '@/use/editor'
import { update } from '@/use/tracks'

export default {
  data: () => ({
    open: false,
    inputs: {
      name: ''
    }
  }),

  computed: {
    name: {
      get () {
        return this.inputs.name || name.value
      },

      set (value) {
        this.inputs.name = value
      }
    }
  },

  methods: {
    save () {
      update(this.inputs)

      this.open = false
    }
  },

  watch: {
    open (next) {
      if (next) {
        this.name = ''
      }
    }
  }
}
</script>
