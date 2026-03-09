<script setup lang="ts">
// 404 页面
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4"
  >
    <div class="text-center">
      <!-- Icon -->
      <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
        <svg
          class="h-12 w-12 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </div>
      <!-- Status code -->
      <h1 class="text-8xl font-extrabold tracking-tight text-gray-200">404</h1>
      <h2 class="mt-4 text-xl font-semibold text-gray-700">页面未找到</h2>
      <p class="mt-2 text-base text-gray-400">抱歉，您访问的页面不存在或已被移除</p>
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
