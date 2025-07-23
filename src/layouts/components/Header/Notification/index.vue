<script setup lang="ts">
defineOptions({
  name: 'Notification',
})

const notificationStore = useNotificationStore()

notificationStore.init()
</script>

<template>
  <ElBadge :value="notificationStore.total" :offset="[-8, 8]" :is-dot="notificationStore.total > 9" :show-zero="false">
    <div class="animation text-lg font-bold p-2 rounded bg-transparent flex cursor-pointer transition-colors items-center hover:bg-secondary">
      <VIcon name="i-material-symbols:notifications-outline-rounded" class="icon" />
    </div>
  </ElBadge>
</template>

<style scoped>
.animation {
  .icon {
    transform-origin: center top;
  }

  &:hover .icon {
    animation: animation 1s;
  }
}

@keyframes animation {
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
</style>
