<script setup lang="ts">
defineOptions({
  name: 'ColorScheme',
})
const settingStore = useSettingStore()

async function toggleColorScheme(event: MouseEvent) {
  const transition = document.startViewTransition(async () => {
    settingStore.setColorScheme(settingStore.colorScheme === 'light' ? 'dark' : settingStore.colorScheme === 'dark' ? 'OS' : 'light')
    await nextTick()
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
      { clipPath: settingStore.isDark ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in-out',
        pseudoElement: settingStore.isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <div class="flex cursor-pointer items-center rounded p-2 text-lg font-bold hover:bg-basic-1 dark:hover:bg-basic-3" @click="toggleColorScheme($event)">
    <VIcon :name="settingStore.colorScheme === 'light' ? 'i-ri-sun-line' : settingStore.colorScheme === 'dark' ? 'i-ri-moon-clear-line' : 'i-ri-contrast-line'" />
  </div>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}

::view-transition-old(root) {
  z-index: 0;
}

::view-transition-new(root) {
  z-index: 1;
}

.dark {
  &::view-transition-old(root) {
    z-index: 1;
  }

  &::view-transition-new(root) {
    z-index: 0;
  }
}
</style>
