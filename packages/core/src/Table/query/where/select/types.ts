import type { SelectOption, SelectProps } from 'naive-ui'

export interface TableWhereQuerySelectProps {
  multiple?: SelectProps['multiple']
  options?: SelectOption[]
  showFooter?: boolean
}
