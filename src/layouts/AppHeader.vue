<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const projectName = 'Vue Template'
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
    class="flex h-[52px] shrink-0 items-center border-b border-border-light bg-white px-0"
    height="52px"
  >
    <div class="flex h-full w-[200px] shrink-0 items-center px-3">
      <div class="flex w-full items-center gap-[18px]">
        <BusinessNinebotLogoCircle class="shrink-0 text-[32px]" />
        <span class="truncate text-[16px] font-semibold tracking-[0.01em] text-regular">
          {{ projectName }}
        </span>
      </div>
    </div>

    <div class="flex h-full min-w-0 flex-1 items-center justify-end px-4">
      <ElDropdown trigger="click" @command="handleCommand">
        <div class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-100">
          <ElAvatar :size="28" :icon="UserFilled" />
          <span class="text-sm text-gray-700">{{ displayName }}</span>
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem v-if="isDev" command="oauth-login">OAuth2 登录</ElDropdownItem>
            <ElDropdownItem command="logout" divided>退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </ElHeader>
</template>
