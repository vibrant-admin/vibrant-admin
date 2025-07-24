export default {
  path: 'user',
  name: 'systemUser',
  meta: {
    title: '用户管理',
    icon: 'i-material-symbols:user-attributes-outline-rounded',
    auth: 'system.user.browse',
    auths: [
      { name: '预览', value: 'system.user.browse' },
      { name: '创建', value: 'system.user.create' },
      { name: '编辑', value: 'system.user.edit' },
      { name: '删除', value: 'system.user.remove' },
      { name: '分配角色', value: 'system.user.role.edit' },
    ],
  },
  children: [
    {
      path: '',
      name: 'systemUserList',
      component: () => import('@/views/system/user/list.vue'),
      meta: {
        title: '用户列表',
        menu: false,
        cache: true,
        // auth: 'system.user.browse',
      },
    },
  ],
}
