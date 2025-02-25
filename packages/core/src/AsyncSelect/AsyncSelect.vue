<script setup lang="ts" generic="T extends { id: number }">
import type { SelectInst, SelectOption, SelectProps } from 'naive-ui'
import type { AsyncSelectProps } from './types'
import { isEmptyString, useQuerying, type WhereQuery, type WhereQueryItem } from '@/shared'
import { useDebounceFn } from '@vueuse/core'
import { NSelect } from 'naive-ui'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<AsyncSelectProps<T>>(), {
  valueField: 'id',
  orderQuery: () => [{ field: 'createdAt', order: 'desc' }],
  size: 'small',
  queryDebounceDelay: 512,
})
const value = defineModel<any>('value')

const selectRef = ref<SelectInst | null>(null)

const { querying, startQuerying, endQuerying } = useQuerying()
const searchedData = ref<any[]>([])
const allData = computed(() => {
  const newSearchedData = [...searchedData.value]
  if (props.initModel) {
    if (Array.isArray(props.initModel)) {
      // initModel如果在newSearchedData中的存在则不添加，否则添加到最前面
      props.initModel.forEach((item) => {
        const initModelIndex = newSearchedData.findIndex(p => p[props.valueField] === item[props.valueField])
        if (initModelIndex === -1) {
          newSearchedData.unshift(item)
        }
      })
    }
    else {
      const initModelIndex = newSearchedData.findIndex(p => props.initModel && p[props.valueField as keyof T] === props.initModel[props.valueField as keyof T])
      if (initModelIndex !== -1) {
        newSearchedData.splice(initModelIndex, 1)
      }
      newSearchedData.unshift(props.initModel)
    }
  }
  return newSearchedData
})
const allOptions = computed(() => allData.value
  .map(p => ({ label: p[props.labelField], value: p[props.valueField] }))
  .filter(p => p.label && p.value),
)
const selected = ref(false)
const focused = ref(false)
async function handleSearch(searchStr: string) {
  if (!props.queryFn) {
    console.error('searchFn is required')
    return
  }
  // if blur, do not search
  if (!focused.value) {
    return
  }
  // if selected, do not search
  if (selected.value) {
    selected.value = false
    return
  }
  startQuerying()
  try {
    const whereQuery: WhereQuery<T> = props.extraWhereQuery ?? []
    if (!isEmptyString(searchStr)) {
      const queryItems: WhereQueryItem<T>[] = []
      props.queryFields.forEach((field) => {
        queryItems.push({ ...field, value: searchStr })
      })
      whereQuery.push({ andOr: 'and', items: queryItems })
    }
    const result = await props.queryFn({
      pagination: { pageNum: 1, pageSize: 10 },
      orderQuery: props.extraOrderQuery,
      whereQuery,
    })
    if (result.data) {
      searchedData.value = result.data.list
    }
  }
  finally {
    endQuerying()
  }
}
const debouncedSearchFn = useDebounceFn(handleSearch, props.queryDebounceDelay)
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
    @search="debouncedSearchFn"
    @select="onSelect"
    @focus="async () => {
      focused = true
      await handleSearch('')
    }"
    @clear="() => {
      searchedData = []
      value = null
    }"
    @blur="focused = false"
  />
</template>
