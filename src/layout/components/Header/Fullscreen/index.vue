<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="flex cursor-pointer items-center rounded p-2 text-lg font-bold hover:bg-basic-1 dark:hover:bg-basic-3" @click.exact="toggle">
    <VIcon :name="isFullscreen ? 'i-ri-fullscreen-exit-line' : 'i-ri-fullscreen-line'" />
  </div>
</template>
