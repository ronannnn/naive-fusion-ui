<script setup lang="ts">
import type { NaiveUiSize, WhereQuery, WhereQueryItem, WhereQueryOpr } from '@/shared'
import type { WhereQueryOption } from './types'
import { type DropdownButtonOption, FDropdownButton } from '@/button'
import { FFloatingLabel } from '@/FloatingLabel'
import { cloneJson } from '@/shared'
import { NInputGroup } from 'naive-ui'
import { computed, h, ref } from 'vue'
import {
  FTableWhereQueryAsyncAutoComplete,
  FTableWhereQueryAsyncSelect,
  FTableWhereQueryDatePicker,
  FTableWhereQueryDateRangePicker,
  FTableWhereQueryInput,
  FTableWhereQuerySelect,
} from '.'

const props = withDefaults(defineProps<{
  options: WhereQueryOption<any>[]
  field: string
  triggerQuery: () => void
  onRemove?: (field: string) => void
  loading?: boolean
  size?: NaiveUiSize
}>(), {
  size: 'medium',
})
const whereQuery = defineModel<WhereQuery<any>>('query', { required: true })
const supData = defineModel<Record<string, any>>('supData', { required: true })

const option = computed<WhereQueryOption<any>>(() => props.options.find(option => option.field === props.field) ?? { field: '', label: '', type: 'unknown' })
const whereQueryItem = computed<WhereQueryItem<any>>({
  get() {
    // TODO:
    const foundOption = props.options.find(option => option.field === props.field)
    let opr: WhereQueryOpr = null
    if (foundOption) {
      opr = foundOption.opr ?? null
    }
    for (const query of whereQuery.value) {
      for (const item of query.items ?? []) {
        if (item.field === props.field) {
          return item
        }
      }
    }
    return { field: props.field, opr, value: null } as any
  },
  set(newValue) {
    // TODO:
    // const index = whereQuery.value.findIndex(query => query.field === props.field)
    // if (index !== -1) {
    //   const newQuery = [...whereQuery.value]
    //   newQuery[index] = newValue
    //   whereQuery.value = newQuery
    // }
    // else {
    //   whereQuery.value = [...whereQuery.value, newValue]
    // }
    whereQuery.value = [...whereQuery.value, newValue]
  },
})
const whereQueryItemSupData = computed({
  get() {
    return supData.value[props.field] ?? null
  },
  set(newValue) {
    const newSupData = cloneJson(supData.value)
    newSupData[props.field] = newValue
    supData.value = newSupData
  },
})
const dropdownOptions = computed<DropdownButtonOption[]>(() => [
  {
    label: () => h('span', { style: { color: 'red' } }, '删除该查询条件'),
    key: 'delete',
    icon: () => h('div', { class: 'iconify tabler--trash text-red-500' }),
    syncFn: () => props.onRemove?.(props.field as string),
  },
])

const itemRef = ref()
function focus() {
  itemRef.value?.focus()
}
defineExpose({ focus })
</script>

<template>
  <div class="relative">
    <!-- 查询组件 -->
    <NInputGroup>
      <FTableWhereQueryInput
        v-if="option.type === 'input'"
        ref="itemRef"
        v-bind="option"
        v-model:where-query-item="whereQueryItem"
        :disabled="loading"
        :size="size"
      />
      <FTableWhereQuerySelect
        v-else-if="option.type === 'select'"
        ref="itemRef"
        v-bind="option"
        v-model:where-query-item="whereQueryItem"
        :disabled="loading"
        :size="size"
      />
      <FTableWhereQueryAsyncSelect
        v-else-if="option.type === 'asyncSelect'"
        ref="itemRef"
        v-bind="option"
        v-model:where-query-item="whereQueryItem"
        v-model:where-query-item-sup-data="whereQueryItemSupData"
        :label-field="option.labelField ?? 'unknown label field'"
        :disabled="loading"
        :size="size"
      />
      <FTableWhereQueryDateRangePicker
        v-else-if="option.type === 'dateRange'"
        ref="itemRef"
        v-bind="option"
        v-model:where-query-item="whereQueryItem"
        :disabled="loading"
        :size="size"
        class="col-span-1 sm:col-span-2"
      />
      <FTableWhereQueryDatePicker
        v-else-if="option.type === 'date'"
        ref="itemRef"
        v-bind="option"
        v-model:where-query-item="whereQueryItem"
        :disabled="loading"
        :size="size"
      />
      <FTableWhereQueryAsyncAutoComplete
        v-else-if="option.type === 'asyncAutoComplete'"
        ref="itemRef"
        v-bind="option"
        v-model:where-query-item="whereQueryItem"
        :label-field="option.labelField ?? 'unknown label field'"
        :disabled="loading"
        :size="size"
      />
      <div v-else>
        未知查询字段
      </div>
      <FDropdownButton
        class="where-query-handle cursor-move"
        :class="itemRef?.isEmptyValue.value ? 'text-neutral-300' : 'text-neutral-500'"
        :size="size"
        icon-class="tabler--drag-drop"
        :options="dropdownOptions"
      />
    </NInputGroup>

    <FFloatingLabel
      :placeholder="option.label"
      :focused="itemRef?.focused.value"
      :is-empty-value="itemRef?.isEmptyValue.value"
      :size="size"
    />
  </div>
</template>
