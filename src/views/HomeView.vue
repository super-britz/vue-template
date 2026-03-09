<script setup lang="ts">
// 首页
</script>

<template>
  <div>
    <h1 class="mb-4 text-xl font-semibold text-gray-800">首页</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ElCard shadow="hover">
        <template #header>
          <span class="font-medium">用户数</span>
        </template>
        <p class="text-3xl font-bold text-blue-500">1,024</p>
      </ElCard>
      <ElCard shadow="hover">
        <template #header>
          <span class="font-medium">订单数</span>
        </template>
        <p class="text-3xl font-bold text-green-500">512</p>
      </ElCard>
      <ElCard shadow="hover">
        <template #header>
          <span class="font-medium">销售额</span>
        </template>
        <p class="text-3xl font-bold text-orange-500">¥98,432</p>
      </ElCard>
    </div>
  </div>
</template>
