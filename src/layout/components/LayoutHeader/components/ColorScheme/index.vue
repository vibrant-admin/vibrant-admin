<script setup lang="ts">
const settingStore = useSettingStore()
</script>

<template>
  <div class="opt-item" @click="settingStore.toggleColorScheme">
    <VaIcon name="i-ri-sun-line" />
  </div>
</template>
