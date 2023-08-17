<template>
  <div class="pane-account">
    <el-form :model="account" :rules="accountRules" label-width="60px" ref="elFormRef">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

//2.account form校验规则
const accountRules = {
  name: [
    { required: true, message: '必须输入帐号', trigger: 'blur' },
    { min: 5, max: 20, message: '长度必须在5~20位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '密码必须为长度大于3位的字母数字组合', trigger: 'blur' }
  ]
}

//3.执行帐号的登录逻辑
const elFormRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemePwd: boolean) {
  // 规则验证
  elFormRef.value?.validate((valid: any) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求(携带帐号和密码)
      loginStore
        .loginAccount({ name, password })
        .then(() => {
          // 3. 记住账号和密码
          if (isRemePwd) {
            localCache.setCache(CACHE_NAME, name)
            localCache.setCache(CACHE_PASSWORD, password)
          } else {
            localCache.removeCache(CACHE_NAME)
            localCache.removeCache(CACHE_PASSWORD)
          }
          // 4.提示信息
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
        })
        .catch(() => {
          ElMessage({
            message: '账号或密码错误！',
            type: 'danger'
          })
        })
    } else {
      // 需要导入样式
      ElMessage.error('Oops, 请输入符合要求的帐号或密码。')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped></style>
