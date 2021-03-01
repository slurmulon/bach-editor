<template>
  <v-dialog
    v-model="open"
    max-width="400"
  >
     <v-form
       v-model="valid"
       @submit.prevent="load"
     >
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Import Archive</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-file-input
            v-model="inputs.file"
            :rules="rules"
            accept="application/json"
            label="Track archive file (.json)"
            prepend-icon="mdi-archive"
            show-size
            required
            class="mb-3"
          />

          <v-sheet
            outlined
            elevation="4"
            color="grey darken-3"
            class="pa-3"
          >
            <div class="mb-2">
              <v-icon
                small
                color="warning"
                class="pr-2"
              >
                mdi-alert
              </v-icon>
              <span class="text-subtitle-1 font-weight-bold">Warning</span>
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
            :disabled="!valid || !inputs.file"
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
  props: {
    show: {
      type: Boolean,
      required: false
    }
  },

  data: () => ({
    valid: false,
    inputs: { file: null },
    rules: [value => !value || value.size < 5000000 || 'Archive file must be less than 5MB!']
  }),

  computed: {
    open: {
      get () {
        return this.show
      },

      set (value) {
        this.$emit('update:show', value)
      }
    }
  },

  methods: {
    load () {
      restore(this.inputs.file)

      this.open = false
    }
  },

  watch: {
    open (next) {
      if (next) {
        this.inputs.file = null
      }
    }
  }
}
</script>
