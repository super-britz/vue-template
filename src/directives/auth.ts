import type { Directive } from 'vue'
import { useUserStore } from '@/stores/user'

/**
 * 权限指令 v-auth
 *
 * 用法：
 *   v-auth="'firmware:add'"              — 单个权限
 *   v-auth="['firmware:add', 'firmware:edit']"  — 任一权限满足即可
 */
export const vAuth: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    checkPermission(el, binding.value)
  },
  updated(el, binding) {
    checkPermission(el, binding.value)
  },
}

function checkPermission(el: HTMLElement, value: string | string[]) {
  const userStore = useUserStore()
  const permissions = Array.isArray(value) ? value : [value]

  if (!userStore.hasAnyPermission(permissions)) {
    el.parentNode?.removeChild(el)
  }
}
