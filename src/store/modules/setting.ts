import type { RecursiveRequired, Settings } from '#/global'

export const useSettingStore = defineStore('setting', () => {
  // 所有设置
  const settings = ref<RecursiveRequired<Settings.all>>({
    app: {
      colorScheme: 'light',
      theme: 'default',
    },
  })
  // 当前颜色方案
  const colorScheme = computed(() => settings.value.app.colorScheme)
  // 当前主题
  const theme = computed(() => settings.value.app.theme)

  // 设置颜色方案
  const setColorScheme = (colorScheme: Settings.app['colorScheme']) => {
    settings.value.app.colorScheme = colorScheme
  }

  // 设置主题
  const setTheme = (theme: Settings.app['theme']) => {
    settings.value.app.theme = theme
  }

  // 系统颜色方案匹配
  const colorSchemeMatch = window.matchMedia('(prefers-color-scheme: dark)')

  // 颜色跟随系统方案
  function followSystem() {
    if (colorSchemeMatch.matches)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  // 颜色方案变更
  watch(() => settings.value.app.colorScheme, () => {
    colorSchemeMatch.removeEventListener('change', followSystem)
    switch (colorScheme.value) {
      case 'light': {
        document.documentElement.classList.remove('dark')
        break
      }
      case 'dark': {
        document.documentElement.classList.add('dark')
        break
      }
      case 'OS': {
        followSystem()
        colorSchemeMatch.addEventListener('change', followSystem)
        break
      }
    }
  }, { immediate: true })

  // 主题变更
  watch(() => settings.value.app.theme, () => {
    document.documentElement.setAttribute('data-theme', settings.value.app.theme)
  }, { immediate: true })

  return {
    settings,
    colorScheme,
    setColorScheme,
    theme,
    setTheme,
  }
})
