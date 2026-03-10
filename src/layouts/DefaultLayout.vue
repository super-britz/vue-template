<script setup lang="ts">
import SideNavigation from './SideNavigation.vue'
import AppHeader from './AppHeader.vue'

const isCollapsed = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <ElContainer direction="vertical" class="h-full">
    <AppHeader />
    <ElContainer class="min-h-0">
      <SideNavigation :collapsed="isCollapsed" @toggle="toggleSidebar" />
      <ElContainer direction="vertical" class="min-w-0">
        <ElMain class="!overflow-auto bg-gray-100 p-4">
          <RouterView />
        </ElMain>
      </ElContainer>
    </ElContainer>
  </ElContainer>
</template>
