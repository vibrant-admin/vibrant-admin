<script setup lang="ts">
import type { UseScrollReturn } from '@vueuse/core'
import { vResizeObserver, vScroll } from '@vueuse/components'

const wrapperSize = reactive({ width: 0, height: 0 })
const contentSize = reactive({ width: 0, height: 0 })
// 滚动条是否在开始位置
const isScrollStart = ref(true)
// 滚动条是否在结束位置
const isScrollEnd = ref(false)

// 是否有左侧遮罩
const isMaskLeft = computed(() => wrapperSize.width < contentSize.width && !isScrollStart.value)
// 是否有右侧遮罩
const isMaskRight = computed(() => wrapperSize.width < contentSize.width && !isScrollEnd.value)

function onResizeObserver(entries: ReadonlyArray<ResizeObserverEntry>) {
  const [entry] = entries
  const { width, height } = entry.contentRect
  wrapperSize.width = width
  wrapperSize.height = height
}
function onContentResizeObserver(entries: ReadonlyArray<ResizeObserverEntry>) {
  const [entry] = entries
  const { width, height } = entry.contentRect
  contentSize.width = width
  contentSize.height = height
}

function onScroll({ arrivedState }: { arrivedState: UseScrollReturn['arrivedState'] }) {
  const { top, bottom } = arrivedState
  isScrollStart.value = top
  isScrollEnd.value = bottom
}
</script>

<template>
  <div
    v-resize-observer="onResizeObserver"
    class="v-x-scroll h-full w-full relative" :class="{
      'mask-l': isMaskLeft,
      'mask-r': isMaskRight,
    }" :style="{
      '--width': `${wrapperSize.width}px`,
      '--height': `${wrapperSize.height}px`,
    }"
  >
    <div v-scroll="onScroll" class="v-scroll h-[var(--width)] w-[var(--height)] transform-origin-tl transform-translate-y-[var(--height)] transform-rotate--90 overflow-x-hidden overflow-y-auto">
      <div v-resize-observer="onContentResizeObserver" class="h-[var(--height)] w-[var(--width)] transform-origin-tl transform-translate-x-[var(--height)] transform-rotate-90 [width:max-content]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-x-scroll {
  &::before,
  &::after {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 50px;
    height: 100%;
    pointer-events: none;
    content: "";
    background-image: linear-gradient(-90deg, transparent, var(--basic-1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
    transform: rotate(180deg);
  }

  &.mask-l::before {
    opacity: 1;
  }

  &.mask-r::after {
    opacity: 1;
  }
}

.v-scroll::-webkit-scrollbar {
  display: none;
}
</style>
