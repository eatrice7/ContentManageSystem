<template>
  <div class="department">
    <page-search @reset-click="handleResetClick" @query-click="handleQueryClick" />
    <page-content
      ref="contentRef"
      @new-user-click="handleNewUserClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

// content组件
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewUserClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(data: any) {
  modalRef.value?.setModalVisible(false, data)
}
</script>

<style scoped></style>
