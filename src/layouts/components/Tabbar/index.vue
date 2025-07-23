<script setup lang="ts">
const isActive = ref(false)
</script>

<template>
  <div class="flex gap-1">
    <div
      v-for="i in 10"
      :key="i"
      class="tab-item p-2 rounded flex gap-1 cursor-pointer transition-colors items-center relative"
      :class="{
        active: isActive,
      }"
    >
      <VIcon name="i-tabler:atom" class="icon text-lg" />
      <div class="title text-sm flex-1 text-nowrap overflow-hidden">
        管理员管理员管理员管理员
      </div>
      <div class="close p-[2px] rounded-full flex transition-colors items-center right-2 justify-center absolute">
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
