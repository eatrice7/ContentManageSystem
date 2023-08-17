<template>
  <div class="bar-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from '..'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: props.labels,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分类收藏统计',
        type: 'bar',
        barWidth: '60%',
        data: props.values
      }
    ]
  }
})
</script>

<style scoped>
.bar-echart {
}
</style>
