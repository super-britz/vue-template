<script setup lang="ts">
// 403 无权限页面
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4"
  >
    <div class="text-center">
      <!-- Icon -->
      <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
        <svg
          class="h-12 w-12 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      </div>
      <!-- Status code -->
      <h1 class="text-8xl font-extrabold tracking-tight text-gray-200">403</h1>
      <h2 class="mt-4 text-xl font-semibold text-gray-700">访问受限</h2>
      <p class="mt-2 text-base text-gray-400">抱歉，您没有权限访问该页面</p>
      <!-- Action -->
      <RouterLink
        to="/"
        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 active:scale-95"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        返回首页
      </RouterLink>
    </div>
  </div>
</template>
