<script setup lang="ts">
import Menu from '../Menu/index.vue'

const menuStore = useMenuStore()
</script>

<template>
  <div class="h-full w-full overflow-x-hidden overflow-y-auto">
    <Menu :data="menuStore.allMenus" />
  </div>
</template>
