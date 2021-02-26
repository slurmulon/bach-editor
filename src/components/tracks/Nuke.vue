<template>
  <v-btn
    icon
    @click="click"
  >
    <v-icon>mdi-delete-outline</v-icon>
  </v-btn>
</template>

<script>
import { nuke } from '@/use/tracks'
import { warn } from '@/use/warn'

export default {
  methods: {
    click () {
      warn({
        problem: 'nuking',
        then: () => nuke()
      })
    }
  }
}
</script>
