import type { Router, RouteRecordRaw } from 'vue-router'
import { isBoolean, isString } from 'es-toolkit'
import { isArray } from 'es-toolkit/compat'
import { asyncRoutes } from './routes'

function setupRoutes(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()
    // 是否已登录
    if (userStore.isLogin) {
      // 是否已根据权限动态生成并注册路由
      if (routeStore.isGenerate) {
        // 激活菜单
        menuStore.defaultActive = to.path

        // 如果已登录状态下，进入登录页会强制跳转第一个模块
        if (to.name === 'login') {
          next(menuStore.firstDeepestPath)
        }
        // 正常访问
        else {
          next()
        }
      }
      // 如果未生成路由，则生成路由
      else {
        try {
          // 获取用户权限
          // await userStore.getPermissions()
          // 生成动态路由
          routeStore.generateRoutesAtFront(asyncRoutes)

          // 注册并记录路由数据
          // 记录的数据会在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
          const removeRoutes: (() => void)[] = []
          routeStore.routes.forEach((route) => {
            if (!/^(?:https?:|mailto:|tel:)/.test(route.path)) {
              removeRoutes.push(router.addRoute(route))
            }
          })

          routeStore.systemRoutes.forEach((route: RouteRecordRaw) => {
            removeRoutes.push(router.addRoute(route))
          })
        }
        catch {
          // userStore.logout()
        }

        // 生成路由后，重新进入当前路由
        next({
          path: to.path,
          query: to.query,
          replace: true,
        })
      }
    }
    else {
      if (!to?.meta?.whiteList) {
        next({
          name: 'login',
          query: {
            redirect: to.fullPath,
          },
        })
      }
      else {
        // 如果是白名单路由，直接进入
        next()
      }
    }
  })
}

// 页面缓存
function setupKeepAlive(router: Router) {
  router.afterEach(async (to, from) => {
    const keepAliveStore = useKeepAliveStore()
    // 如果当前路由和离开路由不相同，则进行缓存处理
    if (to.fullPath !== from.fullPath) {
      if (to.meta.cache) {
        const componentName = to.matched.at(-1)?.components?.default.name
        if (componentName) {
          let shouldClearCache = false

          if (isBoolean(to.meta.cache)) {
            shouldClearCache = to.meta.cache
          }
          else if (isString(to.meta.cache)) {
            shouldClearCache = to.meta.cache !== from.name
          }
          else if (isArray(to.meta.cache)) {
            shouldClearCache = to.meta.cache.includes(from.name)
          }

          if (to.meta.noCache) {
            if (isString(to.meta.noCache)) {
              shouldClearCache = to.meta.noCache === from.name
            }
            else if (isArray(to.meta.noCache)) {
              shouldClearCache = to.meta.noCache.includes(from.name)
            }
          }

          if (from.name === 'reload') {
            shouldClearCache = true
          }

          if (shouldClearCache) {
            keepAliveStore.remove(componentName)
            await nextTick()
          }

          keepAliveStore.add(componentName)
        }
        else {
          console.warn('[Vibrant Admin] 该页面组件未设置组件名，会导致缓存失效，请检查')
        }
      }
    }
  })
}

export default function setupGuards(router: Router) {
  setupRoutes(router)
  setupKeepAlive(router)
}
