<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tabbarStore = useTabbarStore()
const menuStore = useMenuStore()

watch(() => route.fullPath, () => {
  tabbarStore.add(route)
}, { immediate: true })
</script>

<template>
  <VXScroll>
    <div class="mx-1 flex gap-1 h-full">
      <TransitionGroup name="tabbar">
        <div
          v-for="tab in tabbarStore.list"
          :key="tab.fullPath"
          class="tab-item px-2 rounded flex flex-none gap-1 h-full w-[150px] cursor-pointer transition-colors items-center relative"
          :class="{
            active: menuStore.defaultActive === tab.fullPath,
          }"
          @click="router.push(tab.fullPath)"
        >
          <VIcon :name="tab.icon" class="icon" />
          <div class="title text-sm flex-1 text-nowrap overflow-hidden">
            {{ tab.title }}
          </div>
          <div class="flex h-[16px] w-[16px] transition-colors items-center right-2 justify-center absolute hover:text-primary" @click.stop="tabbarStore.remove(tab)">
            <VIcon name="i-ri-close-line" />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </VXScroll>
</template>

<style>
.tabbar-move, /* 对移动中的元素应用的过渡 */
.tabbar-enter-active,
.tabbar-leave-active {
  transition: all 0.3s ease;
}

.tabbar-enter-from,
.tabbar-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.tabbar-leave-active {
  position: absolute;
}
</style>

<style scoped>
.tab-item {
  --opacity: 0.5;

  &:hover {
    --uno: bg-secondary;
  }

  .icon {
    opacity: var(--opacity);
  }

  .title {
    margin-inline-end: 20px;
    opacity: var(--opacity);
    mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
  }

  &.active {
    --opacity: 1;
    --uno: bg-background;
  }
}
</style>
