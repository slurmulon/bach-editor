<template>
  <div>
    Player! {{ sections.length }}
    <ul>
      <li
        v-for="(section, $index) in sections"
        :key="$index"
      >
        {{ section.parts.chord.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { sections, playing } from '@/use/player'

export default {
  computed: {
    playing: () => playing.value,
    sections: () => sections.value
  }
}
</script>
