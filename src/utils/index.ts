import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名
 * @param classes 要合并的类名
 */
export function classMerge(...classes: ClassValue[]): string {
  return twMerge(clsx(classes))
}
