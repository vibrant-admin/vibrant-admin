<script setup lang="ts">
import type { UseScrollReturn } from '@vueuse/core'
import { vScroll } from '@vueuse/components'
import Header from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Tabbar from './components/Tabbar/index.vue'

const route = useRoute()
const keepAliveStore = useKeepAliveStore()
const isLink = computed(() => !!route.meta.link)
const isTop = ref(true)
function onScroll({ arrivedState }: { arrivedState: UseScrollReturn['arrivedState'] }) {
  const { top } = arrivedState
  isTop.value = top
}
</script>

<template>
  <div class="flex flex-col h-[100vh] w-[100vw] relative">
    <div class="text-foreground border-b border-border bg-background h-[60px] w-full transition-colors">
      <Header />
    </div>
    <div class="flex flex-1 overflow-hidden">
      <div class="border-r border-border flex-none h-[100%] w-[250px] transition-colors">
        <Sidebar />
      </div>
      <div class="bg-[--main-area-bg] flex flex-auto flex-col w-0 transition-colors">
        <div
          class="tabbar-container py-1 border-b border-border h-[48px] transition-colors" :class="{
            mask: !isTop,
          }"
        >
          <Tabbar />
        </div>
        <div v-scroll="onScroll" class="p-4 flex-1 relative overflow-auto">
          <RouterView v-slot="{ Component }">
            <Transition name="main" mode="out-in">
              <KeepAlive :include="keepAliveStore.list">
                <component :is="Component" v-show="!(isLink)" :key="route.fullPath" />
              </KeepAlive>
            </Transition>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-enter-active,
.main-leave-active {
  transition: opacity 150ms ease;
}

.main-enter-from,
.main-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.tabbar-container {
  position: relative;

  &::before {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    pointer-events: none;
    content: "";
    background-image: linear-gradient(0deg, transparent, var(--main-area-bg));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.mask {
    &::before {
      opacity: 1;
    }
  }
}
</style>
