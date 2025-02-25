import type { NaiveUISize } from '@/shared'

export interface FloatingLabelProps {
  value: string | [string, string] | undefined | null
  focused?: boolean
  size?: NaiveUISize
  hasPrefix?: boolean
  placeholder?: string | [string, string]
}
