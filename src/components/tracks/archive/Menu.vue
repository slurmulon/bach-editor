<template>
  <v-menu
    left
  >
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
      <v-list-item>Import archive</v-list-item>
      <v-list-item>Export archive</v-list-item>
    </v-list>
  </v-menu>
</template>
