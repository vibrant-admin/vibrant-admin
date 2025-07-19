export const useUserStore = defineStore('user', () => {
  // 是否已登录
  const isLogin = ref(true)
  // 用户权限
  const permissions = ref<string[]>([])

  return {
    isLogin,
    permissions,
  }
})
