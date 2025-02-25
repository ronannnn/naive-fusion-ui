import type { VNode } from 'vue'
import type { PageResult, RequestResult } from './api'
import type { OrderQuery, QueryTemplate, WhereQuery, WhereQueryItem } from './query'

export type NaiveUISize = 'small' | 'medium' | 'large'

export interface AsyncCompProps<T> {
  // query related
  queryFn?: (query: QueryTemplate<T>) => Promise<RequestResult<PageResult<T>>>
  queryFields?: WhereQueryItem<T>[]
  queryDebounceDelay?: number
  extraWhereQuery?: WhereQuery<T>
  extraOrderQuery?: OrderQuery<T>

  labelField: string
  valueField?: string
  distinct?: boolean // 设置该值后，需设置queryFn中的SelectQueryItem.distinct为true，且需要设置skipCount为true

  renderOptionFromData?: (model: T) => VNode
  triggerAfterSelected?: (model: T) => void

  size?: NaiveUISize
  placeholder?: string
  disabled?: boolean
  empty?: string | VNode
}
