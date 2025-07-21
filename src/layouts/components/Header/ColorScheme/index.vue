<script setup lang="ts">
import type { Settings } from '#/global'

defineOptions({
  name: 'ColorScheme',
})
const settingStore = useSettingStore()

const colorSchemes: {
  name: string
  value: Settings.app['colorScheme']
  icon: string
}[] = [
  { value: 'light', name: '亮色方案', icon: 'i-material-symbols:light-mode-rounded' },
  { value: 'dark', name: '暗色方案', icon: 'i-material-symbols:dark-mode-rounded' },
  { value: 'OS', name: '跟随系统', icon: 'i-material-symbols:settings-motion-mode-outline-rounded' },
]

const currentScheme = computed(() => {
  return colorSchemes.find(scheme => scheme.value === settingStore.colorScheme)
})
</script>

<template>
  <ElDropdown
    trigger="click"
  >
    <div class="flex cursor-pointer items-center rounded bg-transparent p-2 text-lg font-bold transition-colors hover:bg-secondary">
      <VIcon :name="currentScheme!.icon" />
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="scheme in colorSchemes" :key="scheme.value" @click="settingStore.setColorScheme(scheme.value)"
        >
          <div
            class="flex items-center"
            :class="{
              'text-primary': scheme.value === settingStore.colorScheme,
            }"
          >
            <VIcon :name="scheme.icon" class="text-lg" />
            {{ scheme.name }}
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
