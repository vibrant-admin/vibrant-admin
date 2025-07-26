<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { classMerge } from '@/utils'

defineOptions({
  name: 'SvgIcon',
})
const props = defineProps<Props>()

interface Props {
  name: string
  class?: HTMLAttributes['class']
}

const svgComps = import.meta.glob('@/assets/icons/*.svg', {
  eager: true, // 立即加载
})

const iconType = computed(() => {
  if (props.name.startsWith('i-')) {
    return 'unocss'
  }
  else {
    return 'svg'
  }
})
</script>

<template>
  <i :class="classMerge('relative size-[1em] flex-inline items-center justify-center fill-current leading-[1em]', props.class)">
    <i v-if="iconType === 'unocss'" class="flex-none" :class="props.name" />
    <component :is="svgComps[`/src/assets/icons/${props.name}.svg`]" v-if="iconType === 'svg'" class="flex-none" />
  </i>
</template>
