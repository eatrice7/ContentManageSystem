<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { watchEffect } from 'vue'
import ChinaJson from '../data/china.json'

// 注册中国地图
echarts.registerMap('china', ChinaJson as any)

// 自定义设置选项
interface IOptionProps {
  option: EChartsOption
}
const props = defineProps<IOptionProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1.初始化
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  // 2.第一次进行setOption
  // watchEffect监听option变化。重新执行
  watchEffect(() => echartInstance.setOption(props.option))
  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style scoped>
.base-echart {
  .echart {
    height: 300px;
  }
}
</style>
