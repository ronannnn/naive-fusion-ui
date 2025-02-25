<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import type { TableWhereQueryItemProps } from '../types'
import type { TableWhereQueryInputProps } from './types'
import { isEmptyString, type WhereQueryItem } from '@/shared'
import { NInput } from 'naive-ui'
import { computed, ref, watch } from 'vue'

const props = defineProps<TableWhereQueryInputProps & TableWhereQueryItemProps>()
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
const queryValue = computed<string>({
  get() {
    return whereQueryItem.value.value
  },
  set(newValue) {
    whereQueryItem.value = { ...whereQueryItem.value, value: newValue }
  },
})

const focused = ref(false)
const inputRef = ref<InputInst | null>(null)
const isEmptyValue = computed(() => isEmptyString(queryValue.value.length))
defineExpose({
  focus: () => inputRef.value?.focus(),
  focused,
  isEmptyValue,
})
</script>

<template>
  <NInput
    ref="inputRef"
    v-model:value="queryValue"
    :size="size"
    placeholder=""
    clearable
    :disabled="disabled"
    @focus="focused = true"
    @blur="focused = false"
  >
    <template #suffix>
      <div class="iconify tabler--edit" />
    </template>
  </NInput>
</template>
