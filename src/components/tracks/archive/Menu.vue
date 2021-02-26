<template>
  <v-menu top>
    <template #activator="menu">
      <v-tooltip top>
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
        </template>
        <span>Manage archives</span>
      </v-tooltip>
    </template>

    <v-list dense>
      <restore />
      <create />
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
  }
}
</script>
