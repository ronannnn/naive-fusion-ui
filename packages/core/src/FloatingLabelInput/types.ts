import type { NaiveUISize } from '@/shared'
import type { InputProps } from 'naive-ui'

export interface FloatingLabelInputProps {
  allowInput?: InputProps['allowInput']
  autosize?: InputProps['autosize']
  clearable?: InputProps['clearable']
  countGraphemes?: InputProps['countGraphemes']
  disabled?: InputProps['disabled']
  loading?: InputProps['loading']
  maxlength?: InputProps['maxlength']
  minlength?: InputProps['minlength']
  placeholder?: InputProps['placeholder']
  readonly?: InputProps['readonly']
  round?: InputProps['round']
  size?: NaiveUISize
  value?: InputProps['value']
  onChange?: InputProps['onChange']
  onClear?: InputProps['onClear']
  onInput?: InputProps['onInput']
  onUpdateValue?: InputProps['onUpdate:value']

  prefixIconClass?: string
  suffixIconClass?: string
}
