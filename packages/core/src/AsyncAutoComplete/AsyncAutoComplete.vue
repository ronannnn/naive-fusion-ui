<script setup lang="ts">
import type { AutoCompleteInst, AutoCompleteOption, AutoCompleteProps, SelectOption } from 'naive-ui'
import type { AsyncAutoCompleteProps } from './types'
import { isEmptyString, isString, useQuerying, type WhereQuery, type WhereQueryItem } from '@/shared'
import { useDebounceFn } from '@vueuse/core'
import { NAutoComplete, NEmpty } from 'naive-ui'
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<AsyncAutoCompleteProps<any>>(), {
  valueField: 'id',
  extraOrderQuery: () => [{ field: 'createdAt', order: 'desc' }],
  size: 'small',
  queryDebounceDelay: 512,
  empty: '未查询到数据，该项可自由填写',
})
const value = defineModel<string | null>('value')

const acRef = ref<AutoCompleteInst | null>(null)

const { querying, startQuerying, endQuerying } = useQuerying()
const queriedData = ref<any[]>([])
const queriedOptions = ref<AutoCompleteOption[]>([])
const focused = ref(false)
const prevSelectedVal = ref<string | null>(null)
async function handleQuery() {
  if (!props.queryFn) {
    console.error('queryFn is required')
    return
  }
  // if blur, do not query
  if (!focused.value) {
    return
  }
  // 如果本次查询的值和上次选择的值相同，则不再查询
  if (prevSelectedVal.value === value.value) {
    return
  }
  startQuerying()
  try {
    const whereQuery: WhereQuery<any> = props.extraWhereQuery ?? []
    if (!isEmptyString(value.value)) {
      const queryItems: WhereQueryItem<any>[] = []
      props.queryFields?.forEach((field) => {
        queryItems.push({ ...field, value: value.value })
      })
      whereQuery.push({ andOr: 'and', items: queryItems })
    }
    const result = await props.queryFn({
      pagination: { pageNum: 1, pageSize: 10 },
      orderQuery: props.extraOrderQuery,
      whereQuery,
      selectQuery: props.distinct ? props.queryFields?.map(queryField => ({ field: queryField.field, distinct: true })) : undefined,
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
    // 第一次查询并选择，第二次录入1个字符查询后，再删去这个字符，会导致查询结果不一致
    // 因此只要有查询，就重置prevSelectedVal
    prevSelectedVal.value = null
  }
}
const debouncedQueryFn = useDebounceFn(handleQuery, 512)
watch(
  () => value.value,
  () => {
    debouncedQueryFn()
  },
)
function onSelect(newValueFieldVal: any) {
  const foundModel = queriedData.value.find(p => p[props.valueField] === newValueFieldVal)
  if (!foundModel) {
    return
  }
  props.triggerAfterSelected?.(foundModel)
  value.value = foundModel[props.labelField]
  prevSelectedVal.value = foundModel[props.labelField]
}
const renderLabel: AutoCompleteProps['renderLabel'] = (option: SelectOption) => {
  const foundModel = queriedData.value.find(p => p[props.valueField] === option.value)
  if (!foundModel) {
    return option.label as string
  }
  return props.renderOptionFromData ? props.renderOptionFromData(foundModel) : option.label as string
}

defineExpose({
  focus: () => acRef.value?.focus(),
  focused,
})
</script>

<template>
  <NAutoComplete
    ref="acRef"
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
      <slot name="prefix">
        <div v-if="prefixIconClass" class="iconify" :class="prefixIconClass" />
      </slot>
    </template>
    <template #suffix>
      <slot name="suffix">
        <div v-if="suffixIconClass" class="iconify" :class="suffixIconClass" />
      </slot>
    </template>
    <template v-if="Boolean(empty)" #empty>
      <NEmpty v-if="isString(empty)">
        {{ empty }}
      </NEmpty>
      <component :is="empty" v-else />
    </template>
  </NAutoComplete>
</template>
