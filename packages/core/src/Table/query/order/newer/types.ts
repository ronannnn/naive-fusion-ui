import type { NaiveUiSize } from '@/shared'
import type { TableOrderQueryOption } from '../types'

export interface TableOrderQueryNewerProps<T> {
  orderOptions: TableOrderQueryOption<T>[]
  unselectedFields: string[]
  size?: NaiveUiSize
}
