<template>
  <v-dialog
    v-model="show"
    max-width="300"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Rename Track</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-text-field
            v-model="name"
            label="Name"
            required
          />
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="open = false"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { name } from '@/use/editor'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    inputs: {
      name: ''
    }
  }),

  computed: {
    open: {
      get () {
        return this.show
      },

      set (show) {
        this.$emit('update:show', show)
      }
    },

    name: {
      get () {
        return this.inputs.name || name.value
      },

      set (value) {
        // name.value = value
        this.inputs.name = value
      }
    }
  },

  methods: {
    save () {
      name.value = this.inputs.name
      this.open = false
    }
  }
}
</script>
