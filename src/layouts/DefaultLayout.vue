<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const isCollapsed = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <ElContainer class="h-full">
    <AppSidebar :collapsed="isCollapsed" />
    <ElContainer direction="vertical" class="min-w-0">
      <AppHeader :collapsed="isCollapsed" @toggle="toggleSidebar" />
      <ElMain class="!overflow-auto bg-gray-100 p-4">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
