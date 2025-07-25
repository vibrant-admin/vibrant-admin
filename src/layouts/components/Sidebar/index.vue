<script setup lang="ts">
import Menu from '../Menu/index.vue'

const menuStore = useMenuStore()
</script>

<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto">
    <Menu :data="menuStore.allMenus" />
  </div>
</template>
