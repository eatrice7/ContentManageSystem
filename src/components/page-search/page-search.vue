<template>
  <div class="search">
    <!-- 1.输入的表单 -->
    <el-form :model="formSearch" ref="elFormRef" label-width="80px" size="large">
      <el-row :gutter="80">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formSearch[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formSearch[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formSearch[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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

interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['resetClick', 'queryClick'])

// 把search.config.ts里的对象付给formSearch进行绑定
const initialformSearch: any = {}
for (const item of props.searchConfig.formItems) {
  initialformSearch[item.prop] = item.initialValue ?? ''
}
const formSearch: any = reactive(initialformSearch)

// 重置按钮功能 将事件传递给父组件user,拿到数据后子组件content发送网络请求
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
