/** 通用 API 响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
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
