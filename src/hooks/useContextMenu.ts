import { useEventListener } from '@vueuse/core'

export function useContextMenu(containerRef: Ref<HTMLDivElement | null>) {
  const x = ref(0)
  const y = ref(0)
  const showMenu = ref(false)

  onMounted(() => {
    useEventListener(containerRef.value, 'contextmenu', (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      x.value = event.clientX
      y.value = event.clientY
      showMenu.value = true
    })

    useEventListener(window, 'click', () => {
      showMenu.value = false
    }, { capture: true })

    useEventListener(window, 'contextmenu', () => {
      showMenu.value = false
    }, { capture: true })
  })

  return {
    x,
    y,
    showMenu,
  }
}
