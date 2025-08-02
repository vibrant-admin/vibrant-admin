<script setup lang="ts">
const isAnimating = ref(false)
const router = useRouter()
function onRefresh() {
  isAnimating.value = true
  router.push({ name: 'reload' })
}
</script>

<template>
  <div class="opt-item" @click="onRefresh">
    <VaIcon
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
