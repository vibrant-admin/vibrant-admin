<script setup lang="ts">
defineOptions({
  name: 'VNotAllowed',
})

function goBack() {
}
</script>

<template>
  <div class="flex flex-col items-center left-[50%] top-[50%] justify-between absolute lg-flex-row lg-gap-12 -translate-x-50% -translate-y-50%">
    <div class="flex flex-col gap-4">
      <h1 class="text-6xl font-sans m-0">
        403
      </h1>
      <div class="desc text-secondary-foreground/50 text-xl mx-0">
        抱歉，你无权访问该页面
      </div>
      <div>
        <ElButton @click="goBack">
          返回主页
        </ElButton>
      </div>
    </div>
  </div>
</template>
