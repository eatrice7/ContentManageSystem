<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreate ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="newFormData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="newFormData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date - picker'">
                <el-date-picker
                  v-model="newFormData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="newFormData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSystemStore } from '@/store/main/system/system'

// 0.声明类型
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()

// 1.控制user-modal组件是否显示
const dialogVisible = ref(false)
// 1.1记录该组件是编辑按钮还是新建用户功能，默认为新建
const isCreate = ref<boolean>(true)
const recordUserData = ref<any>(0)

// 2.初始化表单对象 prop
const initialFormProps: any = {}
for (const item of props.modalConfig.formItems) {
  initialFormProps[item.prop] = ''
}
const newFormData = reactive<any>(initialFormProps)

const systemStore = useSystemStore()

// 3.创建用户 确认按钮功能
function handleConfirmClick() {
  // 取消弹窗
  dialogVisible.value = false

  // 合并otherInfo中的信息(菜单)
  let infoData = newFormData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  // 发送请求
  if (!isCreate.value && recordUserData.value) {
    // 编辑
    systemStore
      .updataPageDataAction(props.modalConfig.pageName, recordUserData.value.id, infoData)
      .then((res) => {
        ElMessage({
          message: res.data,
          type: res.code === 0 ? 'success' : 'error'
        })
      })
  } else {
    // 新建
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData).then((res) => {
      ElMessage({
        message: res.data,
        type: res.code === 0 ? 'success' : 'error'
      })
    })
  }
}

// 4.弹出创建用户界面
/**
 *
 * @param isNew 是否为新建用户, 默认是新建用户
 * @param userData 传过来的整行用户数据
 */
function setModalVisible(isNew: boolean = true, userData: any = {}) {
  // 封装一层函数可以做一些拦截操作
  dialogVisible.value = true
  if (!isNew && userData) {
    // 编辑操作
    isCreate.value = isNew
    recordUserData.value = userData
    for (const key in newFormData) {
      newFormData[key] = userData[key]
    }
  } else {
    // 新建操作
    isCreate.value = isNew
    for (const key in newFormData) {
      newFormData[key] = ''
    }
  }
}

defineExpose({ setModalVisible })
</script>

<style scoped>
.el-form-item {
  padding: 0 30px;
}
</style>
