import type { RouteRecordRaw } from 'vue-router'

export function loadLocalRoutes() {
  // 1.动态获取的路由对象, 放到数组中
  //*路由对象都放在独立的文件中
  //*从文件中所有路由对象读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1.读取router/main中所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 拿到登录后第一个页面信息
export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  // 1.动态获取的路由对象, 放到数组中
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可) -> 第一次添加的
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 2.添加二级路由
        routes.push(route)
      }

      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
/**
 *根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 * @returns 没有值，默认undefined
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
}

interface IBreadcrumb {
  name: string
  path?: string
}
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumb: IBreadcrumb[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumb.push({ name: menu.name, path: menu.url })
        breadcrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumb
}

/**
 * 菜单映射到id的列表
 * @param menuList
 * @returns
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  // 对对象进行递归拿到id
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 *
 * @param menuList 菜单列列表
 * @returns 返回按钮权限数组
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        // item.children为空 会报错
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
