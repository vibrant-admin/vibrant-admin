import { isArray, isString } from 'es-toolkit/compat'

export const useKeepAliveStore = defineStore('keepAlive', () => {
  const list = ref<string[]>([])

  function add(name: string | string[]) {
    if (isString(name) && !list.value.includes(name)) {
      list.value.push(name)
    }
    else if (isArray(name)) {
      name.forEach((v) => {
        if (v && !list.value.includes(v)) {
          list.value.push(v)
        }
      })
    }
  }

  function remove(name: string | string[]) {
    if (isString(name)) {
      list.value = list.value.filter(v => v !== name)
    }
    else if (isArray(name)) {
      list.value = list.value.filter(v => !name.includes(v))
    }
  }

  function clean() {
    list.value = []
  }

  return {
    list,
    add,
    remove,
    clean,
  }
})
