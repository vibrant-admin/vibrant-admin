import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import path from 'path-browserify'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名
 * @param classes 要合并的类名
 * @returns 合并后的类名
 */
export function classMerge(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}

/**
 * 解析路由路径
 * @param basePath 基础路径
 * @param routePath 路由路径
 * @returns 解析后的路径
 */
export function resolveRoutePath(basePath?: string, routePath?: string) {
  return basePath ? path.resolve(basePath, routePath ?? '') : routePath ?? ''
}
