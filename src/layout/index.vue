<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutMain from './components/LayoutMain/index.vue'
import LayoutSidebar from './components/LayoutSidebar/index.vue'
import LayoutTabbar from './components/LayoutTabbar/index.vue'
</script>

<template>
  <div class="layout-container">
    <LayoutHeader />
    <LayoutSidebar />
    <LayoutTabbar />
    <LayoutMain>
      <RouterView />
    </LayoutMain>
  </div>
</template>

<style>
.layout-container {
  --layout-header-height: 60px;
  --layout-header-background-color: hsl(var(--color-main));
  --layout-header-border-color: hsl(var(--color-main-border));

  --layout-sidebar-width: 220px;
  --layout-sidebar-background-color: hsl(var(--color-main));
  --layout-sidebar-border-color: hsl(var(--color-main-border));

  --layout-tabbar-height: 50px;
  --layout-tabbar-background-color: hsl(var(--color-secondary));
  --layout-tabbar-border-color: hsl(var(--color-secondary-border));

  --layout-main-background-color: hsl(var(--color-secondary));
}
</style>
