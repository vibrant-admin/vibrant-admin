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
  <div class="flex cursor-pointer items-center rounded bg-transparent p-2 text-lg font-bold transition-colors hover:bg-secondary" @click.exact="handleRefresh">
    <VIcon
      name="i-material-symbols:refresh-rounded" :class="{
        animation: isAnimating,
      }"
      @animationend="isAnimating = false"
    />
  </div>
</template>

<style lang="scss" scoped>
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
