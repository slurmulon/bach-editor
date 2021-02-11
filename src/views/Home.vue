<template>
  <layout>
  <!-- <div class="home"> -->
  <!--   <img alt="Vue logo" src="../assets/logo.png"> -->
  <!--   <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- </div> -->
    <!-- Main content -->
    <editor />
  </layout>
</template>

<script>
import Layout from '@/components/Layout'
import Editor from '@/components/Editor'

export default {
  name: 'Home',
  components: {
    Layout,
    Editor
  }
}
</script>
