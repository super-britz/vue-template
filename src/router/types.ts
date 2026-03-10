import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 菜单标题 */
    title?: string
    /** 菜单图标（Element Plus 图标组件名） */
    icon?: string
    /** 在菜单中隐藏 */
    hidden?: boolean
    /** 访问该路由所需权限，满足任一即可 */
    authorities?: string[]
  }
}
