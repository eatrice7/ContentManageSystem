// 请求多个页面都需要的数据：部门和角色数据
import myRequest from '..'

export function getEntireRole() {
  return myRequest.post({
    url: '/role/list'
  })
}
export function getEntireDepartment() {
  return myRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenu() {
  return myRequest.post({
    url: '/menu/list'
  })
}
