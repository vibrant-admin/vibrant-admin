import type { Favorites } from '#/global'

export const useFavoritesStore = defineStore('favorites', () => {
  const list = ref<Favorites.recordRaw[]>([])

  function add(route: any) {
    if (list.value.some(item => item.fullPath === route.fullPath)) {
      remove(route.fullPath)
    }
    else {
      list.value.push({
        fullPath: route.fullPath,
        title: route.meta.title,
        icon: route.meta.icon,
      })
    }
  }

  function remove(fullPath: Favorites.recordRaw['fullPath']) {
    const index = list.value.findIndex(item => item.fullPath === fullPath)
    if (index !== -1) {
      list.value.splice(index, 1)
    }
  }

  // 检查是否可以添加到收藏夹
  function canAdd(fullPath: Favorites.recordRaw['fullPath']) {
    return !list.value.some(item => item.fullPath === fullPath)
  }

  // 检查是否已经添加
  const isAdded = computed(() => {
    return (fullPath: Favorites.recordRaw['fullPath']) => {
      return list.value.some(item => item.fullPath === fullPath)
    }
  })

  return {
    list,
    add,
    remove,
    canAdd,
    isAdded,
  }
})
