<script setup lang="ts">
const settingStore = useSettingStore()
const isDark = computed(() => settingStore.currentColorScheme === 'dark')
function toggleColorScheme(event: MouseEvent) {
  const transition = document.startViewTransition(() => {
    settingStore.toggleColorScheme()
  })
  transition.ready.then(() => {
    const { clientX, clientY } = event
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY),
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`,
    ]
    document.documentElement.animate(
      { clipPath: isDark.value ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <div class="opt-item" @click="toggleColorScheme">
    <VaIcon :name="isDark ? 'i-ri-moon-clear-line' : 'i-ri-sun-line'" />
  </div>
</template>
