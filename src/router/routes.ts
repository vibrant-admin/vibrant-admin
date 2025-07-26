import type { RouteRecordRaw } from 'vue-router'
import SystemRoute from './modules/system.route'

// 固定路由（默认路由）
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      whiteList: true,
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
          icon: 'i-ri-home-2-line',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加載',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由
const asyncRoutes = [
  SystemRoute,
]

export {
  asyncRoutes,
  constantRoutes,
  systemRoutes,
}
