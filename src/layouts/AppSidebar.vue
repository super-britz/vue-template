<script setup lang="ts">
import { HomeFilled, Setting } from '@element-plus/icons-vue'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

/** 图标映射 */
const iconMap: Record<string, typeof HomeFilled> = {
  HomeFilled,
  Setting,
}

/** 过滤有权限的菜单 */
function filterMenus(routes: readonly RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.filter((route) => {
    if (route.meta?.hidden) return false
    const auth = route.meta?.authorities
    if (auth?.length && !userStore.hasAnyPermission(auth)) return false
    return true
  })
}

/** 获取布局路由下的菜单列表 */
const menus = computed(() => {
  const layoutRoute = router.options.routes.find((r) => r.path === '/')
  return filterMenus(layoutRoute?.children ?? [])
})

/** 过滤子菜单 */
function getChildren(route: RouteRecordRaw): RouteRecordRaw[] {
  return filterMenus(route.children ?? [])
}

/** 拼接完整路径 */
function resolvePath(parent: string, child: string) {
  if (child.startsWith('/')) return child
  return `${parent === '/' ? '' : parent}/${child}`
}
</script>

<template>
  <ElAside
    :width="collapsed ? '64px' : '220px'"
    class="flex flex-col overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-300"
  >
    <!-- Logo -->
    <div class="flex h-14 shrink-0 items-center justify-center">
      <span v-show="!collapsed" class="text-base font-bold tracking-wide">Vue Template</span>
      <span v-show="collapsed" class="text-base font-bold">V</span>
    </div>

    <!-- 菜单 -->
    <ElScrollbar class="flex-1">
      <ElMenu
        :default-active="route.path"
        :collapse="collapsed"
        :collapse-transition="false"
        router
        class="!border-r-0"
      >
        <template v-for="menu in menus" :key="menu.path">
          <!-- 有子菜单 -->
          <ElSubMenu v-if="getChildren(menu).length" :index="'/' + menu.path">
            <template #title>
              <ElIcon v-if="menu.meta?.icon">
                <component :is="iconMap[menu.meta.icon]" />
              </ElIcon>
              <span>{{ menu.meta?.title }}</span>
            </template>
            <ElMenuItem
              v-for="child in getChildren(menu)"
              :key="child.path"
              :index="resolvePath('/' + menu.path, child.path)"
            >
              {{ child.meta?.title }}
            </ElMenuItem>
          </ElSubMenu>

          <!-- 无子菜单 -->
          <ElMenuItem v-else :index="'/' + menu.path">
            <ElIcon v-if="menu.meta?.icon">
              <component :is="iconMap[menu.meta.icon]" />
            </ElIcon>
            <template #title>{{ menu.meta?.title }}</template>
          </ElMenuItem>
        </template>
      </ElMenu>
    </ElScrollbar>
  </ElAside>
</template>
