import { request } from '@/api'
import { toLogin, toLogout } from '@/api/auth'

export interface UserInfo {
  uuid: string
  username: string
  nickname: string
  position: string
  phone: string
  email: string
  avatar: string
  loginType: number
  lastLogin: string
  authorities: string[]
  labels: string[]
  openApis: string[]
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
      uuid: '0',
      username: 'dev',
      nickname: '开发者',
      position: '开发',
      phone: '',
      email: '',
      avatar: '',
      loginType: 0,
      lastLogin: '',
      authorities: ['*'],
      labels: [],
      openApis: [],
    }
  }

  /**
   * 检查是否拥有指定权限
   * 支持通配符 '*' 表示拥有所有权限
   */
  function hasPermission(permission: string) {
    const authorities = userInfo.value?.authorities ?? []
    return authorities.includes('*') || authorities.includes(permission)
  }

  /**
   * 检查是否拥有任一权限
   */
  function hasAnyPermission(permissions: string[]) {
    return permissions.some((p) => hasPermission(p))
  }

  return {
    userInfo,
    isLoggedIn,
    fetchUserInfo,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    setMockUser,
  }
})
