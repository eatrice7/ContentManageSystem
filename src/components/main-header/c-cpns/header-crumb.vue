<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumb } from '@/utils/map-menus'

const userMenus = useLoginStore().menuInfo
const route = useRoute()
// 当菜单发生变化时，面包屑也发生变化
const breadcrumb = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenus)
})
console.log(breadcrumb)
</script>

<style scoped>
.header-crumb {
}
</style>
