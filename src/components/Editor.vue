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

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <component
          :is="`bach-${item}`"
          keep-alive
        />
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import BachCode from './editor/Code'
import BachJson from './editor/Json'

export default {
  components: {
    BachCode,
    BachJson
  },

  data: () => ({
    tab: null,
    items: ['code', 'json']
  }),

  methods: {

  }
}
</script>
