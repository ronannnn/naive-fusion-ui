<script lang="ts" setup>
import type { WhereQueryItem } from '@/shared'
import type { TableWhereQueryAsyncAutoCompleteProps } from './types'
import { FAsyncAutoComplete, isEmptyString, type TableWhereQueryItemProps } from '@/index'
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<TableWhereQueryAsyncAutoCompleteProps<any> & TableWhereQueryItemProps>(), {
  prefixIconClass: 'tabler--edit',
})

const whereQueryItem = defineModel<WhereQueryItem<any>>('whereQueryItem', { required: true })
watch(
  () => whereQueryItem.value,
  () => {
    if (!whereQueryItem.value.opr) {
      whereQueryItem.value = { ...whereQueryItem.value, opr: props.opr ?? 'like' }
    }
  },
  { immediate: true },
)

const queryValue = computed<string | null | undefined>({
  get() {
    return whereQueryItem.value.value
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})

const acRef = ref<InstanceType<typeof FAsyncAutoComplete>>()
const isEmptyValue = computed(() => isEmptyString(queryValue.value))
defineExpose({
  focus: () => acRef.value?.focus(),
  focused: acRef.value?.focused,
  isEmptyValue,
})
</script>

<template>
  <FAsyncAutoComplete
    ref="acRef"
    v-bind="props"
    v-model:value="queryValue"
    placeholder=""
  />
</template>
