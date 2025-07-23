<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import ColorScheme from './ColorScheme/index.vue'
import Fullscreen from './Fullscreen/index.vue'
import Notification from './Notification/index.vue'
import Refresh from './Refresh/index.vue'

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <header>
    <div class="flex gap-5 items-center">
      <VIcon name="logo" class="size-3em" />
      <h1 class="text-2xl font-bold">
        {{ title }}
      </h1>
      <Breadcrumb />
    </div>
    <div class="flex items-center">
      <Notification />
      <Fullscreen />
      <Refresh />
      <ColorScheme />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
}
</style>
