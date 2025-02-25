<script setup lang="ts">
import type { SelectOption, SelectRenderLabel } from 'naive-ui'
import type { WhereQueryProps } from './types'
import { FDnd, FPopselectButton } from '@/index'
import { cloneJson } from '@/shared'
import { useArrayDifference } from '@vueuse/core'
import { NButton, NCard, NDivider } from 'naive-ui'
import { computed, h, nextTick, ref } from 'vue'
import { RTableWhereQueryItem } from '.'

const props = defineProps<WhereQueryProps<any>>()

// 新增查询条件相关
const unselectedWhereOptions = computed<SelectOption[]>(() => {
  return props.whereOptions.filter(option => !props.whereQueryOptionKeys?.includes(option.field as string)).map(option => ({
    label: option.label,
    value: option.field,
  } as SelectOption))
})
const renderLabel: SelectRenderLabel = (option) => {
  const foundOption = props.whereOptions.find(o => o.field === option.value)
  if (foundOption) {
    let iconVNode = foundOption.icon
    if (!foundOption.icon) {
      switch (foundOption.type) {
        case 'select':
          iconVNode = () => h('div', { class: 'tabler--selector' })
          break
        case 'input':
          iconVNode = () => h('div', { class: 'tabler--edit' })
          break
        case 'date':
        case 'dateRange':
          iconVNode = () => h('div', { class: 'tabler--calendar-month' })
          break
      }
    }
    return h('div', { class: 'flex items-center' }, [
      iconVNode && iconVNode(),
      h('span', { class: 'ml-2' }, foundOption.label),
    ])
  }
  return option.label as string
}
const itemRefMap = ref<Map<string, InstanceType<typeof RTableWhereQueryItem>>>(new Map())
function onSelectFilter(field: string) {
  props.onUpdateWhereQueryOptionKeys([...(props.whereQueryOptionKeys ?? []), field])
  // props.onUpdateWhereQuery([...props.whereQuery, { field, opr: null, value: null }]) TODO:
  nextTick(() => {
    itemRefMap.value.get(field)?.focus()
  })
}
function onRemoveFilter(field: string) {
  const newWhereQuerySupData = cloneJson<Record<string, any>>(props.whereQuerySupData)
  delete newWhereQuerySupData[field]
  props.onUpdateWhereQuerySupData(newWhereQuerySupData)
  props.onUpdateWhereQueryOptionKeys(props.whereQueryOptionKeys?.filter(key => key !== field) ?? [])
  // props.onUpdateWhereQuery(props.whereQuery.filter(query => query.field !== field)) TODO:
}

// reset query
function resetQuery() {
  props.onUpdateWhereQuerySupData({})
  props.onUpdateWhereQuery(props.defaultWhereQuery ?? [])
  // 重置查询options，但是保留当前的顺序
  const newOptionKeys = [...(props.whereQueryOptionKeys ?? [])]
  useArrayDifference(props.defaultWhereQueryOptionKeys ?? [], (props.whereQueryOptionKeys ?? [])).value.forEach((field) => {
    newOptionKeys.push(field)
  })
  // 删除可能不存在的options
  const filteredNewOptionsKeys = newOptionKeys.filter(key => props.whereOptions.some(whereOption => whereOption.field === key))
  props.onUpdateWhereQueryOptionKeys(filteredNewOptionsKeys)
}

// drag related
const dragWhereQueryOptionKeys = computed<string[]>({
  get() {
    return props.whereQueryOptionKeys ?? []
  },
  set(newKeys) {
    props.onUpdateWhereQueryOptionKeys(newKeys)
  },
})
</script>

<template>
  <NCard size="small">
    <FDnd
      v-model="dragWhereQueryOptionKeys"
      handle=".where-query-handle"
      dnd-class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
    >
      <RTableWhereQueryItem
        v-for="optionKey in dragWhereQueryOptionKeys"
        :key="optionKey"
        :ref="(el) => itemRefMap.set(optionKey, el as any)"
        :query="whereQuery"
        :sup-data="whereQuerySupData"
        :options="whereOptions"
        :field="optionKey"
        :loading="loading"
        :trigger-query="triggerQuery"
        :size="size"
        @remove="onRemoveFilter"
        @update:query="onUpdateWhereQuery"
        @update:sup-data="onUpdateWhereQuerySupData"
      />
    </FDnd>
    <NDivider dashed class="py-3 !m-0" />
    <div class="flex-center">
      <div class="flex-1">
        <slot name="action-left" />
      </div>
      <div class="flex-center flex-1 gap-3">
        <FPopselectButton
          :options="unselectedWhereOptions"
          :render-label="renderLabel"
          dashed
          size="small"
          enable-search
          search-input-placeholder="搜索查询条件"
          class="flex-1 sm:flex-none"
          icon-class="tabler--plus"
          @update-value="onSelectFilter"
        >
          新增查询条件
        </FPopselectButton>
        <NButton :size="size" type="primary" :loading="loading" @click="triggerQuery">
          查询
        </NButton>
        <NButton :size="size" :disabled="loading" @click="resetQuery">
          重置
        </NButton>
      </div>
      <div class="flex-1">
        <slot name="action-right" />
      </div>
    </div>
  </NCard>
</template>
