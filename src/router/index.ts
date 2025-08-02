import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/index.vue'),
      meta: {
        title: '首页',
        icon: 'home',
        order: 1,
      },
      children: [
        {
          path: 'home',
          name: 'homeIndex',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            icon: 'home',
            order: 1,
          },
        },
      ],
    },
  ],
})

export default router
