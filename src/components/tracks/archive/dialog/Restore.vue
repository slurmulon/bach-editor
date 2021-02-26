<template>
  <v-dialog
    v-model="open"
    max-width="400"
  >
    <template #activator="{ on, attrs }">
      <v-list-item
        v-on="on"
        v-bind="attrs"
      >
        <v-list-item-avatar>
          <v-icon>mdi-upload</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          Import track archive
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-form @submit.prevent="load">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Import Archive</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          {{ inputs.file }}
         <v-file-input
            v-model="inputs.file"
            label="Select archive file (.json)"
            show-size
          />

          <v-sheet
            outlined
            elevation="4"
            color="grey darken-3"
            class="pa-3"
          >
            <div class="mb-2">
              <v-icon
                color="warning"
                class="pr-2"
              >
                mdi-alert
              </v-icon>
              <span class="text-h6">Warning</span>
            </div>
            <div>
              Importing an archive will replace your current collection of tracks unless you have already created an export with your latest changes!
            </div>
          </v-sheet>
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
            :disabled="!inputs.file"
            @click="load"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { restore } from '@/use/tracks'

export default {
  data: () => ({
    open: false,
    inputs: {
      file: null
    }
  }),

  methods: {
    load () {
      restore(this.inputs.file)

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
