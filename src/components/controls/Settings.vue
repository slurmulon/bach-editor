<template>
  <v-btn-toggle
    dense
    group
    tile
    multiple
  >
    <v-tooltip
      top
      open-delay="250"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
        >
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </template>
      <span>Loop</span>
    </v-tooltip>

    <v-tooltip
      top
      open-delay="250"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
        >
          <v-icon>mdi-eye-settings</v-icon>
        </v-btn>
      </template>
      <span>Auto-scroll</span>
    </v-tooltip>
  </v-btn-toggle>
</template>

<script>

</script>
