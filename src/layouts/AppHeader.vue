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
  <ElHeader class="flex items-center justify-between border-b border-gray-200 bg-white">
    <ElIcon
      :size="20"
      class="cursor-pointer hover:text-blue-500"
      @click="$emit('toggle')"
    >
      <Fold v-if="!collapsed" />
      <Expand v-else />
    </ElIcon>
    <ElDropdown>
      <span class="flex cursor-pointer items-center gap-2">
        <ElAvatar :size="32" :icon="UserFilled" />
        <span class="text-sm">Admin</span>
      </span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem>个人中心</ElDropdownItem>
          <ElDropdownItem divided>退出登录</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ElHeader>
</template>
