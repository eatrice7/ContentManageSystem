<template>
  <div class="category">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-user-click="handleNewUserClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="category">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// content组件
const { contentRef, handleResetClick, handleQueryClick } = usePageContent()
// modal组件
const { modalRef, handleNewUserClick, handleEditClick } = usePageModal()
</script>

<style scoped>
.category {
}
</style>
