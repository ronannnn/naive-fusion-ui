<script setup lang="ts">
import type { HeaderOperationsProps } from './types'
import { FPopconfirmButton, FTableColumnSettings, FTableOrderQuery, FTooltipButton } from '@/index'
import { NBadge } from 'naive-ui'
import { computed, h } from 'vue'

const props = withDefaults(defineProps<HeaderOperationsProps<any>>(), {
  displayOrder: () => ['create', 'whereQuery', 'orderQuery', 'refresh', 'exportExcel', 'columnSettings', 'batchDelete'],
})

const oprButtons = computed(() => {
  return h('div', { class: 'flex-y-center gap-3 flex-wrap' }, props.displayOrder.map((opr) => {
    switch (opr) {
      case 'create':
        if (props.disableCreate || !props.onCreate)
          return null
        return h(FTooltipButton, {
          type: 'primary',
          size: 'small',
          ghost: true,
          iconClass: 'tabler--plus',
          onSyncClick: props.onCreate,
        }, { default: () => '新增' })
      case 'whereQuery':
        if (props.disableWhereQuery)
          return null
        return h(NBadge, {
          dot: true,
          show: !props.isWhereQueryEmpty,
          offset: [-2, 2],
        }, {
          default: () => !props.disableWhereQuery && h(FTooltipButton, {
            type: props.whereQueryOpen ? 'primary' : undefined,
            size: 'small',
            ghost: true,
            iconClass: 'tabler--search',
            onSyncClick: () => {
              props.onUpdateWhereQueryOpen?.(!props.whereQueryOpen)
            },
          }, { default: () => '查询' }),
        })
      case 'orderQuery':
        if (props.disableOrderQuery)
          return null
        return h(NBadge, {
          dot: true,
          show: !props.isOrderQueryEmpty,
          offset: [-2, 2],
        }, {
          default: () => !props.disableOrderQuery && h(FTableOrderQuery, {
            defaultOrderQuery: props.defaultOrderQuery,
            orderOptions: props.orderOptions,
            orderQuery: props.orderQuery,
            onUpdateOrderQuery: props.onUpdateOrderQuery,
            loading: props.loading,
            triggerQuery: props.triggerQuery,
            size: props.size,
          }),
        })
      case 'refresh':
        if (props.disableRefresh)
          return null
        return h(FTooltipButton, {
          size: 'small',
          loading: props.loading,
          iconClass: 'tabler--reload',
          onAsyncClick: props.onFetchData,
        }, { default: () => '刷新' })
      case 'exportExcel':
        if (props.disableExportExcel || !props.onExportExcel)
          return null
        return h(FTooltipButton, {
          size: 'small',
          ghost: true,
          iconClass: 'mdi--microsoft-excel',
          onAsyncClick: props.onExportExcel,
        }, { default: () => '导出' })
      case 'columnSettings':
        if (props.disableColumnSettings)
          return null
        return props.columns && props.columns.length > 0 && props.onUpdateColumns && h(FTableColumnSettings, {
          stgCols: props.initStorageColumns ?? [],
          cols: props.columns,
          tblName: props.name,
          onUpdateColumns: cols => props.onUpdateColumns?.(cols),
        })
      case 'batchDelete':
        if (props.disableBatchDelete || !props.onBatchDelete)
          return null
        return props.checkedRowKeys && props.checkedRowKeys.length !== 0 && h(FPopconfirmButton, {
          type: 'error',
          size: 'small',
          ghost: true,
          iconClass: 'tabler--trash',
          disabled: props.checkedRowKeys.length === 0,
          onAsyncConfirm: async () => await props.onBatchDelete?.(props.checkedRowKeys as number[]),
        }, { default: () => '批量删除' })
      default:
        return null
    }
  }).concat(props.extraButtons))
})
</script>

<template>
  <div class="flex-y-center">
    <component :is="oprButtons" />
  </div>
</template>
