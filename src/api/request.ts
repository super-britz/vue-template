import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/types'
import { toLogin } from './auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
})

/** 防止并发 401 重复跳转 */
let isRedirecting = false

// 响应拦截器：只处理 HTTP 层错误
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      if (!isRedirecting) {
        isRedirecting = true
        toLogin()
      }
      return new Promise(() => {})
    }

    if (!error.response) {
      ElMessage.error(error.code === 'ECONNABORTED' ? '请求超时' : '网络异常')
    } else if (status >= 500) {
      ElMessage.error('服务器异常，请稍后重试')
    }

    return Promise.reject(error)
  },
)

/**
 * 通用请求方法，自动解包 ApiResponse
 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await instance.request<ApiResponse<T>>(config)

  if (data.resultCode !== '1000') {
    const msg = data.resultDesc || '请求失败'
    ElMessage.error(msg)
    throw new Error(msg)
  }

  return data.data
}

export default instance
