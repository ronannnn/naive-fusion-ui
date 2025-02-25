<script setup lang="ts">
import type { StorageColumn } from '../types'
import type { ColumnSettingsItemProps, FixType } from './types'
import { NTooltip } from 'naive-ui'

defineProps<ColumnSettingsItemProps<any>>()
const emit = defineEmits<{
  fixCol: [StorageColumn, FixType]
}>()
const checked = defineModel<boolean | undefined>('checked', { required: true })
const iconClass = 'cursor-pointer flex-center p-1 hover:bg-slate-200 rounded transition-all'
</script>

<template>
  <div v-if="stgCol.key" class="h-8 flex-y-center rounded px-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-all">
    <div class="col-settings-handle mr-2 flex-center cursor-move">
      <div class="iconify tabler--drag-drop text-4 text-gray-500" />
    </div>
    <span class="mr-6">{{ cols.find(col => col.key === stgCol.key)?.title ?? '未知列名' }}</span>
    <div class="ml-auto flex-y-center">
      <NTooltip v-if="stgCol.fixed !== 'left'" :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass" @click="() => emit('fixCol', stgCol, 'left')">
            <div class="iconify tabler--arrow-bar-to-up text-4" />
          </div>
        </template>
        固定列到左侧
      </NTooltip>
      <NTooltip v-if="stgCol.fixed !== 'right'" :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass" @click="() => emit('fixCol', stgCol, 'right')">
            <div class="iconify tabler--arrow-bar-to-down text-4" />
          </div>
        </template>
        固定列到右侧
      </NTooltip>
      <NTooltip v-if="stgCol.fixed !== 'unfixed'" :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass" @click="() => emit('fixCol', stgCol, 'unfixed')">
            <div class="iconify tabler--x text-4" />
          </div>
        </template>
        取消固定
      </NTooltip>
      <NTooltip :keep-alive-on-hover="false" content-style="padding: 0;">
        <template #trigger>
          <div :class="iconClass">
            <div v-if="checked ?? true" class="iconify tabler--eye cursor-pointer text-4" @click="checked = false" />
            <div v-else class="iconify tabler--eye-off cursor-pointer text-4" @click="checked = true" />
          </div>
        </template>
        <span v-if="checked ?? true">
          隐藏该列
        </span>
        <span v-else>
          显示该列
        </span>
      </NTooltip>
    </div>
  </div>
</template>
