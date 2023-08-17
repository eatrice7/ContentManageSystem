<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-user-click="handleNewUserClick"
      @edit-click="handleEditClick"
    >
      <!-- 自定义显示内容 作用域插槽
      <template #name="scope">
        <span class="name">-{{ scope.row[scope.prop] }}-</span>
      </template>
      <template #intro="scope"> oooop </template> -->
    </page-content>
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handleTreeClick"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref } from 'vue'
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'
import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 0.逻辑关系
// content组件
const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
// modal组件
const { modalRef, handleNewUserClick, handleEditClick } = usePageModal(newCallback, editCallback)

// 1.角色菜单操作
const mianStore = useMainStore()
// ***storeToRefs:响应式,否则第一次没有数据
const { menus } = storeToRefs(mianStore)
// 1.1收集选中的菜单
const otherInfo = ref<any>({})
function handleTreeClick(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
// 1.2获取已创建角色的菜单,进行回显
const treeRef = ref<InstanceType<typeof ElTree>>()
// 问题（简单）：因为用的同一个elTree,当点击编辑按钮后，再点击新建按钮，会有数据回显-->优化：
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallback(itemData: any) {
  console.log({ ...itemData })
  // itemData:一个角色所包含的所有信息
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    console.log(menuIds)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped></style>
