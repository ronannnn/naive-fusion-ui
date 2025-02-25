<script lang="ts" setup>
import type { RangeQuery, WhereQueryItem } from '@/shared'
import type { DatePickerInst } from 'naive-ui'
import type { TableWhereQueryDateRangePickerProps } from './types'
import { isEmptyString, type TableWhereQueryItemProps } from '@/index'
import dayjs from 'dayjs'
import { NDatePicker } from 'naive-ui'
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<TableWhereQueryDateRangePickerProps & TableWhereQueryItemProps>(), {
  ofUnit: 'day',
})
const whereQueryItem = defineModel<WhereQueryItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'range' }
    }
  },
  { immediate: true },
)
const queryValue = computed<RangeQuery | null>({
  get() {
    return whereQueryItem.value.value
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})
const formattedValue = computed<[number, number] | null>({
  get() {
    if (queryValue.value)
      return [dayjs(queryValue.value.start).startOf(props.ofUnit).valueOf(), dayjs(queryValue.value.end).endOf(props.ofUnit).valueOf()]

    return null
  },
  set(newValue) {
    if (newValue && Array.isArray(newValue)) {
      queryValue.value = {
        start: dayjs(newValue[0]).startOf(props.ofUnit).format(props.format),
        end: dayjs(newValue[1]).endOf(props.ofUnit).format(props.format),
      }
    }
    else {
      queryValue.value = null
    }
  },
})
const datePickerFocus = ref(false)

const datePickerRef = ref<DatePickerInst | null>(null)
const isEmptyValue = computed(() => isEmptyString(queryValue) || (queryValue.value?.start === null && queryValue.value.end === null))
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
    type="daterange"
    clearable
    :size="size"
    close-on-select
    start-placeholder=""
    end-placeholder=""
    :shortcuts="shortcuts"
    :disabled="disabled"
    @focus="datePickerFocus = true"
    @blur="datePickerFocus = false"
  />
</template>
