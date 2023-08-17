import {
  postUsersListData,
  deleteUserById,
  newUserData,
  updateUserData,
  postPageListData,
  newPageData,
  updataPageData,
  deletePageById
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { IUsersList } from './type'
import useMainStore from '../main'

export const useSystemStore = defineStore('system', {
  state: (): IUsersList => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据
      const deleteResult = await deleteUserById(id)
      const code = deleteResult.code
      const data = deleteResult.data
      // 2.客户端页面保留了已经删除的数据，需要刷新（重新执行js代码），才能删除。优化：再发送网络请求
      // 扩展：可以用即时通信：socket，建立长连接
      this.getUsersListAction({ offset: 0, size: 10 })

      return { data, code }
    },
    async newUserDataAction(userData: any) {
      // 1.创建新用户
      const userResult = await newUserData(userData)
      const { data, code } = userResult
      // 2.重新请求新数据
      this.getUsersListAction({ offset: 0, size: 10 })
      return { data, code }
    },
    async updataUserDataAction(id: number, userData: any) {
      const updataResult = await updateUserData(id, userData)
      const { data, code } = updataResult

      this.getUsersListAction({ offset: 0, size: 10 })

      return { data, code }
    },

    // ----页面抽取----
    async getPageListAction(pageName: string, pageInfo: any) {
      const pageListResult = await postPageListData(pageName, pageInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 1.创建
      const newResult = await newPageData(pageName, pageInfo)
      const { data, code } = newResult
      // 2.重新请求新数据
      this.getPageListAction(pageName, { offset: 0, size: 10 })
      // 3.获取增删改后的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      return { data, code }
    },
    async updataPageDataAction(pageName: string, id: number, pageInfo: any) {
      console.log(pageInfo + 'pageInfo')
      // 1.创建
      const updateResult = await updataPageData(pageName, id, pageInfo)
      const { data, code } = updateResult
      // 2.重新请求新数据
      this.getPageListAction(pageName, { offset: 0, size: 10 })
      // 3.获取增删改后的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      return { data, code }
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据
      const deleteResult = await deletePageById(pageName, id)
      const code = deleteResult.code
      const data = deleteResult.data
      // 2.客户端页面保留了已经删除的数据，需要刷新（重新执行js代码），才能删除。优化：再发送网络请求
      // 扩展：可以用即时通信：socket，建立长连接
      this.getPageListAction(pageName, { offset: 0, size: 10 })
      // 3.获取增删改后的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      return { data, code }
    }
  }
})
