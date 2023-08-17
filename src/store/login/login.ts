import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'

// 声明 state 类型
interface ILoginState {
  token: string
  userInfo: any
  menuInfo: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    menuInfo: [],
    permissions: []
  }),
  actions: {
    async loginAccount(account: IAccount) {
      // 1.帐号登录，获取 token 等信息
      const loginResult = await accountLoginRequest(account)
      console.log(loginResult)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 2.进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.携带token，获取用户信息（角色信息）
      // 根据用户id获取角色, 再根据角色id获取菜单
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // **登录后请求roles和departments数据, 后期部门或角色可能会改动，所以不添加到本地缓存中
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 4.获取角色的菜单信息
      const menuInfoResult = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenu = menuInfoResult.data
      this.menuInfo = userMenu

      // 缓存 userInfo, menuInfo信息，防止刷新后消失(login页面发生的请求，在main页面刷新后会消失)
      // 放在 state 中的数据会被包裹一层proxy，所以不用
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('menuInfo', userMenu)

      // 重要：动态添加路由
      // 1.动态获取的路由对象, 放到数组中
      //*路由对象都放在独立的文件中
      //*从文件中所有路由对象读取到数组中
      // const localRoutes: RouteRecordRaw[] = []
      // // 1.1.读取router/main中所有的ts文件
      // const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
      //   eager: true
      // })
      // for (const key in files) {
      //   const module = files[key]
      //   localRoutes.push(module.default)
      // }
      // for (const menu of userMenu) {
      //   for (const submenu of menu.children) {
      //     const route = localRoutes.find((item) => item.path === submenu.url)
      //     if (route) router.addRoute('main', route)
      //   }
      // }
      const routes = mapMenusToRoutes(userMenu)
      routes.forEach((route) => router.addRoute('main', route))
      // 5.跳转到 main 页面
      router.push('/main')

      // 6.页面按钮权限管理：增删改查
      const permissionsResult = mapMenusToPermissions(this.menuInfo)
      this.permissions = permissionsResult
    },

    // 在mmain页面刷新之后，由于重新执行代码，点击登录按钮注册的子路由会消失，优化：
    loadLoadCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const menuInfo = localCache.getCache('menuInfo')
      if (token && userInfo && menuInfo) {
        this.token = token
        this.userInfo = userInfo
        this.menuInfo = menuInfo
      }
      // **刷新后，再次请求roles和departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 2.动态添加路由
      const routes = mapMenusToRoutes(menuInfo)
      routes.forEach((route) => router.addRoute('main', route))

      // 3.页面按钮权限管理：增删改查
      const permissionsResult = mapMenusToPermissions(this.menuInfo)
      this.permissions = permissionsResult
    }
  }
})

export default useLoginStore
