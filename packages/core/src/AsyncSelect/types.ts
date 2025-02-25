import type { AsyncCompProps } from '@/shared'
import type { SelectProps } from 'naive-ui'

export interface AsyncSelectProps<T> extends AsyncCompProps<T> {
  initModel?: T

  // select props
  multiple?: SelectProps['multiple']
  loading?: SelectProps['loading']
}
