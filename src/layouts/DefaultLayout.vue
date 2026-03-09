<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const isCollapsed = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <ElContainer class="min-h-screen">
    <AppSidebar :collapsed="isCollapsed" />
    <ElContainer>
      <AppHeader :collapsed="isCollapsed" @toggle="toggleSidebar" />
      <ElMain class="bg-gray-50">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
