<template>
  <v-tabs
    v-model="tab"
    background-color="transparent"
  >
    <v-tabs-slider color="primary" />

    <v-tab
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </v-tab>
  <!-- <prism-editor -->
  <!--   v-model="code" -->
  <!--   line-numbers -->
  <!-- /> -->
  </v-tabs>
</template>

<script>
// import { PrismEditor } from 'vue-prism-editor'

export default {
  components: {
    // PrismEditor
  },

  data: () => ({
    tab: null,
    items: ['code', 'json'],
    code: '@Meter = 4|4'
  }),

  methods: {

  }
}
</script>
