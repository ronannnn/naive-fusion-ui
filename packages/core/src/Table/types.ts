import type { DropdownButtonOption } from '@/button/DropdownButton'
import type { BatchDeleteCommand, OrderQuery, OrderQueryType, PageResult, QueryTemplate, RequestResult, WhereQuery, WhereQueryOpr } from '@/shared'
import type {
  DataTableBaseColumn,
  DataTableColumn,
  DataTableCreateRowKey,
} from 'naive-ui'
import type { Ref, VNode } from 'vue'
import type { HeaderOperationsProps } from './header-operations'
import type { TableOrderQueryOption, TableWhereQueryAsyncAutoCompleteProps, TableWhereQueryAsyncSelectProps, TableWhereQueryDatePickerProps, TableWhereQueryDateRangePickerProps, TableWhereQuerySelectProps, WhereQueryOption } from './query'

export interface StorageColumn {
  key: string
  checked?: boolean
  width?: string | number
  fixed: 'left' | 'right' | 'unfixed'
}

export interface StorageTableSetting<T> {
  columns?: StorageColumn[]
  pageSize?: number
  // where query
  whereQuery?: WhereQuery<T>
  whereQueryOptionKeys?: string[] // 用来控制是否显示option以及option的顺序
  whereQueryPinned?: boolean
  whereQuerySupData?: Record<string, any> // 用来存储额外的数据，例如下拉框的选项
  // order query
  orderQuery?: OrderQuery<T>
}

export type ColumnDataType = 'id'
  | 'string' | 'date' | 'time'
  | 'number' | 'decimal'
  | 'select' | 'multiSelect' | 'asyncSelect' | 'asyncMultiSelect'
  | 'email' | 'phone' | 'status'
  | 'createdBy' | 'updatedBy'

// row actions
export interface RowActionCommonProps<T> {
  hide?: (data: T) => boolean
  permissions?: string | string[]
  key: string
  label: string | ((data: T) => string)
  icon: (data: T) => VNode
}
export interface RowTooltipActionProps<T> extends RowActionCommonProps<T> {
  type: 'tooltip'
  syncFn?: (data: T) => void
  asyncFn?: (data: T) => Promise<void>
  disabled?: (data: T) => boolean
  disabledMsg?: (data: T) => string
}
export interface RowPopconfirmActionProps<T> extends RowActionCommonProps<T> {
  type: 'popconfirm'
  syncConfirmFn?: (data: T) => void
  asyncConfirmFn?: (data: T) => Promise<void>
  disabled?: (data: T) => boolean
  disabledMsg?: (data: T) => string
}
export interface RowDropdownActionProps<T> extends RowActionCommonProps<T> {
  type: 'dropdown'
  dropdownButtonOptions: (row: T) => DropdownButtonOption[]
}
export type RowActionProps<T> = RowTooltipActionProps<T> | RowPopconfirmActionProps<T> | RowDropdownActionProps<T>

// columns
// where query
export type ColumnWhereQueryOption<T> = {
  opr?: WhereQueryOpr
  initValues?: T
  icon?: () => VNode
  initHide?: boolean // 初始化where query form的时候是否隐藏该字段，即不会添加到localStorage中
} & (
  | { type: 'asyncSelect' } & TableWhereQueryAsyncSelectProps<T>
  | { type: 'asyncAutoComplete' } & TableWhereQueryAsyncAutoCompleteProps<T>
  | { type: 'date' } & TableWhereQueryDatePickerProps
  | { type: 'dateRange' } & TableWhereQueryDateRangePickerProps
  | { type: 'input' }
  | { type: 'select' } & TableWhereQuerySelectProps
  | { type: 'unknown' }
)

// order query
export interface ColumnOrderQueryOption {
  initOrderType: OrderQueryType
}

// columns
export interface Column<T> extends DataTableBaseColumn<T> {
  filterOption?: ColumnWhereQueryOption<T>
  sortOption?: ColumnOrderQueryOption | true
  initHide?: boolean // 初始化的时候是否隐藏该列，即不会添加到localStorage中
}

// table props
export interface TableProps<T> {
  // 1. table-level props
  // meta
  name: string
  primaryKey?: string
  title?: string
  rowKey?: DataTableCreateRowKey<T>
  extraButtons?: HeaderOperationsProps<T>['extraButtons']
  disableCreate?: boolean
  refreshFlag?: boolean
  disableFetchOnMounted?: boolean
  // pagination
  disablePagination?: boolean
  disableBatchDelete?: boolean
  // where query
  showAllWhereOptionsWhenInit?: boolean
  extraWhereQueryOptions?: WhereQueryOption<T>[]
  extraWhereQueryInitValues?: WhereQuery<T>
  // order query
  extraOrderQueryOptions?: TableOrderQueryOption<T>[] // order query不需要initValues，因为OrderOption中自带了initOrderType
  // 2. row-level props
  // selection
  disableRowSelection?: boolean
  // deletion
  disableRowDelete?: boolean
  // expand
  disableRowExpand?: boolean
  rowExpand?: (row: T) => VNode
  // actions
  rowActions?: RowActionProps<T>[]

  // 3. column-level props
  columns: Column<T>[]
  commonColumnProps?: Omit<DataTableColumn<T>, 'key'>

  // 4. fn
  onCreate?: () => void
  onFetch?: (query: QueryTemplate<T>) => Promise<RequestResult<PageResult<T>>>
  // deletion
  onBatchDelete?: (cmd: BatchDeleteCommand) => Promise<RequestResult>

  // excel
  excel?: {
    onExportExcel: () => void
    exportedFilename?: string
  }
}

export type LocalTableProps<T> = TableProps<T> & {
  data: Ref<T[]>
  onUpdateData: (data: T[]) => void
  rowKey: DataTableCreateRowKey<T>
}
