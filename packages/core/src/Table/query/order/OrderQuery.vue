<script setup lang="ts">
import type { OrderQuery, OrderQueryType } from '@/shared'
import type { PopoverInst } from 'naive-ui'
import type { TableOrderQueryProps } from './types'
import { FDnd } from '@/index'
import { NButton, NPopover } from 'naive-ui'
import { computed, ref } from 'vue'
import { FTableOrderQueryItem, FTableOrderQueryNewer } from '.'

const props = defineProps<TableOrderQueryProps<any>>()

const popoverRef = ref<PopoverInst | null>(null)

function onTriggerQuery() {
  popoverRef.value?.setShow(false)
  props.triggerQuery()
}

const unselectedOrderFields = computed(() => {
  const selectedFields = props.orderQuery.map(query => query.field)
  return props.orderOptions.filter(option => !selectedFields.includes(option.field)).map(option => option.field as string)
})

function onNewField(field: string) {
  props.onUpdateOrderQuery([...props.orderQuery, { field, order: 'desc' }])
}
function onChangeField(oldField: string, newField: string, orderType: OrderQueryType) {
  const oldIdx = props.orderQuery.findIndex(query => query.field === oldField)
  if (oldIdx !== -1) {
    props.onUpdateOrderQuery(
      props.orderQuery.map((query, idx) => (idx === oldIdx ? { field: newField, order: orderType } : query)),
    )
  }
  else {
    props.onUpdateOrderQuery([...props.orderQuery, { field: newField, order: orderType }])
  }
}
function onRemoveField(field: string) {
  props.onUpdateOrderQuery(props.orderQuery.filter(query => query.field !== field))
}

// drag related
const dragOrderQuery = computed<OrderQuery<any>>({
  get() {
    return props.orderQuery
  },
  set(newOrderQuery) {
    props.onUpdateOrderQuery(newOrderQuery)
  },
})
</script>

<template>
  <NPopover ref="popoverRef" trigger="click" placement="bottom">
    <template #trigger>
      <NButton :size="size">
        <template #icon>
          <div class="iconify tabler--arrows-down-up" />
        </template>
        排序
      </NButton>
    </template>
    <div class="flex-vertical gap-2">
      <!-- items -->
      <FDnd v-model="dragOrderQuery" handle=".order-query-handle" dnd-class="flex-vertical gap-2">
        <FTableOrderQueryItem
          v-for="item in dragOrderQuery"
          :key="item.field"
          :field="item.field as string"
          :order-type="item.order"
          :order-options="orderOptions"
          :unselected-fields="unselectedOrderFields"
          :size="size"
          @change="(newField, orderType) => onChangeField(item.field as string, newField, orderType)"
          @remove="onRemoveField(item.field as string)"
        />
      </FDnd>
      <div class="flex-y-center gap-2 border-t border-slate-100 border-dashed pt-2">
        <FTableOrderQueryNewer
          :order-options="orderOptions"
          :unselected-fields="unselectedOrderFields"
          :size="size"
          @new="onNewField"
        />
        <NButton :size="size" type="primary" :loading="loading" @click="onTriggerQuery">
          查询
        </NButton>
        <NButton :size="size" :disabled="loading" @click="() => onUpdateOrderQuery(defaultOrderQuery ?? [])">
          重置
        </NButton>
      </div>
    </div>
  </NPopover>
</template>
