import { createRouter, createWebHistory } from 'vue-router'
import setupExtensions from './extensions'
import setupGuards from './guards'

import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

setupGuards(router)
setupExtensions(router)

export default router
