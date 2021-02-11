<template>
  <layout>
    <router-view />
  </layout>
</template>

<script>
import Layout from './components/Layout'

export default {
  name: 'BachEditor',

  components: {
    Layout
  },

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Advent+Pro:wght@100;300;400;500;600&display=swap');

/* .title.brand span { */
.logo > span.brand {
  font-family: 'Aladin', cursive !important;
}
</style>
