import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleResetClick() {
    contentRef.value?.fetchUserListData()
  }
  function handleQueryClick(formData: any) {
    contentRef.value?.fetchUserListData(formData)
  }
  return {
    contentRef,
    handleResetClick,
    handleQueryClick
  }
}

export default usePageContent
