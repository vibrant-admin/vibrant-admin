<script setup lang="ts">
defineOptions({
  name: 'DictList',
})
const router = useRouter()
</script>

<template>
  <VPage>
    字典管理
    <input type="text">
    <button @click="router.push({ name: 'SystemDictCreate' })">
      创建
    </button>
  </VPage>
</template>
