<template>
  <div class="app">
    <!-- 选择日期中文显示 -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  .link {
    margin: 20px;
  }
}
</style>
