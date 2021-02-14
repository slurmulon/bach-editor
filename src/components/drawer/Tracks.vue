<template>
  <v-list
    class="pl-14"
    shaped
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Tracks
        </v-list-item-title>
        <v-list-item-subtitle>
          Your local tracks
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list-item
      v-for="n in 5"
      :key="n"
      link
    >
      <v-list-item-content>
        <v-list-item-title>Item {{ n }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
