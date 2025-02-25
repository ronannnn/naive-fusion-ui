import type { NaiveUiSize, WhereQuery, WhereQueryOpr } from '@/shared'
import type { OpUnitType } from 'dayjs'
import type { Shortcuts } from 'naive-ui/es/date-picker/src/interface'
import type { ColumnWhereQueryOption } from '../../types'

export type WhereQueryOption<T> = {
  field: keyof T | string
  label: string
} & Partial<ColumnWhereQueryOption<T>>

export interface WhereQueryProps<T> {
  whereOptions: WhereQueryOption<T>[]

  whereQuerySupData: Record<string, any>
  onUpdateWhereQuerySupData: (data: Record<string, any>) => void

  defaultWhereQueryOptionKeys?: string[]
  whereQueryOptionKeys?: string[]
  onUpdateWhereQueryOptionKeys: (keys: string[]) => void

  defaultWhereQuery?: WhereQuery<T>
  whereQuery: WhereQuery<T>
  onUpdateWhereQuery: (query: WhereQuery<T>) => void

  loading?: boolean
  triggerQuery: () => Promise<void>
  size?: NaiveUiSize
}

export interface TableWhereQueryItemProps {
  label: string
  opr?: WhereQueryOpr
  disabled?: boolean
  size?: NaiveUiSize
}

export interface TableWhereQueryItemDateProps {
  ofUnit?: OpUnitType
  shortcuts?: Shortcuts
  format?: string
}
