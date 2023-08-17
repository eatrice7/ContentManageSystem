<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <span v-show="!isCollapse" class="title">后台管理系统</span>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isCollapse"
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <!-- 插槽 -->
            <template #title>
              <!-- 添加图标组件：服务器返回字符串'el-icon-monitor' 转为组件 => component动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleRouter(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

// 0.定义props
defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

// 1.获取菜单信息
const loginStore = useLoginStore()
const userMenus = loginStore.menuInfo
console.log(userMenus)

// 2.处理路由跳转
const router = useRouter()
function handleRouter(item: any) {
  router.push(item.url)
}

// 3.el-menu的默认菜单
// 拿到地址栏的url
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

/* el-menu,el-sub-menu,el-menu-item都是子组件的根元素，不需要加 :deep() */
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
