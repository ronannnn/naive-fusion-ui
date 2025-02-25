<script setup lang="ts">
import type { Column, StorageColumn, StorageTableSetting } from '../types'
import type { ColumnSettingsProps } from './types'
import { type DndProps, FDnd, FTooltipButton } from '@/index'
import { useLocalStorage } from '@vueuse/core'
import { NButton, NPopover } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'
import { FTableColumnSettingsItem } from '.'

export type FixType = 'left' | 'right' | 'unfixed'

const props = defineProps<ColumnSettingsProps<any>>()
const emit = defineEmits<{
  updateColumns: [Column<any>[]]
}>()

// 在修改列是否显示的时候，props.columns会消失，导致找不到列名，因此在这里复制一份
const clonedCols = ref(props.cols)
const localTblSettings = useLocalStorage<StorageTableSetting<any>>(`${props.tblName}-tbl-settings`, {})
function onUpdateColumns(stgCols: StorageColumn[]) {
  // update parent columns
  // 先根据stgCols的key进行排序
  const newColumns = [...clonedCols.value]
  const orderMap = new Map(stgCols.map((item, index) => [item.key, index]))
  newColumns.sort((a, b) => (orderMap.get(a.key as string) ?? 0) - (orderMap.get(b.key as string) ?? 0))
  // 再填充stgCols里面的内容
  emit('updateColumns', newColumns
    .map((col) => {
      const localCol = stgCols.find(obj => obj.key === col.key)
      return {
        ...col,
        checked: localCol?.checked ?? true,
        width: localCol?.width ?? col.width,
        fixed: localCol ? (localCol.fixed === 'unfixed' ? undefined : localCol.fixed) : undefined,
      }
    })
    .filter(col => col.checked))
}
function onUpdateColumnsAndStgColumns(stgCols: StorageColumn[]) {
  localTblSettings.value = {
    ...localTblSettings.value,
    columns: stgCols,
  }
  onUpdateColumns(stgCols)
}
function initFixTypeList(fixType: FixType): StorageColumn[] {
  // init from parent columns and local columns
  const localColumns = localTblSettings.value.columns ?? []
  if (localColumns.length === 0) {
    // 如果local storage中没有数据，说明是第一次打开，返回所有列，返回到unfixed list中
    return fixType === 'unfixed'
      ? clonedCols.value.map(col => ({ key: col.key as string, fixed: 'unfixed' }))
      : []
  }

  const list: StorageColumn[] = []
  localColumns.forEach((localCol) => {
    if (localCol.fixed !== fixType) {
      return
    }
    const column = clonedCols.value.find(col => col.key === localCol.key)
    if (!column)
      return
    list.push({ ...localCol, key: column.key as string })
  })

  if (fixType === 'unfixed') {
    // 列可能会新增，把新增的列筛选出来合并到unfixed list中
    const remainingCols = clonedCols.value.filter(col => !localColumns.some(obj => obj.key === col.key))
    list.push(...remainingCols.map(col => ({ key: col.key as string, fixed: 'unfixed' } as StorageColumn)))
  }
  return list
}

const leftFixedList = ref<StorageColumn[]>(initFixTypeList('left'))
function unifyLeftFixedList() {
  leftFixedList.value = leftFixedList.value.map(col => ({ ...col, fixed: 'left' }))
}
const rightFixedList = ref<StorageColumn[]>(initFixTypeList('right'))
function unifyRightFixedList() {
  rightFixedList.value = rightFixedList.value.map(col => ({ ...col, fixed: 'right' }))
}
const unfixedList = ref<StorageColumn[]>(initFixTypeList('unfixed'))
function unifyUnfixedList() {
  unfixedList.value = unfixedList.value.map(col => ({ ...col, fixed: 'unfixed' }))
}

onMounted(() => {
  onUpdateColumns([...leftFixedList.value, ...unfixedList.value, ...rightFixedList.value])
})

function fixCol(stgCol: StorageColumn, toType: FixType) {
  if (stgCol.fixed === toType)
    return
  // 从from list中删除
  switch (stgCol.fixed) {
    case 'left':
      leftFixedList.value = leftFixedList.value.filter(col => col.key !== stgCol.key)
      break
    case 'right':
      rightFixedList.value = rightFixedList.value.filter(col => col.key !== stgCol.key)
      break
    case 'unfixed':
      unfixedList.value = unfixedList.value.filter(col => col.key !== stgCol.key)
      break
  }
  // 加入to list
  switch (toType) {
    case 'left':
      leftFixedList.value.unshift({ ...stgCol, fixed: 'left' })
      break
    case 'right':
      rightFixedList.value.unshift({ ...stgCol, fixed: 'right' })
      break
    case 'unfixed':
      unfixedList.value.unshift({ ...stgCol, fixed: 'unfixed' })
      break
  }
}

watch(
  () => [leftFixedList.value, rightFixedList.value, unfixedList.value],
  () => {
    const stgCols: StorageColumn[] = [...leftFixedList.value, ...unfixedList.value, ...rightFixedList.value]
    onUpdateColumnsAndStgColumns(stgCols)
  },
  { deep: true },
)

const dragOption = ref<DndProps>({
  group: 'colSettings',
  handle: '.col-settings-handle',
  class: 'py-2',
})
</script>

<template>
  <NPopover
    trigger="click"
    scrollable
    class="max-h-96"
    content-style="padding: 0;"
    placement="bottom"
  >
    <template #trigger>
      <NButton size="small">
        <template #icon>
          <div class="iconify tabler--settings" />
        </template>
        列设置
      </NButton>
    </template>
    <div class="grid grid-cols-1 px-2 divide-y divide-dashed divide-gray-200">
      <FDnd v-model="leftFixedList" v-bind="dragOption" @after-drag="unifyLeftFixedList">
        <template #header>
          <span class="px-2 text-neutral-400">固定在左侧的列</span>
        </template>
        <FTableColumnSettingsItem
          v-for="element in leftFixedList"
          :key="element.key"
          v-model:checked="element.checked"
          :stg-col="element"
          :cols="clonedCols"
          @fix-col="fixCol"
        />
      </FDnd>
      <FDnd v-model="unfixedList" v-bind="dragOption" @after-drag="unifyUnfixedList">
        <template #header>
          <span class="px-2 text-neutral-400">未固定的列</span>
        </template>
        <FTableColumnSettingsItem
          v-for="element in unfixedList"
          :key="element.key"
          v-model:checked="element.checked"
          :stg-col="element"
          :cols="clonedCols"
          @fix-col="fixCol"
        />
      </FDnd>
      <FDnd v-model="rightFixedList" v-bind="dragOption" @after-drag="unifyRightFixedList">
        <template #header>
          <span class="px-2 text-neutral-400">固定在右侧的列</span>
        </template>
        <FTableColumnSettingsItem
          v-for="element in rightFixedList"
          :key="element.key"
          v-model:checked="element.checked"
          :stg-col="element"
          :cols="clonedCols"
          @fix-col="fixCol"
        />
      </FDnd>
    </div>
    <template #footer>
      <div class="flex-y-center justify-end gap-2">
        <FTooltipButton
          size="small"
          icon-class="tabler--reload"
          @sync-click="() => {
            // 更新table的columns和local storage的columns
            onUpdateColumnsAndStgColumns(stgCols)
            // 更新三个list，因为数据没有双向绑定
            leftFixedList = initFixTypeList('left')
            unfixedList = initFixTypeList('unfixed')
            rightFixedList = initFixTypeList('right')
          }"
        >
          重置列
        </FTooltipButton>
      </div>
    </template>
  </NPopover>
</template>
