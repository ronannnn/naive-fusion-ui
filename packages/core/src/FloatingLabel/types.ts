import type { NaiveUISize } from '@/shared'

export interface FloatingLabelProps {
  isEmptyValue?: boolean
  focused?: boolean
  size?: NaiveUISize
  hasPrefix?: boolean
  placeholder?: string | [string, string]
}
