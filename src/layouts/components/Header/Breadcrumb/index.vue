<script setup lang="ts">
import { compile } from 'path-to-regexp'
import BreadcrumbItem from './item.vue'

defineOptions({
  name: 'Breadcrumb',
})

const route = useRoute()

// 面包屑备份
let breadcrumbListBackup: any = []
const breadcrumbList = computed(() => {
  // 如果是刷新页面，则返回备份的面包屑，效果相当于刷新页面时面包屑不闪烁
  if (route.name === 'reload') {
    return breadcrumbListBackup
  }
  const list: any = []
  route.matched.forEach((item) => {
    if (item.meta?.breadcrumb !== false) {
      list.push({
        path: item.path,
        title: item.meta?.title,
      })
    }
  })
  breadcrumbListBackup = list
  return list
})

// 如果路由有参数，则使用 path-to-regexp 的 compile 方法编译路径
function pathCompile(path: string) {
  return compile(path)(route.params)
}
</script>

<template>
  <div class="flex items-center">
    <TransitionGroup name="breadcrumb">
      <BreadcrumbItem
        v-for="(item, index) in breadcrumbList"
        :key="`${index}_${item.path}_${item.title}`"
        :to="index < breadcrumbList.length - 1 && item.path !== '' ? pathCompile(item.path) : ''"
      >
        {{ item.title }}
      </BreadcrumbItem>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
