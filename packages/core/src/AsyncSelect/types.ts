import type { OrderQuery, PageResult, QueryTemplate, RequestResult, WhereQuery, WhereQueryItem } from '@/shared'
import type { SelectProps } from 'naive-ui'
import type { VNode } from 'vue'

export interface SearchSelectProps<T> {
  initModel?: T

  // query related
  queryFn: (query: QueryTemplate<T>) => Promise<RequestResult<PageResult<T>>>
  queryFields: WhereQueryItem<T>[]
  queryDebounceDelay?: number
  extraWhereQuery?: WhereQuery<T>
  extraOrderQuery?: OrderQuery<T>

  labelField: string
  valueField?: string

  // select props
  size?: SelectProps['size']
  placeholder?: SelectProps['placeholder']
  disabled?: SelectProps['disabled']
  multiple?: SelectProps['multiple']
  loading?: SelectProps['loading']

  renderOptionFromData?: (model: any) => VNode
  triggerAfterSelected?: (model: any) => void
}
