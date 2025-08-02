import { loadingFadeOut } from 'virtual:app-loading'
import { createRouter, createWebHistory } from 'vue-router'
import setupGuards from './guard'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

setupGuards(router)

router.isReady().then(() => {
  loadingFadeOut()
})

export default router
