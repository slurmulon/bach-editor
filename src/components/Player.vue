<template>
  <div>
    <ul>
      <li
        v-for="(section, $index) in sections"
        :key="$index"
        :style="{ color: index == $index ? $vuetify.theme.themes.dark.primary: null }"
      >
        {{ section.parts.chord.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { sections, index, playing } from '@/use/player'

export default {
  computed: {
    playing: () => playing.value,
    sections: () => sections.value,
    index: () => index.value
  }
}
</script>
