<template>
  <div class="dashboard">
    <!-- 1.顶部数据展示 -->
    <el-row class="count-card" :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="12" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="分类商品数量（饼图）">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="不同城市商品销量">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card header="分类商品销售（玫瑰图）">
          <rose-echart :rose-data="showGoodsCategorySale" />
        </chart-card>
      </el-col>
    </el-row>
    <!-- 3.底部折线图统计 -->
    <el-row class="footer" :gutter="10">
      <el-col :span="12">
        <chart-card header="分类商品销售">
          <line-echart
            :labels="showGoodsCategorySaleLine.labels"
            :values="showGoodsCategorySaleLine.values"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card header="分类商品收藏">
          <bar-echart
            :labels="showGoodsCategoryFavor.labels"
            :values="showGoodsCategoryFavor.values"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
// import BaseEchart from '@/components/page-echarts'
import { PieEchart, LineEchart, RoseEchart, BarEchart, MapEchart } from '@/components/page-echarts'

// 1.发送网络请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.拿到数据
const { amountList, categoryCount, categorySale, categoryFavor, addressSale } =
  storeToRefs(analysisStore)

// 3.映射成想要的数据
const showGoodsCategoryCount = computed(() => {
  return categoryCount.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})
const showGoodsCategorySale = computed(() => {
  return categorySale.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})
const showGoodsCategorySaleLine = computed(() => {
  const labels = categorySale.value.map((item) => item.name)
  const values = categorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = categoryFavor.value.map((item) => item.name)
  const values = categoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return addressSale.value.map((item) => ({
    value: item.count,
    name: item.address
  }))
})
</script>

<style scoped>
.dashboard {
  .count-card {
    margin-bottom: 20px;
  }
  .footer {
    margin-top: 20px;
  }
}
</style>
