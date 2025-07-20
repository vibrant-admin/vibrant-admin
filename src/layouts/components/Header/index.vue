<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import ColorScheme from './ColorScheme/index.vue'

const title = import.meta.env.VITE_SITE_TITLE
</script>

<template>
  <header class="border-b border-border">
    <div class="flex items-center gap-5">
      <h1 class="text-2xl font-bold">
        {{ title }}
      </h1>
      <Breadcrumb />
    </div>
    <div class="flex items-center gap-3">
      <ColorScheme />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
}
</style>
