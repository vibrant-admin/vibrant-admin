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
  top: calc((var(--layout-header-height) + var(--layout-tabbar-height)));
  left: var(--layout-sidebar-width);
  width: calc(100% - var(--layout-sidebar-width));
  padding: 20px;
  background-color: var(--layout-main-background-color);
}
</style>
