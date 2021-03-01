<template>
  <v-tooltip
    top
    open-delay="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        :disabled="!enabled"
        @click="click"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </template>

    <span>Delete all tracks</span>
  </v-tooltip>
</template>

<script>
import { nuke, multiple } from '@/use/tracks'
import { warn } from '@/use/warn'

export default {
  computed: {
    enabled: () => multiple.value
  },

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
