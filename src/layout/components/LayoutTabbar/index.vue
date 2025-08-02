<script setup lang="ts">
defineExpose({
  name: 'LayoutHeader',
})
</script>

<template>
  <div class="layout-tabbar" />
</template>

<style scoped>
.layout-tabbar {
  position: fixed;
  top: var(--layout-header-height);
  left: var(--layout-sidebar-width);
  width: calc(100% - var(--layout-sidebar-width));
  height: var(--layout-tabbar-height);
  background-color: var(--layout-tabbar-background-color);
  border-bottom: 1px solid var(--layout-tabbar-border-color);
}
</style>
