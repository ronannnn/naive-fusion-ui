import type {
  DropdownOption,
  PopoverPlacement,
  PopoverTrigger,
} from 'naive-ui'
import type { CommonButtonProps } from '../types'

export type DropdownButtonOption = {
  syncFn?: () => void
  asyncFn?: () => Promise<void>
} & DropdownOption

export type DropdownButtonProps = {
  // dropdown
  dropdownButtonOptions: DropdownButtonOption[]
  dropdownPlacement?: PopoverPlacement
  trigger?: PopoverTrigger
} & CommonButtonProps
