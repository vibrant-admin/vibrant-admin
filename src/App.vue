<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'

const route = useRoute()

// 检查路由是否有权限
const { auth } = useAuth()
const isAuth = computed(() => {
  return route.matched.every((item) => {
    return auth(item.meta.auth as string ?? '')
  })
})

// 设置 Element Plus 主题
const settingStore = useSettingStore()
const isSupprotColorMix = CSS.supports('color', 'color-mix(in srgb, #fff, #000)')
const colorNames = ['primary', 'success', 'info', 'warning', 'danger']
if (isSupprotColorMix) {
  document.body.style.setProperty('--el-bg-color', 'hsl(var(--basic))')
  colorNames.forEach((colorName: string) => {
    document.body.style.setProperty(`--el-color-${colorName}`, `hsl(var(--${colorName}))`)
  })

  watch(() => settingStore.colorScheme, (colorScheme) => {
    const color = colorScheme === 'light' ? '#fff' : '#000'
    const colorForeground = colorScheme === 'light' ? '#000' : '#fff'

    for (let index = 1; index < 10; index++) {
      colorNames.forEach((colorName: string) => {
        document.body.style.setProperty(`--el-color-${colorName}-light-${index}`, `color-mix(in hsl, hsl(var(--${colorName})), ${color} ${index * 10}%)`)
        document.body.style.setProperty(`--el-color-${colorName}-dark-${index}`, `color-mix(in hsl, hsl(var(--${colorName})), ${colorForeground} ${index * 10}%)`)
      })
    }
  }, { immediate: true })
}
</script>

<template>
  <div class="h-full w-full bg-basic text-basic-20 transition-colors" @dragover.prevent>
    <ElConfigProvider :locale="zhCn">
      <RouterView v-slot="{ Component }">
        <component :is="Component" v-if="isAuth" />
        <VNotAllowed v-else />
      </RouterView>
      <VCheckUpdate />
    </ElConfigProvider>
  </div>
</template>
