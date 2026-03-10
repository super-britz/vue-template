/** 通用 API 响应结构 */
export interface ApiResponse<T = unknown> {
  resultCode: string
  resultDesc: string
  data: T
}

/** 分页请求参数 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** 分页响应数据 */
export interface PaginatedData<T = unknown> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
