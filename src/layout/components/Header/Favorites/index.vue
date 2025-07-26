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
      <div class="text-lg text-foreground font-bold p-2 rounded flex cursor-pointer items-center hover:bg-secondary">
        <VIcon v-if="!favoritesStore.isAdded(route.fullPath)" name="i-ri-star-line" />
        <VIcon v-else name="i-ri-star-fill" />
      </div>
    </template>
    <div class="p-3">
      <div class="text-lg text-foreground leading-none font-600 mb-2 mb-4 flex items-center justify-between">
        <div>我的收藏夹</div>
        <div class="p-1 rounded flex cursor-pointer" @click="onAdd">
          <VIcon v-if="!favoritesStore.isAdded(route.fullPath)" name="i-ri-star-s-line" />
          <VIcon v-else name="i-ri-star-s-fill" />
        </div>
      </div>
      <div v-if="favoritesStore.list.length" class="mb-3 grid grid-cols-2">
        <div v-for="item in favoritesStore.list" :key="item.fullPath" class="group p-2 border border-border rounded border-dashed flex cursor-pointer items-center justify-between relative overflow-hidden hover:(text-primary border-primary)" @click="() => $router.push(item.fullPath)">
          <div class="flex flex-1 whitespace-nowrap items-center overflow-hidden group-hover:[mask-image:linear-gradient(to_right,#000_calc(100%-50px),transparent)]">
            <VIcon v-if="item.icon" :name="item.icon" class="mr-2" />
            <span>{{ item.title }}</span>
          </div>
          <div class="p-1.5 bg-background flex cursor-pointer transform-translate-x-[100%] transition-transform items-center right-0 justify-center absolute hover:text-foreground group-hover:transform-translate-x-0" @click.stop="favoritesStore.remove(item.fullPath)">
            <VIcon name="i-ri-close-line" />
          </div>
        </div>
      </div>
      <div v-else class="text-foreground flex flex-col items-center justify-center">
        <VIcon class="text-[24px] mb-3" name="i-ri-robot-3-line" />
        <div class="text-[16px] mb-1">
          收藏夹是空的
        </div>
        <div class="opacity-60 flex gap-1 items-center">
          点击右上角 <VIcon name="i-ri-star-s-line" /> 将当前页面添加到收藏夹
        </div>
      </div>
    </div>
  </ElPopover>
</template>
