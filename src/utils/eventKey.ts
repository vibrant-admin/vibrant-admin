// fooKey.ts
import type { EventBusKey } from '@vueuse/core'

// 路由变化事件
export const routeChangeKey: EventBusKey<{ to: any, from: any }> = Symbol('route-change')
