<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <div class="form">
        <el-form :model="newFormData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="newFormData.name" placeholder="请输入您的用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="newFormData.realname" placeholder="请输入您的真实姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isCreate">
            <el-input v-model="newFormData.password" placeholder="请输入您的密码" show-password />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="newFormData.cellphone" placeholder="请输入您的电话号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="newFormData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in roles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="newFormData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in departments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
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
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import { useSystemStore } from '@/store/main/system/system'

// 控制user-modal组件是否显示
const dialogVisible = ref(false)
// 记录该组件是编辑按钮还是新建用户功能，默认为新建
const isCreate = ref<boolean>(true)
const recordUserData = ref<any>(0)

const newFormData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const mainstore = useMainStore()
const { roles, departments } = storeToRefs(mainstore)
const systemStore = useSystemStore()

// 创建用户 确认按钮功能
function handleConfirmClick() {
  // 取消弹窗
  dialogVisible.value = false
  // 发送请求
  if (!isCreate.value && recordUserData.value) {
    // 编辑用户信息
    systemStore.updataUserDataAction(recordUserData.value.id, newFormData).then((res) => {
      ElMessage({
        message: res.data,
        type: res.code === 0 ? 'success' : 'error'
      })
    })
  } else {
    // 新建用户
    systemStore.newUserDataAction(newFormData).then((res) => {
      ElMessage({
        message: res.data,
        type: res.code === 0 ? 'success' : 'error'
      })
    })
  }
}

// 弹出创建用户界面
/**
 *
 * @param isNew 是否为新建用户, 默认是新建用户
 * @param userData 传过来的整行用户数据
 */
function setModalVisible(isNew: boolean = true, userData: any = {}) {
  // 封装一层函数可以做一些拦截操作
  dialogVisible.value = true
  if (!isNew && userData) {
    isCreate.value = isNew
    recordUserData.value = userData
    for (const key in newFormData) {
      newFormData[key] = userData[key]
    }
  } else {
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
