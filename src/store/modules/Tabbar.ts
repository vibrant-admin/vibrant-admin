export const useTabbarStore = defineStore('tabbar', () => {
  const router = useRouter()
  // 标签列表
  const list = ref<any[]>([])

  // 添加标签
  function add(route: any) {
    // 如果是刷新页面直接退出
    if (route.name === 'reload') {
      return
    }
    const isExist = list.value.some(item => item.fullPath === route.fullPath)
    if (!isExist) {
      list.value.push({
        fullPath: route.fullPath,
        routeName: route.name,
        title: route.meta.title,
        icon: route.meta.icon,
      })
    }
  }

  // 删除标签
  function remove(route: any) {
    const index = list.value.findIndex(item => item.fullPath === route.fullPath)
    // 如果标签不存在直接退出
    if (index === -1 || list.value.length === 1) {
      return
    }
    // 删除标签页
    list.value.splice(index, 1)
    // 如果删除的标签是当前路由，跳转到上一个标签
    if (route.fullPath === router.currentRoute.value.fullPath) {
      const previousIndex = index > 0 ? index - 1 : 0
      const previousRoute = list.value[previousIndex]
      router.push({ name: previousRoute.routeName, params: previousRoute.params })
    }
  }

  // 拖动
  function sort(newIndex: number, oldIndex: number) {
    list.value.splice(newIndex, 0, list.value.splice(oldIndex, 1)[0])
  }

  return {
    list,
    add,
    remove,
    sort,
  }
})
