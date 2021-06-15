<template>
  <layout>
    <template #default>
      <editor />
      <player />
    </template>

    <template #footer>
      <controls />
    </template>
  </layout>
</template>

<script>
import Layout from '@/components/Layout'
import Editor from '@/components/Editor'
import Player from '@/components/Player'
import Controls from '@/components/Controls'

import { runtime } from '@/use/app'
import { piano } from '@/runtimes'

export default {
  name: 'Home',
  components: {
    Layout,
    Editor,
    Player,
    Controls
  },
  created () {
    runtime(piano)
  }
}
</script>
