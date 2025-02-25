import type { NaiveUiSize, OrderQuery } from '@/shared'
import type { ColumnOrderQueryOption } from '../../types'

export interface TableOrderQueryOption<T> extends ColumnOrderQueryOption {
  field: keyof T
  label: string
}

export interface TableOrderQueryProps<T> {
  defaultOrderQuery?: OrderQuery<T>
  orderQuery: OrderQuery<T>
  orderOptions: TableOrderQueryOption<T>[]
  loading?: boolean
  size?: NaiveUiSize
  triggerQuery: () => Promise<void>
  onUpdateOrderQuery: (query: OrderQuery<T>) => void
}
