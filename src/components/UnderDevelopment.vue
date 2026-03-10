<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center px-4">
    <ElCard shadow="hover" class="w-full max-w-lg overflow-hidden rounded-2xl">
      <div class="relative py-10 text-center">
        <!-- 背景装饰圆 -->
        <div
          class="absolute -top-6 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60 blur-2xl"
        />

        <!-- Icon -->
        <div
          class="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-sm"
        >
          <svg
            class="h-12 w-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743"
            />
          </svg>
        </div>

        <!-- Title -->
        <h1 class="relative text-2xl font-bold text-gray-800">
          {{ title || $route.meta.title || '当前页面' }}
        </h1>
        <p class="mt-3 text-sm text-gray-400">该功能正在开发中，敬请期待</p>

        <!-- 特性提示 -->
        <div class="mx-auto mt-6 flex max-w-xs justify-center gap-6 text-xs text-gray-400">
          <div class="flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-green-400" />
            <span>设计完成</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span>开发中</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-gray-200" />
            <span>待测试</span>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="mx-auto mt-4 w-56">
          <div class="h-2 overflow-hidden rounded-full bg-gray-100">
            <div class="h-full w-2/5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
          </div>
        </div>

        <!-- Route info -->
        <p class="mt-6 font-mono text-xs text-gray-300">{{ $route.path }}</p>
      </div>
    </ElCard>
  </div>
</template>
