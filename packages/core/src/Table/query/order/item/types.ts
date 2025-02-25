import type { NaiveUiSize, OrderQueryType } from '@/shared'
import type { TableOrderQueryOption } from '../types'

export interface TableOrderQueryItemProps<T> {
  field: string
  orderType: OrderQueryType
  orderOptions: TableOrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiSize
}
