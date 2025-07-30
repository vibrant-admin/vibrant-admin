<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to?: RouteLocationRaw
  replace?: boolean
}>()

const router = useRouter()

function onClick() {
  if (props.to) {
    props.replace ? router.replace(props.to) : router.push(props.to)
  }
}
</script>

<template>
  <div class="group breadcrumb-item flex items-center">
    <span
      class="text group-last:dark text-sm text-basic-15 px-4 py-1.5 bg-basic-1 flex transition-colors items-center group-last:(text-basic-20 bg-basic-2) dark:bg-basic-3 dark:group-last:bg-basic-4"
      :class="{
        'cursor-pointer hover:bg-basic-2 dark:hover:bg-basic-4': !!props.to,
      }" @click="onClick"
    >
      <slot />
    </span>
  </div>
</template>

<style scoped>
.breadcrumb-item {
  .text {
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);

    [dir="rtl"] & {
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 8px 100%, 0 50%);
    }
  }

  &:first-child .text {
    padding-inline-start: 10px;
    border-radius: 6px 0 0 6px;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);

    [dir="rtl"] & {
      border-radius: 0 6px 6px 0;
      clip-path: polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%);
    }
  }

  &:last-child:not(:first-child) .text {
    padding-inline-end: 10px;
    border-radius: 0 6px 6px 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);

    [dir="rtl"] & {
      border-radius: 6px 0 0 6px;
      clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 0 100%);
    }
  }
}
</style>
