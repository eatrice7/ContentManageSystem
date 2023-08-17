<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleIconClick">
      <el-icon size="30px">
        <component :is="isFold ? 'expand' : 'fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import headerCrumb from './c-cpns/header-crumb.vue'

// 自定义事件
const emit = defineEmits(['foldChange'])

// 默认不折叠
const isFold = ref(false)
function handleIconClick() {
  // 折叠 or 展开
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
