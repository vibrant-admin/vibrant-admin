<script setup lang="ts">
defineOptions({
  name: 'Refresh',
})
const isAnimating = ref(false)
const router = useRouter()
function handleRefresh() {
  isAnimating.value = true
  router.push({ name: 'reload' })
}
</script>

<template>
  <div class="flex cursor-pointer items-center rounded p-2 text-lg font-bold hover:bg-basic-1 dark:hover:bg-basic-3" @click.exact="handleRefresh">
    <VIcon
      name="i-ri-refresh-line" :class="{
        animation: isAnimating,
      }"
      @animationend="isAnimating = false"
    />
  </div>
</template>

<style scoped>
.animation {
  animation: rotate 1s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
