<script lang="ts" setup>
import type { WhereQueryItem } from '@/shared'
import type { SelectInst } from 'naive-ui'
import type { TableWhereQueryItemProps } from '../types'
import type { TableWhereQuerySelectProps } from './types'
import { NButton, NSelect } from 'naive-ui'
import { computed, ref, watch } from 'vue'

const props = defineProps<TableWhereQuerySelectProps & TableWhereQueryItemProps>()

const whereQueryItem = defineModel<WhereQueryItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'in' }
    }
  },
  { immediate: true },
)

const show = ref(false)
const focused = ref(false)

const queryValue = computed<(string | number)[]>({
  get() {
    return whereQueryItem.value.value ?? []
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})

// set fn
function selectAll() {
  queryValue.value = props.options?.map(option => option.value ?? '') ?? []
}
function selectNone() {
  queryValue.value = []
}
function selectReverse() {
  const reverseSet = new Set(props.options?.map(option => option.value ?? ''))
  queryValue.value.forEach(val => reverseSet.delete(val))
  queryValue.value = Array.from(reverseSet)
}

const selectRef = ref<SelectInst | null>(null)
const isEmptyValue = computed(() => queryValue.value.length === 0)
defineExpose({
  focus: () => selectRef.value?.focus(),
  focused,
  isEmptyValue,
})
</script>

<template>
  <NSelect
    ref="selectRef"
    v-model:value="queryValue"
    v-model:show="show"
    :size="size"
    :placeholder="label"
    :options="options"
    :disabled="disabled"
    :multiple="multiple"
    max-tag-count="responsive"
    filterable
    show-on-focus
    clearable
    @focus="focused = true"
    @blur="focused = false"
  >
    <template v-if="showFooter" #action>
      <div flex-center gap-1 p-1>
        <NButton size="small" @click="selectAll">
          全选
        </NButton>
        <NButton size="small" @click="selectNone">
          重置
        </NButton>
        <NButton size="small" @click="selectReverse">
          反选
        </NButton>
        <NButton size="small" @click="show = false">
          确认
        </NButton>
      </div>
    </template>
  </NSelect>
</template>
