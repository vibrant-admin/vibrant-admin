import type { Router, RouteRecordRaw } from 'vue-router'
import { at } from 'es-toolkit/array'
import { isArray, isString } from 'es-toolkit/compat'
import { asyncRoutes } from './routes'

function setupRoutes(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const routeStore = useRouteStore()
    // 是否已登录
    if (userStore.isLogin) {
      // 是否已根据权限动态生成并注册路由
      if (routeStore.isGenerate) {
        // 如果已登录状态下，进入登录页会强制跳转第一个模块
        if (to.name === 'login') {
          next('/')
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
          //  userStore.logout()
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
  router.afterEach((to, from) => {
    const keepAliveStore = useKeepAliveStore()
    // 如果当前路由和离开路由不相同，则进行缓存处理
    if (to.fullPath !== from.fullPath) {
      // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keepAlive 全局状态
      if (to.meta.cache) {
        const componentName = at(to.matched, [-1])[0]?.components?.default.name
        if (componentName) {
          keepAliveStore.add(componentName)
        }
        else {
          console.warn('[Vibrant Admin] 该页面组件未设置组件名，会导致缓存失效，请检查')
        }
      }

      // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keepAlive 全局状态里离开页面的 name 信息
      if (from.meta.cache) {
        const componentName = at(from.matched, [-1])[0]?.components?.default.name
        if (componentName) {
          // 通过 meta.cache 判断针对哪些页面进行缓存
          if (isString(from.meta.cache) && from.meta.cache !== to.name) {
            keepAliveStore.remove(componentName)
          }
          else if (isArray(from.meta.cache) && !from.meta.cache.includes(to.name as string)) {
            keepAliveStore.remove(componentName)
          }

          // 通过 meta.noCache 判断针对哪些页面不需要进行缓存
          if (from.meta.noCache) {
            if (isString(from.meta.noCache) && from.meta.noCache === to.name) {
              keepAliveStore.remove(componentName)
            }
            else if (isArray(from.meta.noCache) && from.meta.noCache.includes(to.name as string)) {
              keepAliveStore.remove(componentName)
            }
          }

          // 如果进入的是 reload 页面，则也将离开页面的缓存清空
          if (to.name === 'reload') {
            keepAliveStore.remove(componentName)
          }
        }
      }
    }
  })
}

export default function setupGuards(router: Router) {
  setupRoutes(router)
  setupKeepAlive(router)
}
