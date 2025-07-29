<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="text-lg font-bold p-2 rounded flex cursor-pointer items-center hover:bg-basic-1" @click.exact="toggle">
    <VIcon :name="isFullscreen ? 'i-ri-fullscreen-exit-line' : 'i-ri-fullscreen-line'" />
  </div>
</template>
