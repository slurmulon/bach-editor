<template>
  <v-menu
    v-model="open"
    top
    nudge-top="40"
  >
    <template #activator="menu">
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
              v-on="menu.on"
              v-bind="menu.attrs"
            >
              <v-icon>mdi-archive</v-icon>
            </v-btn>
          </div>

          <restore :show.sync="restoring" />
        </template>

        <span>Manage track archives</span>
      </v-tooltip>
    </template>

    <v-list dense>
      <v-list-item @click.stop="restore">
        <v-list-item-avatar>
          <v-icon>mdi-upload</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          Import track archive
        </v-list-item-content>
      </v-list-item>

      <create @done="open = false" />
    </v-list>
  </v-menu>
</template>

<script>
import Create from './Create'
import Restore from './dialog/Restore'

export default {
  components: {
    Create,
    Restore
  },

  data: () => ({
    open: false,
    restoring: false
  }),

  methods: {
    // Required to prevent v-menu from remaining after restore dialog closes
    restore () {
      this.restoring = true
      this.open = false
    }
  }
}
</script>
