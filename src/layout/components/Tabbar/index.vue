<script setup lang="ts">
import Sortable from 'sortablejs'

const router = useRouter()
const route = useRoute()
const tabbarStore = useTabbarStore()
const menuStore = useMenuStore()
const containerRef = useTemplateRef('containerRef')

watch(() => route.fullPath, () => {
  tabbarStore.add(route)
}, { immediate: true })

const isDragging = ref(false)
onMounted(() => {
  if (containerRef.value) {
    Sortable.create(containerRef.value.$el, {
      animation: 200,
      ghostClass: 'opacity-0',
      draggable: '.tab-item',
      preventOnFilter: true,
      onStart: () => {
        isDragging.value = true
      },
      onEnd: () => {
        isDragging.value = false
      },
      onUpdate: (e) => {
        if (e.newIndex !== undefined && e.oldIndex !== undefined) {
          tabbarStore.sort(e.newIndex, e.oldIndex)
        }
      },
    })
  }
})
</script>

<template>
  <VXScroll>
    <TransitionGroup
      ref="containerRef" tag="div" class="mx-1 flex gap-1 h-full" :name="!isDragging ? 'tabbar' : undefined"
    >
      <div
        v-for="tab in tabbarStore.list"
        :key="tab.fullPath"
        class="tab-item px-2 rounded flex flex-none gap-1 h-full w-[150px] cursor-pointer select-none items-center relative"
        :class="{
          'transition-colors': !isDragging,
          'active': menuStore.defaultActive === tab.fullPath,
        }"
        @click="router.push(tab.fullPath)"
      >
        <VIcon :name="tab.icon" class="icon" />
        <div class="title text-sm flex-1 text-nowrap overflow-hidden">
          {{ tab.title }}
        </div>
        <div v-show="tabbarStore.list.length > 1" class="flex h-[16px] w-[16px] transition-colors items-center right-2 justify-center absolute hover:text-primary" @click.stop="tabbarStore.remove(tab)">
          <VIcon name="i-ri-close-line" />
        </div>
      </div>
    </TransitionGroup>
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
