<script setup lang="ts">
import Breadcrumb from '../Breadcrumb/index.vue'

const title = import.meta.env.VITE_SITE_TITLE
</script>

<template>
  <header class="h-12">
    <div class="logo">
      {{ title }}
    </div>
    <Breadcrumb />
  </header>
</template>
