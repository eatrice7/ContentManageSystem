<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="用户名" width="160" align="center" />
        <el-table-column prop="realname" label="真实姓名" width="140" align="center" />
        <el-table-column prop="cellphone" label="手机号码" width="160" align="center" />
        <el-table-column prop="enable" label="状态" width="100" align="center">
          <!-- 自定义列的显示内容：作用域插槽 -->
          <template #default="scope">
            <!-- 该组件将一行的数据传给了scope -->
            <el-button size="small" :type="scope.row.enable ? 'success' : 'info'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              link
              icon="Edit"
              @click="handleEditBtnClick(scope.row)"
              v-if="isUpdate"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              link
              icon="Delete"
              @click="handleDeleteBtnClicl(scope.row.id)"
              v-if="isDelete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

const emit = defineEmits(['newUserClick', 'editClick'])

// 0.按钮权限
const isCreate = usePermissions('users:create')
const isUpdate = usePermissions('users:update')
const isDelete = usePermissions('users:delete')
const isQuery = usePermissions('users:query')

// 1.发送网络请求，拿到 userslist数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(true)
fetchUserListData()

// 2.获取数据
// 第一次没有值，而且不是响应式的，优化：storeToRefs
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.分页器 功能函数
function handleCurrentChange() {
  fetchUserListData()
}
function handleSizeChange() {
  fetchUserListData()
}
// 删除按钮
function handleDeleteBtnClicl(id: number) {
  systemStore.deleteUserByIdAction(id).then((res) => {
    ElMessage({
      message: res.data,
      type: res.code === 0 ? 'success' : 'warning'
    })
  })
}
// 编辑按钮
function handleEditBtnClick(userData: any) {
  // 把整行数据传过去
  emit('editClick', userData)
}

// 新建用户按钮功能
function handleNewUserClick() {
  emit('newUserClick')
}

/**
 *
 * @param formData 查询按钮中的formSearch对象
 */
// 4.发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取size/offset
  const size = pageSize.value
  // currentPage默认值为1,offset从0开始偏移
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.getUsersListAction(queryInfo)
}

systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'newUserDataAction') {
      currentPage.value = 1
    }
  })
})

defineExpose({ fetchUserListData })
</script>

<style scoped>
.content {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  .title {
    font-size: 22px;
  }
}
.table {
  border-top: 2px solid #f2f2f2;

  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}
.content {
  .el-pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
