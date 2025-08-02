import type { RecursiveRequired, Settings } from '@/types/global'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const settings = ref<RecursiveRequired<Settings.all>>({
    app: {
      colorScheme: 'light',
      theme: 'default',
    },
  })

  // 切换颜色模式
  function toggleColorScheme() {
    settings.value.app.colorScheme = settings.value.app.colorScheme === 'dark' ? 'light' : 'dark'
  }

  // 当前颜色模式
  const currentColorScheme = ref<Settings.app['colorScheme']>()

  // 监听系统颜色模式
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  watch(() => settings.value.app.colorScheme, (val) => {
    if (val === 'os') {
      prefersColorScheme.addEventListener('change', updateTheme)
    }
    else {
      prefersColorScheme.removeEventListener('change', updateTheme)
    }
  }, {
    immediate: true,
  })

  // 更新主题
  async function updateTheme() {
    let colorScheme = settings.value.app.colorScheme
    if (colorScheme === 'os') {
      colorScheme = prefersColorScheme.matches ? 'dark' : 'light'
    }
    currentColorScheme.value = colorScheme
    document.documentElement.classList.add('no-animation')
    switch (colorScheme) {
      case 'light':
        document.documentElement.classList.remove('dark')
        document.documentElement.setAttribute('data-theme', settings.value.app.theme)
        break
      case 'dark':
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute('data-theme', settings.value.app.theme)
        break
    }
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('no-animation')
    })
  }

  watch([
    () => settings.value.app.colorScheme,
    () => settings.value.app.theme,
  ], updateTheme, {
    immediate: true,
  })

  return {
    settings,
    currentColorScheme,
    toggleColorScheme,
  }
})
