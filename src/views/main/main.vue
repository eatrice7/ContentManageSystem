<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '220px'">
        <main-menu :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

// 控制menu-aside展开 or 折叠 -> 父子组件通信
const isCollapse = ref(false)
function handleFoldChange(flag: boolean) {
  isCollapse.value = flag
}
</script>

<style scoped>
.main {
  height: 100%;
}
.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.5s ease;
    /* 消除滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
