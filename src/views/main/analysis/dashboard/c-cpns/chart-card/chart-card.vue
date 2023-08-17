<template>
  <div class="chartCard">
    <el-card :header="header" shadow="hover">
      <slot>默认内容</slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface IChartProps {
  header?: string
}
withDefaults(defineProps<IChartProps>(), {
  header: '卡片默认标题'
})
</script>

<style scoped></style>
