<script setup lang="ts">
import type { SelectInst, SelectOption, SelectProps } from 'naive-ui'
import type { AsyncSelectProps } from './types'
import { isEmptyString, useQuerying, type WhereQuery, type WhereQueryItem } from '@/shared'
import { useDebounceFn } from '@vueuse/core'
import { NSelect } from 'naive-ui'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<AsyncSelectProps<any>>(), {
  valueField: 'id',
  extraOrderQuery: () => [{ field: 'createdAt', order: 'desc' }],
  size: 'small',
  queryDebounceDelay: 512,
})
const value = defineModel<any>('value')

const selectRef = ref<SelectInst | null>(null)

const { querying, startQuerying, endQuerying } = useQuerying()
const queriedData = ref<any[]>([])
const allData = computed(() => {
  const newQueriedData = [...queriedData.value]
  if (props.initModel) {
    if (Array.isArray(props.initModel)) {
      // initModel如果在newQueriedData中的存在则不添加，否则添加到最前面
      props.initModel.forEach((item) => {
        const initModelIndex = newQueriedData.findIndex(p => p[props.valueField] === item[props.valueField])
        if (initModelIndex === -1) {
          newQueriedData.unshift(item)
        }
      })
    }
    else {
      const initModelIndex = newQueriedData.findIndex(p => props.initModel && p[props.valueField] === props.initModel[props.valueField])
      if (initModelIndex !== -1) {
        newQueriedData.splice(initModelIndex, 1)
      }
      newQueriedData.unshift(props.initModel)
    }
  }
  return newQueriedData
})
const allOptions = computed(() => allData.value
  .map(p => ({ label: p[props.labelField], value: p[props.valueField] }))
  .filter(p => p.label && p.value),
)
const selected = ref(false)
const focused = ref(false)
async function handleQuery(queryStr: string) {
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
    if (!isEmptyString(queryStr)) {
      const queryItems: WhereQueryItem<any>[] = []
      props.queryFields.forEach((field) => {
        queryItems.push({ ...field, value: queryStr })
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
    }
  }
  finally {
    endQuerying()
  }
}
const debouncedQueryFn = useDebounceFn(handleQuery, props.queryDebounceDelay)
function onSelect(newVal: any) {
  selected.value = true
  value.value = newVal
  if (!props.triggerAfterSelected) {
    return
  }

  let triggerredData: any
  if (Array.isArray(newVal)) {
    triggerredData = []
    newVal.forEach((val) => {
      const foundItem = allData.value.find(p => p[props.valueField] === val)
      if (foundItem) {
        triggerredData.push(foundItem)
      }
    })
  }
  else {
    triggerredData = allData.value.find(p => p[props.valueField] === newVal)
    if (!triggerredData) {
      return
    }
  }
  props.triggerAfterSelected(triggerredData)
}
const renderLabel: SelectProps['renderLabel'] = (option: SelectOption) => {
  const foundModel = allData.value.find(p => p[props.valueField] === option.value)
  if (!foundModel) {
    return option.label as string
  }
  return props.renderOptionFromData ? props.renderOptionFromData(foundModel) : option.label as string
}

defineExpose({ focus: () => selectRef.value?.focus() })
</script>

<template>
  <NSelect
    ref="selectRef"
    :value="value"
    :placeholder="placeholder"
    :options="allOptions"
    :loading="querying || loading"
    :render-label="renderLabel"

    max-tag-count="responsive"
    clearable
    filterable
    remote
    show-on-focus
    :size="size"
    :multiple="multiple"
    :disabled="disabled"
    @update:value="onSelect"
    @search="debouncedQueryFn"
    @select="onSelect"
    @focus="async () => {
      focused = true
      await handleQuery('')
    }"
    @clear="() => {
      queriedData = []
      value = null
    }"
    @blur="focused = false"
  >
    <template v-if="empty" #empty>
      <component :is="empty" />
    </template>
  </NSelect>
</template>
