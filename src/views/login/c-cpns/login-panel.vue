<template>
  <div class="login-panel">
    <!-- 1.顶部区域 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 2.中部区域 -->
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane label="帐号登录" name="account">
          <!-- 具名插槽 -->
          <template #label>
            <el-icon><UserFilled /></el-icon>
            <span class="text">帐号登录</span>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 3.底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemePwd" label="记住密码" size="large" />
      <el-link type="primary" href="">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { ref, watch } from 'vue'

const isRemePwd = ref<boolean>(localCache.getCache('isRemePwd') ?? false)
watch(isRemePwd, (newValue) => {
  // 记录 记住密码 的状态，选中记住密码按钮
  localCache.setCache('isRemePwd', newValue)
})

const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PaneAccount>>() //子组件类型

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    console.log('使用账号登录')
    accountRef.value?.loginAction(isRemePwd.value)
  } else {
    console.log('使用手机登录')
  }
}
</script>

<style scoped>
.login-panel {
  margin-bottom: 150px;
  width: 330px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .tabs {
    .text {
      margin-left: 3px;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
