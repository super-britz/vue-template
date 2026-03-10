import type { App } from 'vue'
import { vAuth } from './auth'

/**
 * 注册所有自定义指令
 * 新增指令只需在此文件添加一行 app.directive(...)
 */
export function setupDirectives(app: App) {
  app.directive('auth', vAuth)
}
