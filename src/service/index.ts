import { localCache } from '@/utils/cache'
import { BASE_URL, TIMEOUT } from './config'
import MyRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 发送请求携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default myRequest
