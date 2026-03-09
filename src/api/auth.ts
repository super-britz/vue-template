/**
 * 认证权限 GET /service/oauth2/authorization/{uuid}
 * 认证不过会跳转企业微信扫码登录
 */
export function toLogin() {
  const uuid = import.meta.env.VITE_OAUTH_UUID
  const redirectUri = encodeURIComponent(window.location.href)
  window.location.href = `/service/oauth2/authorization/${uuid}?redirect_uri=${redirectUri}`
}

/** 退出登录 */
export function toLogout() {
  const redirectUri = encodeURIComponent(window.location.origin)
  window.location.href = `/service/logout?redirect_uri=${redirectUri}`
}
