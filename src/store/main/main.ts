// 存放多个页面所需的数据

import { getEntireDepartment, getEntireMenu, getEntireRole } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  roles: any[]
  departments: any[]
  menus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    roles: [],
    departments: [],
    menus: []
  }),
  actions: {
    // 在登录后请求数据 store -> login
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRole()
      const departmentsResult = await getEntireDepartment()
      const menusResult = await getEntireMenu()
      this.roles = rolesResult.data.list
      this.departments = departmentsResult.data.list
      this.menus = menusResult.data.list
    }
  }
})

export default useMainStore
