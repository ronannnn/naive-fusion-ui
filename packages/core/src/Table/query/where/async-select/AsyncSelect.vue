<script lang="ts" setup>
import type { WhereQueryItem } from '@/shared'
import type { TableWhereQueryAsyncSelectProps } from './types'
import { FAsyncSelect, type TableWhereQueryItemProps } from '@/index'
import { computed, ref, watch } from 'vue'

const props = defineProps<TableWhereQueryAsyncSelectProps<any> & TableWhereQueryItemProps>()

const whereQueryItemSupData = defineModel<any>('whereQueryItemSupData', { required: true })
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

const queryValue = computed<(string | number)[]>({
  get() {
    return whereQueryItem.value.value ?? []
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})

const selectRef = ref<InstanceType<typeof FAsyncSelect>>()
const isEmptyValue = computed(() => queryValue.value.length === 0)
defineExpose({
  focus: () => selectRef.value?.focus(),
  focused: selectRef.value?.focused,
  isEmptyValue,
})
</script>

<template>
  <FAsyncSelect
    ref="selectRef"
    v-bind="props"
    v-model:value="queryValue"
    v-model:init-model="whereQueryItemSupData"
    placeholder=""
  />
</template>
