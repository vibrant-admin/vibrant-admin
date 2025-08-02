<script setup lang="ts">
import ColorScheme from './components/ColorScheme/index.vue'
import Fullscreen from './components/Fullscreen/index.vue'
import Refresh from './components/Refresh/index.vue'

defineExpose({
  name: 'LayoutHeader',
})
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <header class="layout-header">
    <div class="app-title">
      {{ title }}
    </div>
    <div class="opt-bar">
      <Refresh class="opt-item" />
      <Fullscreen class="opt-item" />
      <ColorScheme class="opt-item" />
    </div>
  </header>
</template>

<style scoped>
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--layout-header-height);
  padding: 0 20px;
  background-color: var(--layout-header-background-color);
  border-bottom: 1px solid var(--layout-header-border-color);

  .app-title {
    font-size: 22px;
    font-weight: 600;
  }

  .opt-bar {
    display: flex;
    gap: 10px;
    align-items: center;

    .opt-item {
      padding: 5px;
      cursor: pointer;
      border-radius: 3px;
      transition: background-color 0.3s;

      &:hover {
        background-color: hsl(var(--color-secondary));
      }
    }
  }
}
</style>
