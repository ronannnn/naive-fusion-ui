// range
export interface RangeQuery {
  start?: any
  end?: any
}

// pagination
export interface Pagination {
  pageNum: number
  pageSize: number
}

export interface QueryTemplate<T> {
  pagination: Pagination
  selectQuery?: SelectQuery<T>
  whereQuery?: WhereQuery<T>
  orderQuery?: OrderQuery<T>
  skipCount?: boolean
}

// select query
export type SelectQuery<T> = SelectQueryItem<T>[]
export interface SelectQueryItem<T> {
  field: keyof T | string
  distinct: boolean
}

// where query
export type WhereQueryOpr = 'custom'
  | 'eq' | 'ne'
  | 'gt' | 'gte' | 'lt' | 'lte'
  | 'like' | 'start_like' | 'end_like'
  | 'in' | 'not_in' | 'range'
  | 'is' | 'is_not'
  | 'str_len_eq' | 'str_len_ne'
  | 'str_len_gt' | 'str_len_gte' | 'str_len_lt' | 'str_len_lte'
  | null
export type WhereQuery<T> = WhereQueryItemGroup<T>[]
export interface WhereQueryItemGroup<T> {
  andOr?: 'and' | 'or'
  items?: WhereQueryItem<T>[]
  groups?: WhereQueryItemGroup<T>[]
}
export interface WhereQueryItem<T> {
  andOr?: 'and' | 'or'
  field: keyof T | string
  opr: string
  value?: any
}

// order query
export type OrderQueryType = 'asc' | 'desc' | 'str_len_asc' | 'str_len_desc' | null
export type OrderQuery<T> = OrderQueryItem<T>[]
export interface OrderQueryItem<T> {
  field: keyof T | string
  order: OrderQueryType
}
