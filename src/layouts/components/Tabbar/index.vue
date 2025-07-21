<script setup lang="ts">
const isActive = ref(false)
</script>

<template>
  <div class="flex gap-1">
    <div
      v-for="i in 10"
      :key="i"
      class="tab-item relative flex cursor-pointer items-center gap-1 rounded p-2 transition-colors"
      :class="{
        active: isActive,
      }"
    >
      <VIcon name="i-tabler:atom" class="icon text-lg" />
      <div class="title flex-1 overflow-hidden text-nowrap text-sm">
        管理员管理员管理员管理员
      </div>
      <div class="close absolute right-2 flex items-center justify-center rounded-full p-[2px] transition-colors">
        <VIcon name="i-material-symbols:close-rounded" class="text-sm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-item {
  --opacity: 0.5;

  &:hover {
    --uno: bg-secondary;
  }

  .icon {
    opacity: var(--opacity);
  }

  .title {
    margin-inline-end: 20px;
    opacity: var(--opacity);
    mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
  }

  .close {
    opacity: var(--opacity);

    &:hover {
      --uno: bg-background;
    }
  }

  &.active {
    --opacity: 1;
    --uno: bg-background;

    .close {
      &:hover {
        --uno: bg-secondary;
      }
    }
  }
}
</style>
