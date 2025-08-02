<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="opt-item" @click="toggle">
    <VaIcon :name="isFullscreen ? 'i-ri-fullscreen-exit-line' : 'i-ri-fullscreen-line'" />
  </div>
</template>
