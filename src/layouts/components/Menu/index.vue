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

<style scoped>
.el-menu {
  border-right: 0;
  --el-menu-item-height: 48px;
  --el-menu-sub-item-height: var(--el-menu-item-height);
  --el-menu-active-color: var(--primary-foreground);

  :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary);
  }

  .el-menu-item {
    margin: 10px;
  }
}
</style>
