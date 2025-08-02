<script setup lang="ts">
defineExpose({
  name: 'LayoutSidebar',
})
</script>

<template>
  <aside class="layout-sidebar" />
</template>

<style scoped>
.layout-sidebar {
  position: fixed;
  top: var(--layout-header-height);
  width: var(--layout-sidebar-width);
  height: 100%;
  background-color: var(--layout-sidebar-background-color);
  border-right: 1px solid var(--layout-sidebar-border-color);
}
</style>
