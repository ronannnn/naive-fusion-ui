export type CodeType =
  0 | // no error
  1 | // normal error
  2 | // field validation error
  10 | // access token error
  11 // refresh token error

export type showType =
  0 | // silent
  1 | // warning msg
  2 | // error msg
  3 // notification

export interface FormErrorField {
  errorField: string
  errorFieldWithNamespace: string
  errorMsg: string
}

/* 后端接口返回的数据结构配置 */
export interface BackendResultConfig {
  /* 表示后端成功请求的属性字段 */
  successKey: string
  /* 表示后端请求数据的属性字段 */
  dataKey: string
  /* 表示后端消息的属性字段 */
  msgKey: string
  /* 表示后端请求状态码的属性字段 */
  codeKey: string
  /* 表示后端处理错误的打印方式的属性字段，类似日志级别 */
  showTypeKey: string
}

/** 自定义的请求成功结果 */
interface SuccessResult<T = any> {
  /** 请求错误 */
  error: null
  /** 请求数据 */
  data: T
}
/** 自定义的请求失败结果 */
export interface FailedResult {
  /** 请求错误 */
  error: any
  /** 请求数据 */
  data: null
}
/** 自定义的请求结果 */
export type RequestResult<T = any> = SuccessResult<T> | FailedResult

export interface PageResult<T = any> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
  stats?: StatsItem[][]
}

export interface StatsItem {
  field: string
  result: any
  rmk?: string
}

export interface ModelWithId {
  id: number
}
