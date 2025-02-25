<script setup lang="ts">
import type { OrderQueryType } from '@/shared'
import type { TableOrderQueryItemProps } from './types'
import { FTooltipButton } from '@/index'
import { NButton, NSelect } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<TableOrderQueryItemProps<any>>()
const emit = defineEmits<{
  change: [string, OrderQueryType]
  remove: []
}>()

const selectedValue = computed({
  get() {
    return props.field
  },
  set(newField) {
    emit('change', newField, props.orderType)
  },
})
const unselectedOptions = computed(() => [props.field].concat(props.unselectedFields).map(field => ({
  label: props.orderOptions.find(option => option.field === field)?.label ?? field,
  value: field,
})))

function onToggleOrderType() {
  emit('change', props.field, props.orderType === 'asc' ? 'desc' : 'asc')
}
</script>

<template>
  <div class="flex-y-center gap-3">
    <div class="order-query-handle cursor-move">
      <div class="iconify tabler--drag-drop text-4 text-gray-500" />
    </div>
    <NSelect
      v-model:value="selectedValue"
      :size="size"
      :options="unselectedOptions"
      :consistent-menu-width="false"
    />
    <NButton :size="size" @click="onToggleOrderType">
      <template #icon>
        <div v-if="props.orderType === 'asc'" class="iconify tabler--sort-ascending" />
        <div v-else class="iconify tabler--sort-descending" />
      </template>
      {{ props.orderType === 'asc' ? '升序' : '降序' }}
    </NButton>
    <FTooltipButton
      class="ml-auto text-gray-500"
      text
      :size="size"
      tooltip-content="删除该排序规则"
      icon-class="tabler--x"
      :keep-alive-on-hover="false"
      @sync-click="emit('remove')"
    />
  </div>
</template>
