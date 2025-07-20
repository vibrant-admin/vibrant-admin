<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const route = useRoute()
const { auth } = useAuth()

const isAuth = computed(() => {
  return route.matched.every((item) => {
    return auth(item.meta.auth as string ?? '')
  })
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <RouterView v-slot="{ Component }">
      <component :is="Component" v-if="isAuth" />
      <VNotAllowed v-else />
    </RouterView>
  </el-config-provider>
</template>
