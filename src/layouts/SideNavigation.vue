<script setup lang="ts">
import { ArrowDown, HomeFilled, Setting } from '@element-plus/icons-vue'
import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

defineProps<{
  collapsed: boolean
}>()

defineEmits<{
  toggle: []
}>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

/** 图标映射 */
const iconMap: Record<string, typeof HomeFilled> = {
  HomeFilled,
  Setting,
}

function getMenuIcon(icon?: string): Component | undefined {
  if (!icon) return undefined
  return iconMap[icon]
}

/** 过滤有权限的菜单 */
function filterMenus(routes: readonly RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.filter((r) => {
    if (r.meta?.hidden) return false
    const auth = r.meta?.authorities
    if (auth?.length && !userStore.hasAnyPermission(auth)) return false
    return true
  })
}

/** 拼接完整路径 */
function resolvePath(parent: string, child: string) {
  if (child.startsWith('/')) return child
  return `${parent === '/' ? '' : parent}/${child}`
}

/** 预计算菜单树，避免模板中重复调用 filterMenus */
const menuTree = computed(() => {
  const layoutRoute = router.options.routes.find((r) => r.path === '/')
  return filterMenus(layoutRoute?.children ?? []).map((menu) => {
    const fullPath = '/' + menu.path
    return {
      route: menu,
      fullPath,
      icon: getMenuIcon(menu.meta?.icon),
      children: filterMenus(menu.children ?? []).map((child) => ({
        route: child,
        fullPath: resolvePath(fullPath, child.path),
      })),
    }
  })
})

/** 展开的子菜单集合 */
const expandedMenus = ref<Set<string>>(new Set())

/** 自动展开当前路由所属的父菜单 */
watch(
  () => route.path,
  () => {
    for (const item of menuTree.value) {
      if (!item.children.length) continue
      const hasActiveChild = item.children.some(
        (child) => route.path === child.fullPath || route.path.startsWith(child.fullPath + '/'),
      )
      if (hasActiveChild) expandedMenus.value.add(item.fullPath)
    }
  },
  { immediate: true },
)

function isExpanded(path: string) {
  return expandedMenus.value.has(path)
}

function toggleExpand(path: string) {
  if (expandedMenus.value.has(path)) {
    expandedMenus.value.delete(path)
  } else {
    expandedMenus.value.add(path)
  }
}

/** 判断是否为当前激活路由 */
function isActiveRoute(path: string) {
  return route.path === path
}

/** 判断是否为当前激活路由的父级 */
function isActiveParent(menuPath: string) {
  return route.path.startsWith(menuPath + '/')
}

/** 处理菜单项点击 */
function handleMenuClick(item: (typeof menuTree.value)[number]) {
  if (item.children.length) {
    toggleExpand(item.fullPath)
  } else {
    router.push(item.fullPath)
  }
}

/** 处理子菜单项点击 */
function handleChildClick(childFullPath: string) {
  router.push(childFullPath)
}
</script>

<template>
  <aside
    class="flex h-full shrink-0 flex-col overflow-hidden border-r border-[#dcdfe6] bg-white transition-[width] duration-300"
    :style="{ width: collapsed ? '56px' : '200px' }"
  >
    <!-- 菜单区域 -->
    <ElScrollbar class="flex-1">
      <nav class="flex flex-col py-4">
        <!-- ========== 展开状态 ========== -->
        <div v-show="!collapsed" class="flex flex-col">
          <template v-for="item in menuTree" :key="item.fullPath">
            <!-- 有子菜单的项 -->
            <template v-if="item.children.length">
              <div
                class="flex h-12 cursor-pointer items-center px-2 py-1"
                @click="handleMenuClick(item)"
              >
                <div class="flex h-12 flex-1 items-center gap-2 rounded px-2 hover:bg-[#f5f7fa]">
                  <div class="flex shrink-0 items-center p-0.5">
                    <ElIcon v-if="item.icon" :size="20">
                      <component :is="item.icon" />
                    </ElIcon>
                  </div>
                  <span class="flex-1 truncate text-sm text-[#303133]">
                    {{ item.route.meta?.title }}
                  </span>
                  <ElIcon
                    :size="14"
                    class="shrink-0 text-[#303133] transition-transform duration-200"
                    :class="isExpanded(item.fullPath) ? 'rotate-180' : ''"
                  >
                    <ArrowDown />
                  </ElIcon>
                </div>
              </div>

              <!-- 子菜单 -->
              <div v-show="isExpanded(item.fullPath)" class="flex flex-col">
                <div
                  v-for="child in item.children"
                  :key="child.fullPath"
                  class="cursor-pointer px-2"
                  @click="handleChildClick(child.fullPath)"
                >
                  <div
                    class="flex h-12 items-center rounded pl-10 pr-4 hover:bg-[#f5f7fa]"
                    :class="isActiveRoute(child.fullPath) ? 'text-[#165dff]' : 'text-[#303133]'"
                  >
                    <span class="truncate text-sm">{{ child.route.meta?.title }}</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- 无子菜单的项 -->
            <div
              v-else
              class="flex h-12 cursor-pointer items-center px-2 py-1"
              @click="handleMenuClick(item)"
            >
              <div
                class="flex h-12 flex-1 items-center gap-2 rounded px-2 hover:bg-[#f5f7fa]"
                :class="isActiveRoute(item.fullPath) ? 'text-[#165dff]' : 'text-[#303133]'"
              >
                <div class="flex shrink-0 items-center p-0.5">
                  <ElIcon v-if="item.icon" :size="20">
                    <component :is="item.icon" />
                  </ElIcon>
                </div>
                <span class="flex-1 truncate text-sm">
                  {{ item.route.meta?.title }}
                </span>
              </div>
            </div>
          </template>
        </div>

        <!-- ========== 折叠状态 ========== -->
        <div v-show="collapsed" class="flex flex-col">
          <template v-for="item in menuTree" :key="item.fullPath">
            <!-- 有子菜单：hover 弹出浮层 -->
            <ElPopover
              v-if="item.children.length"
              placement="right-start"
              trigger="hover"
              :show-arrow="false"
              :offset="4"
              :width="200"
              popper-class="side-nav-popover"
            >
              <template #reference>
                <div class="flex h-12 items-center px-2 py-1">
                  <div
                    class="flex cursor-pointer items-center rounded px-2 hover:bg-[#f5f7fa]"
                    :class="isActiveParent(item.fullPath) ? 'text-[#165dff]' : ''"
                  >
                    <div class="flex shrink-0 items-center p-0.5">
                      <ElIcon v-if="item.icon" :size="20">
                        <component :is="item.icon" />
                      </ElIcon>
                    </div>
                  </div>
                </div>
              </template>

              <!-- 浮层菜单内容 -->
              <div class="flex flex-col py-1">
                <!-- 分组标题 -->
                <div class="flex h-12 items-center px-4">
                  <span class="text-sm text-[#c0c4cc]">{{ item.route.meta?.title }}</span>
                </div>
                <!-- 子菜单项 -->
                <div
                  v-for="child in item.children"
                  :key="child.fullPath"
                  class="cursor-pointer px-2"
                  @click="handleChildClick(child.fullPath)"
                >
                  <div
                    class="flex h-12 items-center rounded px-2 hover:bg-[#f0f2f5]"
                    :class="isActiveRoute(child.fullPath) ? 'text-[#165dff]' : 'text-[#303133]'"
                  >
                    <span class="truncate text-sm">{{ child.route.meta?.title }}</span>
                  </div>
                </div>
              </div>
            </ElPopover>

            <!-- 无子菜单：hover 提示文字 -->
            <ElTooltip v-else :content="item.route.meta?.title" placement="right">
              <div
                class="flex h-12 cursor-pointer items-center px-2 py-1"
                @click="handleMenuClick(item)"
              >
                <div
                  class="flex items-center rounded px-2 hover:bg-[#f5f7fa]"
                  :class="isActiveRoute(item.fullPath) ? 'text-[#165dff]' : ''"
                >
                  <div class="flex shrink-0 items-center p-0.5">
                    <ElIcon v-if="item.icon" :size="20">
                      <component :is="item.icon" />
                    </ElIcon>
                  </div>
                </div>
              </div>
            </ElTooltip>
          </template>
        </div>
      </nav>
    </ElScrollbar>

    <!-- 底部操作区 -->
    <div class="flex shrink-0 flex-col items-center gap-2 pb-4">
      <!-- 折叠/展开按钮 -->
      <div class="flex w-full py-1" :class="collapsed ? 'justify-center' : 'justify-end pr-4'">
        <div
          class="flex size-8 cursor-pointer items-center justify-center rounded hover:bg-[#f5f7fa]"
          @click="$emit('toggle')"
        >
          <BusinessDoubleArrowRight v-if="collapsed" class="h-5 w-5" />
          <BusinessDoubleArrowLeft v-else class="h-5 w-5" />
        </div>
      </div>
    </div>
  </aside>
</template>

<style>
/* 折叠状态下弹出菜单样式（teleport 到 body，需要全局样式） */
.side-nav-popover.el-popover.el-popper {
  padding: 0 !important;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
}
</style>
