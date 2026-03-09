<script setup lang="ts">
import { useRoute } from 'vue-router'
import { HomeFilled, Setting } from '@element-plus/icons-vue'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()
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
        <ElMenuItem index="/">
          <ElIcon><HomeFilled /></ElIcon>
          <template #title>首页</template>
        </ElMenuItem>
        <ElSubMenu index="/system">
          <template #title>
            <ElIcon><Setting /></ElIcon>
            <span>系统管理</span>
          </template>
          <ElMenuItem index="/system/user">用户管理</ElMenuItem>
          <ElMenuItem index="/system/role">角色管理</ElMenuItem>
        </ElSubMenu>
      </ElMenu>
    </ElScrollbar>
  </ElAside>
</template>
