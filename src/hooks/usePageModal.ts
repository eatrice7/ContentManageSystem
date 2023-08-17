import { ref } from 'vue'
import PageModal from '@/components/page-modal/page-modal.vue'

type CbFnType = (data?: any) => void

function usePageModal(newCallback?: CbFnType, editCallback?: CbFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewUserClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(data: any) {
    // 1.让modal组件显示出来
    modalRef.value?.setModalVisible(false, data)
    // 2.编辑的回调 拿到编辑按钮传过来的整行数据
    if (editCallback) editCallback(data)
  }
  return {
    modalRef,
    handleNewUserClick,
    handleEditClick
  }
}

export default usePageModal
