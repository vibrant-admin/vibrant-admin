import type { RouteRecordRaw } from 'vue-router'
import { resolveRoutePath } from '@/utils'

export const useMenuStore = defineStore('menu', () => {
  const route = useRoute()
  const routeStore = useRouteStore()
  const { auth } = useAuth()

  // 当前激活菜单
  const active = computed(() => route.matched.reduce((path, item) => {
    return item.meta.menu !== false && item.path.length > path.length ? item.path : path
  }, ''))

  // 导航菜单
  const allMenus = computed(() => {
    return filterMenus(convertRouteToMenu(routeStore.routesRaw))
  })

  // 将路由转换为导航菜单
  function convertRouteToMenu(routes: RouteRecordRaw[], basePath = '') {
    return routes.map((item) => {
      const menuItem: any = {
        path: resolveRoutePath(basePath, item.path),
        meta: {
          title: item?.meta?.title,
          icon: item?.meta?.icon,
          auth: item?.meta?.auth,
          menu: item?.meta?.menu,
        },
      }
      if (item.children) {
        menuItem.children = convertRouteToMenu(item.children, menuItem.path)
      }
      return menuItem
    })
  }

  // 根据权限过滤菜单
  function filterMenus(menus: any[]) {
    return menus.filter((menu) => {
      if (!auth(menu.meta?.auth ?? ''))
        return false

      if (menu.children?.length) {
        menu.children = filterMenus(menu.children)
        return menu.children.length > 0
      }

      return true
    })
  }

  // 次导航第一层最深路径
  const firstDeepestPath = computed(() => {
    const findDeepestPath = (menus: any[], currentPath: string = ''): string => {
      let deepestPath = currentPath
      for (const menu of menus) {
        if (menu.children && menu.children.length > 0) {
          const childPath = findDeepestPath(menu.children, menu.path)
          if (childPath.length > deepestPath.length) {
            deepestPath = childPath
          }
        }
        else if (menu.path && menu.path.length > deepestPath.length) {
          deepestPath = menu.path
        }
      }
      return deepestPath
    }

    return findDeepestPath(allMenus.value)
  })

  return {
    active,
    allMenus,
    firstDeepestPath,
  }
})
