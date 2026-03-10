<script setup lang="ts">
import { Fold, Expand, UserFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'

defineProps<{
  collapsed: boolean
}>()

defineEmits<{
  toggle: []
}>()

const userStore = useUserStore()

const isDev = import.meta.env.DEV
const displayName = computed(() => userStore.userInfo?.nickname ?? 'Admin')

function handleCommand(command: string) {
  if (command === 'logout') {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        userStore.logout()
      })
      .catch(() => {})
  } else if (command === 'oauth-login') {
    userStore.login()
  }
}
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
    <ElDropdown trigger="click" @command="handleCommand">
      <div class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-100">
        <ElAvatar :size="28" :icon="UserFilled" />
        <span class="text-sm text-gray-700">{{ displayName }}</span>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="profile">个人中心</ElDropdownItem>
          <ElDropdownItem v-if="isDev" command="oauth-login">OAuth2 登录</ElDropdownItem>
          <ElDropdownItem command="logout" divided>退出登录</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </ElHeader>
</template>
