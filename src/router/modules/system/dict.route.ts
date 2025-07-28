export default {
  path: 'dict',
  name: 'systemDict',
  meta: {
    title: '字典管理',
    icon: 'i-ri-book-3-line',
    // auth: 'system.dict.browse',
    auths: [
      { name: '预览', value: 'system.dict.browse' },
      { name: '创建', value: 'system.dict.create' },
      { name: '编辑', value: 'system.dict.edit' },
      { name: '删除', value: 'system.dict.remove' },
    ],
  },
  children: [
    {
      path: '',
      name: 'SystemDictList',
      component: () => import('@/views/system/dict/list.vue'),
      meta: {
        title: '字典列表',
        menu: false,
        cache: true,
        noCache: ['SystemDictCreate'],
      },
    },
    {
      path: 'post',
      name: 'SystemDictCreate',
      component: () => import('@/views/system/dict/post.vue'),
      meta: {
        title: '创建字典',
        menu: false,
        cache: true,
        noCache: ['SystemDictList'],
      },
    },
  ],
}
