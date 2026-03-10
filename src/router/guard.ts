import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { toLogin } from '@/api/auth'

/** 白名单路由（无需登录） */
const WHITE_LIST = ['/403']

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore()

    // 白名单直接放行
    if (WHITE_LIST.includes(to.path)) return true

    // 未登录：尝试获取用户信息
    if (!userStore.isLoggedIn) {
      try {
        await userStore.fetchUserInfo()
      } catch {
        if (import.meta.env.DEV) {
          // 开发环境：获取失败时使用 mock 数据，方便本地调试
          console.warn('[Guard] 获取用户信息失败，使用 mock 数据')
          userStore.setMockUser()
        } else {
          // 生产环境：跳转 OAuth2 登录
          toLogin()
          return false
        }
      }
    }

    // 路由级权限校验（meta.authorities）
    const requiredAuth = to.meta.authorities as string[] | undefined
    if (requiredAuth?.length) {
      if (!userStore.hasAnyPermission(requiredAuth)) return '/403'
    }

    return true
  })
}
