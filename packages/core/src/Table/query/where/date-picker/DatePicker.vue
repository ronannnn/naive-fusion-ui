<script lang="ts" setup>
import type { WhereQueryItem } from '@/shared'
import type { DatePickerInst } from 'naive-ui'
import type { TableWhereQueryDatePickerProps } from './types'
import { isEmptyString, type TableWhereQueryItemProps } from '@/index'
import dayjs from 'dayjs'
import { NDatePicker } from 'naive-ui'
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<TableWhereQueryDatePickerProps & TableWhereQueryItemProps>(), {
  ofUnit: 'day',
})
const whereQueryItem = defineModel<WhereQueryItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'eq' }
    }
  },
  { immediate: true },
)
const queryValue = computed<string | null>({
  get() {
    return whereQueryItem.value.value
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})
const formattedValue = computed<number | null>({
  get() {
    if (queryValue.value) {
      return dayjs(queryValue.value).startOf(props.ofUnit).valueOf()
    }
    return null
  },
  set(newValue) {
    if (newValue) {
      queryValue.value = dayjs(newValue).startOf(props.ofUnit).format(props.format)
    }
    else {
      queryValue.value = null
    }
  },
})

const datePickerFocus = ref(false)

const datePickerRef = ref<DatePickerInst | null>(null)
const isEmptyValue = computed(() => isEmptyString(queryValue))
defineExpose({
  focus: () => datePickerRef.value?.focus(),
  focused: datePickerFocus,
  isEmptyValue,
})
</script>

<template>
  <NDatePicker
    ref="datePickerRef"
    v-model:value="formattedValue"
    class="flex-1"
    :first-day-of-week="0"
    clearable
    :size="size"
    close-on-select
    placeholder=""
    :shortcuts="shortcuts"
    :disabled="disabled"
    @focus="datePickerFocus = true"
    @blur="datePickerFocus = false"
  />
</template>
