<script setup lang="ts">
import Sortable from 'sortablejs'

const router = useRouter()
const route = useRoute()
const tabbarStore = useTabbarStore()
const containerRef = useTemplateRef('containerRef')

watch(() => route.fullPath, () => {
  tabbarStore.add(route)
}, { immediate: true })

// 当前激活标签
let activeTabBackup = ''
const activeTab = computed(() => {
  if (route.name === 'reload') {
    return activeTabBackup
  }
  return activeTabBackup = route.fullPath
})

const isDragging = ref(false)
onMounted(() => {
  if (containerRef.value) {
    Sortable.create(containerRef.value.$el, {
      animation: 150,
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

function contextMenu(tab: any) {
  const tabIndex = tabbarStore.list.findIndex(item => item.fullPath === tab.fullPath)
  return [
    {
      label: '重新加载',
      icon: 'i-ri-refresh-line',
      disabled: route.fullPath !== tab.fullPath,
      click: () => {
        router.push({ name: 'reload' })
      },
    },
    {
      label: '关闭标签',
      icon: 'i-ri-close-large-line',
      disabled: tabbarStore.list.length <= 1,
      click: () => {
        tabbarStore.remove(tab)
      },
    },
    {
      label: '关闭其他标签',
      icon: 'i-ri-close-large-line',
      disabled: tabbarStore.list.length <= 1,
      click: () => {
        const removeList = tabbarStore.list.filter(item => item.fullPath !== tab.fullPath)
        removeList.forEach((item) => {
          tabbarStore.remove(item)
        })
      },
    },
    {
      label: '关闭左侧标签',
      icon: 'i-ri-expand-left-line',
      disabled: tabIndex <= 0,
      click: () => {
        const removeList = tabbarStore.list.slice(0, tabIndex)
        removeList.forEach((item) => {
          tabbarStore.remove(item)
        })
      },
    },
    {
      label: '关闭右侧标签',
      disabled: tabIndex >= tabbarStore.list.length - 1,
      icon: 'i-ri-expand-right-line',
      click: () => {
        const removeList = tabbarStore.list.slice(tabIndex + 1)
        removeList.forEach((item) => {
          tabbarStore.remove(item)
        })
      },
    },
  ]
}
</script>

<template>
  <VXScroll>
    <TransitionGroup ref="containerRef" tag="div" class="mx-1 h-full flex select-none gap-1" :name="!isDragging ? 'tabbar' : undefined">
      <VContextMenu
        v-for="tab in tabbarStore.list"
        :key="tab.fullPath"
        :menu="contextMenu(tab)"
        class="tab-item relative h-full w-[150px] flex flex-none cursor-pointer select-none items-center gap-1 border border-transparent rounded px-2 text-basic-10 transition-colors hover:bg-basic-2 dark:hover:bg-basic-2"
        :class="{
          '!bg-basic !dark:bg-basic-3 !border-basic-2 !dark:border-basic-4 !text-basic-20': activeTab === tab.fullPath,
        }"
        @click="router.push(tab.fullPath)"
      >
        <VIcon :name="tab.icon" />
        <div
          :class="{
            'me-5': tabbarStore.list.length > 1,
          }" class="[mask-image:linear-gradient(to_right,#000_calc(100%-20px),transparent)] me-1 flex-1 overflow-hidden text-nowrap text-sm"
        >
          {{ tab.title }}
        </div>
        <div v-show="tabbarStore.list.length > 1" class="absolute right-2 h-[16px] w-[16px] flex items-center justify-center text-basic-20 transition-color hover:text-primary" @click.stop="tabbarStore.remove(tab)">
          <VIcon name="i-ri-close-line" />
        </div>
      </VContextMenu>
    </TransitionGroup>
  </VXScroll>
</template>

<style>
.tabbar-move,
.tabbar-enter-active,
.tabbar-leave-active {
  pointer-events: none;
  transition: opacity 150ms, transform 150ms;
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
