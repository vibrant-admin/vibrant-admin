<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    replace?: boolean
    separator?: string
  }>(),
  {
    separator: '/',
  },
)

const router = useRouter()

function onClick() {
  if (props.to) {
    props.replace ? router.replace(props.to) : router.push(props.to)
  }
}
</script>

<template>
  <div class="breadcrumb-item flex items-center text-foreground">
    <span class="separator mx-2">
      {{ separator }}
    </span>
    <span
      class="text flex items-center text-sm opacity-60"
      :class="{
        'is-link cursor-pointer transition-opacity hover-opacity-100': !!props.to,
      }" @click="onClick"
    >
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
.breadcrumb-item {
  .text {
    --uno: bg-muted;

    padding: 6px 16px;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%);

    [dir="rtl"] & {
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 8px 100%, 0 50%);
    }

    &.is-link:hover {
      --uno: bg-muted;
    }
  }

  &:first-child .text {
    padding-inline-start: 12px;
    border-radius: 6px 0 0 6px;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);

    [dir="rtl"] & {
      border-radius: 0 6px 6px 0;
      clip-path: polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%);
    }
  }

  &:last-child:not(:first-child) .text {
    --uno: bg-muted;

    padding-inline-end: 12px;
    border-radius: 0 6px 6px 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);

    [dir="rtl"] & {
      border-radius: 6px 0 0 6px;
      clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 50%, 100% 100%, 0 100%);
    }
  }

  .separator {
    display: none;
  }
}
</style>
