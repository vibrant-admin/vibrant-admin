import type { RouteRecordRaw } from 'vue-router'
import { resolveRoutePath } from '@/utils'

export const useMenuStore = defineStore('menu', () => {
  const routeStore = useRouteStore()

  // 将路由转换为导航菜单
  function convertRouteToMenu(routes: RouteRecordRaw[], basePath = '') {
    return routes.map((item) => {
      const menuItem: any = {
        path: resolveRoutePath(basePath, item.path),
        meta: {
          title: item?.meta?.title,
          icon: item?.meta?.icon,
          activeIcon: item?.meta?.activeIcon,
          defaultOpened: item?.meta?.defaultOpened,
          alwaysOpened: item?.meta?.alwaysOpened,
          auth: item?.meta?.auth,
          menu: item?.meta?.menu,
          badge: item?.meta?.badge,
          badgeVariant: item?.meta?.badgeVariant,
          newWindow: item?.meta?.newWindow,
          link: item?.meta?.link,
          query: item?.meta?.query,
        },
      }
      if (item.children) {
        menuItem.children = convertRouteToMenu(item.children, menuItem.path)
      }
      return menuItem
    })
  }

  // 根据权限过滤菜单
  const { auth } = useAuth()
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

  // 导航菜单
  const allMenus = computed(() => {
    return filterMenus(convertRouteToMenu(routeStore.routesRaw))
  })

  return {
    allMenus,
  }
})
