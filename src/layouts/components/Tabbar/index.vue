<script setup lang="ts">
const isActive = ref(false)
</script>

<template>
  <VXScroll>
    <div class="flex gap-1 h-full">
      <div
        v-for="i in 10"
        :key="i"
        class="tab-item px-2 rounded flex gap-1 h-full cursor-pointer transition-colors items-center relative"
        :class="{
          active: isActive,
        }"
      >
        <VIcon name="i-ri-shining-2-line" class="icon" />
        <div class="title text-sm flex-1 text-nowrap overflow-hidden">
          管理员管理员管理员管理员
        </div>
        <div class="close rounded-full flex h-[16px] w-[16px] transition-colors items-center right-2 justify-center absolute">
          <VIcon name="i-ri-close-line" />
        </div>
      </div>
    </div>
  </VXScroll>
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
