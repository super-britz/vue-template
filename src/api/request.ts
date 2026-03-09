import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types'
import { toLogin } from './auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
})

// 响应拦截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      toLogin()
    }

    return Promise.reject(error)
  },
)

/**
 * 通用请求方法，自动解包 ApiResponse
 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await instance.request<ApiResponse<T>>(config)
  return data.data
}

export default instance
