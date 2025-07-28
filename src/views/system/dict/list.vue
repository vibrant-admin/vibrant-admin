<script setup lang="ts">
defineOptions({
  name: 'DictList',
})
const router = useRouter()
<<<<<<< HEAD
=======
function onCreate() {
  router.push({ name: 'systemDictCreate' })
}
>>>>>>> 2b660a7 (feat: 激活导航开发)
</script>

<template>
  <VPage>
    字典管理
<<<<<<< HEAD
    <input type="text">
    <button @click="router.push({ name: 'SystemDictCreate' })">
      创建
    </button>
=======
    <ElButton @click="onCreate">
      创建字典
    </ElButton>
>>>>>>> 2b660a7 (feat: 激活导航开发)
  </VPage>
</template>
