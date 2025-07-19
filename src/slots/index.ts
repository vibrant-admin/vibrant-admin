type Slots = ''

function tryLoadComponent(name: Slots) {
  const componentMap = import.meta.glob('./*/index.vue', { eager: true })
  const path = `./${name}/index.vue`
  const component = componentMap[path as keyof typeof componentMap]
  if (!component) {
    return {
      default: defineComponent({
        name: 'SlotsInvalidComponent',
        render: () => null,
      }),
    }
  }
  return component
}

export function usePlugin(name: Slots) {
  const component = tryLoadComponent(name)
  return defineComponent((component as any).default)
}
