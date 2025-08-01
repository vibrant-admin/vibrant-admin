<script setup lang="ts">
interface MenuItem {
  label: string
  icon?: string
  disabled?: boolean
  click?: () => void
}
defineProps<{
  menu: MenuItem[]
}>()
const { x, y, showMenu } = useContextMenu(useTemplateRef('contextMenuRef'), useTemplateRef('menuRef'))

function onBeforeEnter(el: any) {
  el.style.height = 0
}

function onEnter(el: any) {
  el.style.height = 'auto'
  const h = el.offsetHeight
  el.style.height = 0
  requestAnimationFrame(() => {
    el.style.height = `${h}px`
    el.style.transition = 'height 0.3s ease'
  })
}

function onAfterEnter(el: any) {
  el.style.transition = 'none'
}

function onClick(item: MenuItem) {
  if (!item.disabled) {
    item.click?.()
    showMenu.value = false
  }
}
</script>

<template>
  <div ref="contextMenuRef">
    <slot />

    <slot name="context-menu">
      <Teleport to="body">
        <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter">
          <div
            v-show="showMenu"
            v-if="menu.length > 0"
            ref="menuRef" :style="{
              left: `${x}px`,
              top: `${y}px`,
            }"
            class="shadow-xs fixed overflow-hidden border border-basic-2 rounded rounded-lg bg-basic p-1 text-basic-20 dark:border-basic-4 dark:bg-basic-1"
          >
            <div
              v-for="item in menu" :key="item.label" :class="{
                '!text-basic-8 !hover:bg-basic pointer-events-none': item.disabled,
              }" class="flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm leading-none hover:bg-basic-1 dark:hover:bg-basic-3" @click.stop="onClick(item)"
            >
              <VIcon v-if="item.icon" :name="item.icon" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </Transition>
      </Teleport>
    </slot>
  </div>
</template>
