import type {
  DropdownOption,
  PopoverPlacement,
  PopoverProps,
  PopoverTrigger,
} from 'naive-ui'
import type { CommonButtonProps } from '../types'

export type DropdownButtonOption = {
  syncFn?: () => void
  asyncFn?: () => Promise<void>
  iconClass?: string
} & DropdownOption

export type DropdownButtonProps = {
  // dropdown
  options: DropdownButtonOption[]
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  width?: PopoverProps['width']
} & CommonButtonProps
