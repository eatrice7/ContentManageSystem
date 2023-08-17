<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header.title ?? '数据列表' }}</h3>
      <el-button
        type="primary"
        @click="handleNewUserClick"
        v-if="isCreate && contentConfig.header.btnTitle"
        >{{ contentConfig.header.btnTitle ?? '新建数据' }}</el-button
      >
    </div>
    <div class="table">
      <el-table :data="pageList" stripe style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row.createAt) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
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
                  @click="handleDeleteBtnClick(scope.row.id)"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <!-- 自定义显示内容 -->
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <!-- element表格组件拿到整行数据 -->
              <template #default="scope">
                <!-- 具名插槽 v-bind把整行数据绑过去 -->
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" class="text" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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

// 配置文件数据类型声明：
interface IProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()

// 0.按钮权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发送网络请求，拿到 userslist数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(true)
fetchUserListData()

// 2.获取数据
// 第一次没有值，而且不是响应式的，优化：storeToRefs
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.分页器 功能函数
function handleCurrentChange() {
  fetchUserListData()
}
function handleSizeChange() {
  fetchUserListData()
}
// 删除按钮
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id).then((res) => {
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
function fetchUserListData(formData?: any) {
  // 0.是否有查询按钮权限
  if (!isQuery) return
  // 1.获取size/offset
  const size = pageSize.value
  // currentPage默认值为1,offset从0开始偏移
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.getPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5.新建数据后，数据列表返回第一页，分页器不返回第一页优化：订阅 Actions
/*
三种思路：1.兄弟组件通信->利用父组件 2.事件总线：缺点-不可控，复杂情况时不确定在那个地方监听的，而且别的不相干的组件也可以监听
3.(比较偏)$onAction -> 增删改按钮都在一个组件,操作后都需要调用store里的方法,当增删改方法完成后修改currentPage为1
*/
// { name, after } ->参数结构
// name, action 的名字。after,在这个 action 执行完毕之后，执行这个函数。
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (name === 'newPageDataAction') {
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
  :deep(.cell) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
