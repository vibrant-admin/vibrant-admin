import type { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'es-toolkit'
import { createRouterMatcher } from 'vue-router'
import { systemRoutes } from '@/router/routes'

export const useRouteStore = defineStore('route', () => {
  // 是否已生成路由
  const isGenerate = ref(false)

  // 原始路由数据
  const routesRaw = ref<RouteRecordRaw[]>([])

  // 实际路由
  const routes = computed(() => {
    return cloneDeep(routesRaw.value)
  })

  // 已注册的路由，用于登出时删除路由
  const currentRemoveRoutes = ref<(() => void)[]>([])

  const routesMatcher = ref(createRouterMatcher([], {}))
  // 路由排序，sort 越大越靠前
  function sortAsyncRoutes(routes: any) {
    routes.sort((a: any, b: any) => (b.meta?.sort ?? 0) - (a.meta?.sort ?? 0))
    routes.forEach((route: any) => {
      if (route.children) {
        route.children = sortAsyncRoutes(route.children)
      }
    })
    return routes
  }
  // 生成路由（前端生成）
  function generateRoutesAtFront(asyncRoutes: RouteRecordRaw[]) {
    // 设置 routes 数据
    routesRaw.value = sortAsyncRoutes(cloneDeep(asyncRoutes))
    // 创建路由匹配器

    routesMatcher.value = createRouterMatcher(routesRaw.value, {})
    isGenerate.value = true
  }

  function setCurrentRemoveRoutes(routes: (() => void)[]) {
    currentRemoveRoutes.value = routes
  }

  return {
    isGenerate,
    routesRaw,
    routes,
    systemRoutes,
    generateRoutesAtFront,
    setCurrentRemoveRoutes,
  }
})
