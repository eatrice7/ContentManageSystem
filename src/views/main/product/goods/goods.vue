<template>
  <div class="goods">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-user-click="handleNewUserClick"
    >
      <template #images="scope">
        <img :src="scope.row[scope.prop]" alt="" class="goods-img" />
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="goods">
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
.goods {
  .goods-img {
    height: 80px;
  }
}
</style>
