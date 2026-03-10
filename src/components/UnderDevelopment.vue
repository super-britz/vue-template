<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="flex min-h-[calc(100dvh-52px-2rem)] items-center justify-center px-4">
    <div class="relative w-full max-w-xl -translate-y-32 px-8 py-10 text-center">
      <div
        class="pointer-events-none absolute left-1/2 top-5 h-36 w-36 -translate-x-1/2 rounded-full bg-[#edf3ff] opacity-80 blur-2xl"
      />
      <div
        class="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f6f9ff]"
      >
        <svg
          class="h-10 w-10 text-[#2f6bff]"
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

      <h1 class="relative text-2xl font-semibold text-[#303133]">
        {{ title || $route.meta.title || '当前页面' }}
      </h1>
      <p class="mt-3 text-sm text-[#909399]">该功能正在开发中，敬请期待</p>
      <div class="mx-auto mt-7 flex max-w-xs justify-center gap-6 text-xs text-[#909399]">
        <div class="flex items-center gap-1.5">
          <span class="h-2 w-2 rounded-full bg-emerald-400" />
          <span>设计完成</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2 w-2 animate-pulse rounded-full bg-[#2f6bff]" />
          <span>开发中</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="h-2 w-2 rounded-full bg-[#d5dae3]" />
          <span>待测试</span>
        </div>
      </div>
      <div class="mx-auto mt-4 w-56">
        <div class="h-2 overflow-hidden rounded-full bg-[#eef1f6]">
          <div class="h-full w-2/5 rounded-full bg-[#2f6bff]" />
        </div>
      </div>
      <p class="mt-6 font-mono text-xs text-[#b7bdc7]">{{ $route.path }}</p>
    </div>
  </div>
</template>
