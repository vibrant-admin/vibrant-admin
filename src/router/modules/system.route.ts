import DictRoute from './system/dict.route'
import RoleRoute from './system/role.route'
import UserRoute from './system/user.route'

function Layout() {
  return import('@/layouts/index.vue')
}
export default {
  path: '/system',
  component: Layout,
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'i-ri-settings-4-line',
    // auth: 'system.role.browse',
  },
  children: [
    RoleRoute,
    UserRoute,
    DictRoute,
  ],
}
