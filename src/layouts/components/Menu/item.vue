<script setup lang="ts">
defineOptions({
  name: 'MenuItem',
})
defineProps<{
  menuItem: any
}>()
</script>

<template>
  <ElSubMenu v-if="menuItem.children && menuItem.children.some((i:any) => i.meta?.menu !== false)" :index="menuItem.path">
    <template #title>
      <span>{{ menuItem.meta?.title }}</span>
    </template>
    <template v-for="childItem in menuItem.children" :key="childItem.path">
      <MenuItem v-if="childItem.meta?.menu !== false" :menu-item="childItem" />
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="menuItem.path">
    <template #title>
      <span>{{ menuItem.meta?.title }}</span>
    </template>
  </ElMenuItem>
</template>
