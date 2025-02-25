import type { Column, StorageColumn } from '../types'

export interface ColumnSettingsProps<T> {
  tblName: string
  cols: Column<T>[]
  stgCols: StorageColumn[]
}

export interface ColumnSettingsItemProps<T> {
  cols: Column<T>[]
  stgCol: StorageColumn
}

export type FixType = 'left' | 'right' | 'unfixed'
