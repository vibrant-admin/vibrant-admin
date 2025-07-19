export default function () {
  function hasPermission(permission: string) {
    const userStore = useUserStore()
    return userStore.permissions.includes(permission)
  }

  // 只要有一个权限满足就返回 true
  // 例如：auth('user:add')
  // 或者 auth(['user:add', 'user:edit'])
  function auth(value: string | string[]) {
    let auth
    if (typeof value === 'string') {
      auth = value !== '' ? hasPermission(value) : true
    }
    else {
      auth = value.length > 0 ? value.some(item => hasPermission(item)) : true
    }
    return auth
  }

  // 所有权限都满足才返回 true
  // 例如：authAll(['user:add', 'user:edit'])
  function authAll(value: string[]) {
    return value.length > 0 ? value.every(item => hasPermission(item)) : true
  }

  return {
    auth,
    authAll,
  }
}
