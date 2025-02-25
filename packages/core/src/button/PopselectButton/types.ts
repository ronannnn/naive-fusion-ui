import type {
  PopoverPlacement,
  PopoverTrigger,
  PopselectProps,
  SelectOption,
} from 'naive-ui'
import type { CommonButtonProps } from '../types'

export type PopselectButtonProps = {
  // popselect
  options: SelectOption[]
  onUpdateValue?: PopselectProps['onUpdateValue']
  renderLabel?: PopselectProps['renderLabel']
  width?: PopselectProps['width']
  popselectPlacement?: PopoverPlacement
  trigger?: PopoverTrigger
  // others
  searchable?: boolean
  searchInputPlaceholder?: string
} & CommonButtonProps
