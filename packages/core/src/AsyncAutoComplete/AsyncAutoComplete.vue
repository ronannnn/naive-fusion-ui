<script setup lang="ts">
import type { AutoCompleteOption, AutoCompleteProps, SelectOption } from 'naive-ui'
import type { AsyncAutoCompleteProps } from './types'
import { isEmptyString, useQuerying, type WhereQuery, type WhereQueryItem } from '@/shared'
import { useDebounceFn } from '@vueuse/core'
import { NAutoComplete } from 'naive-ui'
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<AsyncAutoCompleteProps<any>>(), {
  valueField: 'id',
  extraOrderQuery: () => [{ field: 'createdAt', order: 'desc' }],
  size: 'small',
  queryDebounceDelay: 512,
})
const value = defineModel<string | null>('value')

const { querying, startQuerying, endQuerying } = useQuerying()
const queriedData = ref<any[]>([])
const queriedOptions = ref<AutoCompleteOption[]>([])
const selected = ref(false)
const focused = ref(false)
async function handleQuery() {
  if (!props.queryFn) {
    console.error('queryFn is required')
    return
  }
  // if blur, do not query
  if (!focused.value) {
    return
  }
  // if selected, do not query
  if (selected.value) {
    selected.value = false
    return
  }
  startQuerying()
  try {
    const whereQuery: WhereQuery<any> = props.extraWhereQuery ?? []
    if (!isEmptyString(value.value)) {
      const queryItems: WhereQueryItem<any>[] = []
      props.queryFields.forEach((field) => {
        queryItems.push({ ...field, value: value.value })
      })
      whereQuery.push({ andOr: 'and', items: queryItems })
    }
    const result = await props.queryFn({
      pagination: { pageNum: 1, pageSize: 10 },
      orderQuery: props.extraOrderQuery,
      whereQuery,
      selectQuery: props.distinct ? props.queryFields.map(queryField => ({ field: queryField.field, distinct: true })) : undefined,
      skipCount: props.distinct,
    })
    if (result.data) {
      queriedData.value = result.data.list
      queriedOptions.value = result.data.list
        .map(item => ({ label: item[props.labelField], value: item[props.valueField] }))
    }
  }
  finally {
    endQuerying()
  }
}
const debouncedQueryFn = useDebounceFn(handleQuery, 512)
watch(
  () => value.value,
  () => {
    debouncedQueryFn()
  },
)
function onSelect(newVal: string) {
  selected.value = true
  const foundModel = queriedData.value.find(p => p[props.valueField] === newVal)
  if (!foundModel) {
    return
  }
  props.triggerAfterSelected?.(foundModel)
  value.value = foundModel[props.valueField]
}
const renderLabel: AutoCompleteProps['renderLabel'] = (option: SelectOption) => {
  const foundModel = queriedData.value.find(p => p[props.valueField] === option.value)
  if (!foundModel) {
    return option.label as string
  }
  return props.renderOptionFromData ? props.renderOptionFromData(foundModel) : option.label as string
}
</script>

<template>
  <NAutoComplete
    :value="value ?? undefined"
    :size="size"
    :options="queriedOptions"
    :loading="querying"
    :input-props="{
      autocomplete: 'disabled',
    }"
    show-empty
    :get-show="() => true"
    :placeholder="placeholder"
    :render-label="renderLabel"
    clearable
    @select="onSelect"
    @focus="async () => {
      focused = true
      await handleQuery()
    }"
    @blur="focused = false"
    @update:value="value = $event"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
    <template v-if="empty" #empty>
      <component :is="empty" />
    </template>
  </NAutoComplete>
</template>
