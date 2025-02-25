<script setup lang="ts">
import type { SelectRenderLabel } from 'naive-ui'
import type { TableOrderQueryNewerProps } from './types'
import { FPopselectButton } from '@/index'
import { computed, h } from 'vue'

const props = defineProps<TableOrderQueryNewerProps<any>>()
const emit = defineEmits<{
  new: [string]
}>()

const unselectedOptions = computed(() => props.unselectedFields.map(field => ({
  label: props.orderOptions.find(option => option.field === field)?.label ?? field,
  value: field,
})))
const renderLabel: SelectRenderLabel = (option) => {
  return h('div', { class: 'flex items-center' }, [
    h('div', { class: 'tabler--arrows-down-up' }),
    h('span', { class: 'ml-2' }, option.label as string),
  ])
}
</script>

<template>
  <FPopselectButton
    class="flex-1"
    :options="unselectedOptions"
    :render-label="renderLabel"
    dashed
    size="small"
    icon-class="tabler--plus"
    @update-value="newField => emit('new', newField)"
  >
    新增排序
  </FPopselectButton>
</template>
