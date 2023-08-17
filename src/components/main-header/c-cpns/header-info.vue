<template>
  <div class="header-info">
    <div class="icons">
      <span class="icon-item">
        <el-icon><Bell /></el-icon>
      </span>
      <span class="icon-item">
        <el-icon><ChatLineRound /></el-icon>
      </span>
      <span class="icon-item">
        <span class="dot"></span>
        <el-icon><Postcard /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="user-name">{{ userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExit">
              <el-icon><SwitchButton /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleExit() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

const loginStore = useLoginStore()
const { userInfo } = loginStore
</script>

<style scoped>
.header-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icons {
  display: inline-flex;
  margin-right: 20px;

  .icon-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background-color: #f2f2f2;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background-color: #f00;
      border-radius: 100%;
    }
  }
}
.info {
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    .user-name {
      margin-left: 8px;
      font-size: 12px;
    }
  }
}
.info {
  /* Dropdown组件渲染在app组件之外，:deep不管用，所以用 :global */
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
