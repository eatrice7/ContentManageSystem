<template>
  <div class="search">
    <!-- 1.输入的表单 -->
    <el-form :model="formSearch" ref="elFormRef" label-width="80px" size="large">
      <el-row :gutter="80">
        <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8">
          <!-- prop: 重置按钮 属性性设置为需要验证的特殊键值即可 -->
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formSearch.name" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8">
          <el-form-item label="部门领导" prop="realname">
            <el-input v-model="formSearch.leader" placeholder="请输入部门领导" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="formSearch.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2.按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleRefreshClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleSearchClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

const formSearch: any = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 重置按钮功能 将事件传递给父组件user,拿到数据后子组件content发送网络请求
const emit = defineEmits(['resetClick', 'queryClick'])
const elFormRef = ref<InstanceType<typeof ElForm>>()
function handleRefreshClick() {
  // el-form组件封装的功能
  elFormRef.value?.resetFields()
  // 自定义事件
  emit('resetClick')
}
// 查询按钮功能
function handleSearchClick() {
  emit('queryClick', formSearch)
}
</script>

<style scoped>
.search {
  background-color: white;
  padding: 20px;
}
.el-form-item {
  padding: 10px 50px 10px 20px;
}
.btns {
  text-align: right;
  height: 36px;
  margin-right: 50px;
}
</style>
