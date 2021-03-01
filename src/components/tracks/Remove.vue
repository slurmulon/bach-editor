<template>
  <v-btn
    v-if="multiple"
    icon
    small
    @click.stop="remove"
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>

<script>
import { destroy, active, multiple } from '@/use/tracks'
import { dirty } from '@/use/editor'
import { warn } from '@/use/warn'

import { get } from '@vueuse/core'

export default {
  props: {
    track: {
      type: Object,
      required: true
    }
  },

  computed: {
    multiple: () => get(multiple)
  },

  methods: {
    remove () {
      if (get(dirty) && get(active(this.track))) {
        warn({
          problem: 'removing-dirty',
          then: () => destroy(this.track)
        })
      } else {
        warn({
          problem: 'removing-one',
          then: () => destroy(this.track)
        })
      }
    }
  }
}
</script>
