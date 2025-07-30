<script setup lang="ts">
import { vResizeObserver } from '@vueuse/components'
import Breadcrumb from './Breadcrumb/index.vue'
import ColorScheme from './ColorScheme/index.vue'
import Favorites from './Favorites/index.vue'
import Fullscreen from './Fullscreen/index.vue'
import Notification from './Notification/index.vue'
import Refresh from './Refresh/index.vue'

const title = import.meta.env.VITE_APP_TITLE
const wrapperWidth = ref(0)
function onResizeObserver(entries: ReadonlyArray<ResizeObserverEntry>) {
  wrapperWidth.value = entries[0].contentRect.width
}

// 是否有多余空间显示面包屑
const hasBreadcrumb = computed(() => wrapperWidth.value > 800)
</script>

<template>
  <header v-resize-observer="onResizeObserver">
    <div class="flex gap-5 items-center">
      <VIcon name="logo" class="size-3em" />
      <h1 class="text-2xl text-basic-20 font-bold transition-color">
        {{ title }}
      </h1>
      <Breadcrumb v-if="hasBreadcrumb" />
    </div>
    <div class="text-basic-20 flex gap-3 transition-color items-center">
      <Favorites />
      <Notification />
      <Fullscreen />
      <Refresh />
      <ColorScheme />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;

  .add {
    font-size: 20px;
  }
}
</style>
