import type { AsyncSelectProps } from '@/AsyncSelect'

export interface AsyncAutoCompleteProps<T> extends AsyncSelectProps<T> {
  prefixIconClass?: string
  suffixIconClass?: string
}
