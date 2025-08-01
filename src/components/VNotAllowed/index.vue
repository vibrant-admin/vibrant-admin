<script setup lang="ts">
defineOptions({
  name: 'VNotAllowed',
})

function goBack() {
}
</script>

<template>
  <div class="absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg-flex-row -translate-x-50% -translate-y-50% lg-gap-12">
    <div class="flex flex-col gap-4">
      <h1 class="m-0 text-6xl font-sans">
        403
      </h1>
      <div class="desc text-secondary-foreground/50 mx-0 text-xl">
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
