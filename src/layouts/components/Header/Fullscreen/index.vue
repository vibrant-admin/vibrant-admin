<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="text-lg font-bold p-2 rounded bg-transparent flex cursor-pointer transition-colors items-center hover:bg-secondary" @click.exact="toggle">
    <VIcon :name="isFullscreen ? 'i-material-symbols:fullscreen-exit-rounded' : 'i-material-symbols:fullscreen-rounded'" />
  </div>
</template>
