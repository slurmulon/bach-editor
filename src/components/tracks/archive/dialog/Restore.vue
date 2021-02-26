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
          Import tracks
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-form @submit.prevent="save">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Import Tracks</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
         <v-file-input
            label="Select archive file (.json, .tar.gz)"
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
            @click="save"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
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
