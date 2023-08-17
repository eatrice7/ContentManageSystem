<template>
  <div class="pie-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from '..'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../typs/index'

// 接收传过来的属性
interface IProps {
  pieData: IEchartValueType[]
}
const props = defineProps<IProps>()

// 图标配置
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        // 展示传过来的数据
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped>
.pie-echart {
}
</style>
