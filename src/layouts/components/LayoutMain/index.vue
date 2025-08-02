<script setup lang="ts">
defineExpose({
  name: 'LayoutMain',
})
</script>

<template>
  <main class="layout-main">
    <slot />
  </main>
</template>

<style scoped>
.layout-main {
  position: absolute;
  left: var(--layout-sidebar-width);
  width: calc(100% - var(--layout-sidebar-width));
  min-height: calc(100% - var(--layout-header-height) - var(--layout-tabbar-height));
  padding: 20px;
  margin-top: calc(var(--layout-header-height) + var(--layout-tabbar-height));
  background-color: var(--layout-main-background-color);
}
</style>
