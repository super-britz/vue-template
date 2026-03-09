<script setup lang="ts">
import { Fold, Expand, UserFilled } from '@element-plus/icons-vue'

defineProps<{
  collapsed: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <ElHeader
    class="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4"
    height="56px"
  >
    <!-- 左侧：折叠按钮 -->
    <div
      class="flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-100"
      @click="$emit('toggle')"
    >
      <ElIcon :size="18">
        <Fold v-if="!collapsed" />
        <Expand v-else />
      </ElIcon>
    </div>

    <!-- 右侧：用户信息 -->
    <ElDropdown trigger="click">
      <div class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-100">
        <ElAvatar :size="28" :icon="UserFilled" />
        <span class="text-sm text-gray-700">Admin</span>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem>个人中心</ElDropdownItem>
          <ElDropdownItem divided>退出登录</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ElHeader>
</template>
