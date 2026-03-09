<script setup lang="ts">
import { useRoute } from 'vue-router'
import { HomeFilled, Setting } from '@element-plus/icons-vue'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()
</script>

<template>
  <ElAside :width="collapsed ? '64px' : '220px'" class="transition-all duration-300">
    <div class="flex h-14 items-center justify-center border-b border-gray-200">
      <span v-show="!collapsed" class="text-lg font-bold">Vue Template</span>
      <span v-show="collapsed" class="text-lg font-bold">V</span>
    </div>
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
  </ElAside>
</template>
