<script setup lang="ts">
defineOptions({
  name: 'Favorites',
})
const favoritesStore = useFavoritesStore()
const route = useRoute()
function onAdd() {
  favoritesStore.add(route)
}
</script>

<template>
  <ElPopover placement="bottom" trigger="click" :width="300">
    <template #reference>
      <div class="flex cursor-pointer items-center rounded p-2 text-lg font-bold hover:bg-basic-1 dark:hover:bg-basic-3">
        <VIcon v-if="!favoritesStore.isAdded(route.fullPath)" name="i-ri-star-line" />
        <VIcon v-else name="i-ri-star-fill" />
      </div>
    </template>
    <div class="p-3 text-basic-20">
      <div class="mb-2 mb-4 flex items-center justify-between text-lg font-600 leading-none">
        <div>我的收藏夹</div>
        <div class="flex cursor-pointer rounded p-1" @click="onAdd">
          <VIcon v-if="!favoritesStore.isAdded(route.fullPath)" name="i-ri-star-s-line" />
          <VIcon v-else name="i-ri-star-s-fill" />
        </div>
      </div>
      <div v-if="favoritesStore.list.length" class="grid grid-cols-2 mb-3 gap-2">
        <div v-for="item in favoritesStore.list" :key="item.fullPath" class="group relative flex cursor-pointer items-center justify-between overflow-hidden border border-basic-4 rounded border-dashed p-2 hover:(border-primary text-primary)" @click="() => $router.push(item.fullPath)">
          <div class="flex flex-1 items-center overflow-hidden whitespace-nowrap group-hover:[mask-image:linear-gradient(to_right,#000_calc(100%-50px),transparent)]">
            <VIcon v-if="item.icon" :name="item.icon" class="mr-2" />
            <span>{{ item.title }}</span>
          </div>
          <div class="absolute right-0 flex transform-translate-x-[100%] cursor-pointer items-center justify-center p-1.5 text-basic-20 transition-transform group-hover:transform-translate-x-0 hover:text-primary" @click.stop="favoritesStore.remove(item.fullPath)">
            <VIcon name="i-ri-close-line" />
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <VIcon class="mb-3 text-[24px]" name="i-ri-robot-3-line" />
        <div class="mb-1 text-[16px]">
          收藏夹是空的
        </div>
        <div class="flex items-center gap-1 opacity-60">
          点击右上角 <VIcon name="i-ri-star-s-line" /> 将当前页面添加到收藏夹
        </div>
      </div>
    </div>
  </ElPopover>
</template>
