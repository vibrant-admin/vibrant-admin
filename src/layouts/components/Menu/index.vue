<script setup lang="ts">
import MenuItem from './item.vue'

defineProps<{
  data: any
}>()
</script>

<template>
  <ElMenu default-active="/system/user" router>
    <MenuItem v-for="item in data" :key="item.path" :menu-item="item" />
  </ElMenu>
</template>
