<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="flex cursor-pointer items-center rounded bg-transparent p-2 text-lg font-bold transition-colors hover:bg-secondary" @click.exact="toggle">
    <VIcon :name="isFullscreen ? 'i-material-symbols:fullscreen-exit-rounded' : 'i-material-symbols:fullscreen-rounded'" />
  </div>
</template>
