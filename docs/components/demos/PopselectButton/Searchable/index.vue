<script setup lang="ts">
import { FPopselectButton } from 'naive-fusion-ui'
import { type SelectOption, useMessage } from 'naive-ui'

const msg = useMessage()

const options: SelectOption[] = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
]
</script>

<template>
  <div class="flex flex-wrap gap-3 items-end">
    <FPopselectButton
      icon-class="tabler--circle-check"
      type="primary"
      :options="options"
      searchable
      search-input-placeholder="搜索选项"
      @update-value="newValue => msg.info(`选中的值是：${newValue}`)"
    >
      再帮我选一下
    </FPopselectButton>
  </div>
</template>
