export default {
  path: 'role',
  name: 'systemRole',
  meta: {
    title: '角色管理',
    icon: 'i-material-symbols:user-attributes-outline-rounded',
    auth: 'system.role.browse',
    auths: [
      { name: '预览', value: 'system.role.browse' },
      { name: '创建', value: 'system.role.create' },
      { name: '编辑', value: 'system.role.edit' },
      { name: '删除', value: 'system.role.remove' },
      { name: '分配角色', value: 'system.role.role.edit' },
    ],
  },
  children: [
    {
      path: '',
      name: 'systemRoleList',
      component: () => import('@/views/system/role/list.vue'),
      meta: {
        title: '角色列表',
        menu: false,
        cache: true,
        // auth: 'system.role.browse',
      },
    },
  ],
}
