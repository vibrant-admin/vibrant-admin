<script setup lang="ts">
defineOptions({
  name: 'SvgIcon',
})
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: '#333',
})

interface Props {
  prefix?: string
  name: string
  color?: string
}

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" width="24px" height="24px">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
