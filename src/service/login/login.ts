import type { IAccount } from '@/types'
import myRequest from '..'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return myRequest.get({
    url: `/users/${id}`
    // 给每个请求都添加token，很麻烦。--> 给拦截器携带token
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenuByRoleId(id: number) {
  return myRequest.get({
    url: `/role/${id}/menu`
  })
}
