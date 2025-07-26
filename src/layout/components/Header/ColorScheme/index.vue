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
  { value: 'light', name: '亮色方案', icon: 'i-ri-sun-line' },
  { value: 'dark', name: '暗色方案', icon: 'i-ri-moon-clear-line' },
  { value: 'OS', name: '跟随系统', icon: 'i-ri-contrast-line' },
]

const currentScheme = computed(() => {
  return colorSchemes.find(scheme => scheme.value === settingStore.colorScheme)
})
</script>

<template>
  <ElDropdown trigger="click">
    <div class="text-lg text-foreground font-bold p-2 rounded flex cursor-pointer items-center hover:bg-secondary">
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
