<template>
  <v-list-item
    @click.stop="save"
  >
    <v-list-item-avatar>
      <v-icon>mdi-download</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      Export tracks
    </v-list-item-content>

    <a
      ref="download"
      style="display: none"
    />
  </v-list-item>
</template>

<script>
import { archive } from '@/use/tracks'

export default {
  data: () => ({
    open: false
  }),

  methods: {
    save () {
      const { download } = this.$refs
      const json = archive()
      const encoded = encodeURIComponent(JSON.stringify(json))
      const href = `data:text/json;charset=utf-8,${encoded}`
      const filename = `bach-editor-track-archive-${json.created}.json`

      download.setAttribute('href', href)
      download.setAttribute('download', filename)
      download.click()
    }
  }
}
</script>
