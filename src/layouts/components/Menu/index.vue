<script setup lang="ts">
import MenuItem from './item.vue'

defineProps<{
  data: any
}>()

const menuStore = useMenuStore()

function handleSelect(key: string) {
  menuStore.defaultActive = key
}
</script>

<template>
  <ElMenu :default-active="menuStore.defaultActive" router @select="handleSelect">
    <MenuItem v-for="item in data" :key="item.path" :menu-item="item" />
  </ElMenu>
</template>
