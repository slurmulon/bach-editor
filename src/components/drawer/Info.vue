<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Information
        </v-list-item-title>
        <v-list-item-subtitle>
          Useful track data
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-expansion-panels
      accordion
      class="mb-6"
    >
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
        style="background: transparent"
      >
        <v-expansion-panel-header expand-icon="mdi-menu-down">
          Item
        </v-expansion-panel-header>
        <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list>
</template>
