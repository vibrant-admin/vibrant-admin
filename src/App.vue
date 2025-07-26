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
if (isSupprotColorMix) {
  document.body.style.setProperty('--el-color-primary', 'var(--primary)')
  document.body.style.setProperty('--el-text-color-primary', 'var(--primary-foreground)')

  watch(() => settingStore.colorScheme, (colorScheme) => {
    const color = colorScheme === 'light' ? '#fff' : '#000'
    const colorForeground = colorScheme === 'light' ? '#000' : '#fff'

    for (let index = 1; index < 10; index++) {
      document.body.style.setProperty(`--el-color-primary-light-${index}`, `color-mix(in hsl, var(--primary), ${color} ${index * 10}%)`)
      document.body.style.setProperty(`--el-color-primary-dark-${index}`, `color-mix(in hsl, var(--primary), ${colorForeground} ${index * 10}%)`)
    }
  }, {
    immediate: true,
  })
}
</script>

<template>
  <div class="text-foreground bg-background h-full w-full transition-colors" @dragover.prevent>
    <ElConfigProvider :locale="zhCn">
      <RouterView v-slot="{ Component }">
        <component :is="Component" v-if="isAuth" />
        <VNotAllowed v-else />
      </RouterView>
    </ElConfigProvider>
  </div>
</template>
