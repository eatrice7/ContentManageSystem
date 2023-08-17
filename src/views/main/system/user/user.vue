<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content
      ref="contentRef"
      @new-user-click="handleNewUserClick"
      @edit-click="handleEidtClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

// content组件操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}

// modal组件操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewUserClick() {
  modalRef.value?.setModalVisible()
}
function handleEidtClick(userData: any) {
  modalRef.value?.setModalVisible(false, userData)
}
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
}
</style>
