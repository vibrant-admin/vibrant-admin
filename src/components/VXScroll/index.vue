<script setup lang="ts">
import { vResizeObserver } from '@vueuse/components'

const size = reactive({ width: 0, height: 0 })

function onResizeObserver(entries: ReadonlyArray<ResizeObserverEntry>) {
  const [entry] = entries
  size.width = entry.contentRect.width
  size.height = entry.contentRect.height
}
</script>

<template>
  <div
    v-resize-observer="onResizeObserver"
    class="h-full w-full" :style="{
      '--width': `${size.width}px`,
      '--height': `${size.height}px`,
    }"
  >
    <div class="v-scroll h-[var(--width)] w-[var(--height)] transform-origin-tl transform-translate-y-[var(--height)] transform-rotate--90 overflow-x-hidden overflow-y-auto">
      <div class="h-[var(--height)] w-[var(--width)] transform-origin-tl transform-translate-x-[var(--height)] transform-rotate-90">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-scroll::-webkit-scrollbar {
  display: none;
}
</style>
