import { request } from '@/api'
import { toLogin, toLogout } from '@/api/auth'

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar?: string
  roles: string[]
  permissions: string[]
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => !!userInfo.value)

  /** 获取当前用户信息 */
  async function fetchUserInfo() {
    try {
      userInfo.value = await request<UserInfo>({ url: '/user/info' })
    } catch {
      userInfo.value = null
      throw new Error('获取用户信息失败')
    }
  }

  /** 登录（OAuth2 跳转） */
  function login() {
    toLogin()
  }

  /** 退出登录 */
  function logout() {
    userInfo.value = null
    toLogout()
  }

  /** 开发环境 mock 用户数据 */
  function setMockUser() {
    userInfo.value = {
      id: 0,
      username: 'dev',
      nickname: '开发者',
      roles: ['admin'],
      permissions: ['*'],
    }
  }

  /** 检查是否包含指定角色 */
  function hasRole(role: string) {
    return userInfo.value?.roles.includes(role) ?? false
  }

  /** 检查是否包含指定权限 */
  function hasPermission(permission: string) {
    return userInfo.value?.permissions.includes(permission) ?? false
  }

  return { userInfo, isLoggedIn, fetchUserInfo, login, logout, hasRole, hasPermission, setMockUser }
})
