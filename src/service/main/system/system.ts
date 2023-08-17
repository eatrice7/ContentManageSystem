import myRequest from '@/service'

export function postUsersListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
export function deleteUserById(id: number) {
  return myRequest.delete({
    url: `users/${id}`
  })
}
// 创建用户接口
export function newUserData(userData: any) {
  return myRequest.post({
    url: '/users',
    data: userData
  })
}
// 编辑用户接口
export function updateUserData(id: number, userData: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: userData
  })
}

// ----页面信息抽取----
export function postPageListData(pageName: string, pageInfo: any) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: pageInfo
  })
}
export function newPageData(pageName: string, pageInfo: any) {
  return myRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}
export function updataPageData(pageName: string, id: number, pageInfo: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return myRequest.delete({
    url: `${pageName}/${id}`
  })
}
