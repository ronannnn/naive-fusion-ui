<script setup lang="ts">
import type { DropdownButtonOption } from 'naive-fusion-ui'
import { FDropdownButton } from 'naive-fusion-ui'
import { useMessage } from 'naive-ui'

const msg = useMessage()
function syncMsg(str: string) {
  msg.success(str)
}
async function asyncMsg(str: string) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  msg.success(str)
}

const options: DropdownButtonOption[] = [
  {
    type: 'group',
    key: 'sync',
    label: 'Suggestions',
    children: [
      {
        label: '日历',
        key: 'calendar',
        iconClass: 'tabler--calendar-month',
        syncFn: () => syncMsg('打开日历'),
      },
      {
        label: '计算器',
        key: 'calculator',
        iconClass: 'tabler--calculator',
        syncFn: () => syncMsg('打开计算器'),
      },
      {
        label: '天气',
        key: 'weather',
        iconClass: 'tabler--sun',
        syncFn: () => syncMsg('打开天气'),
      },
    ],
  },
  {
    type: 'group',
    key: 'async',
    label: '异步',
    children: [
      {
        label: '获取数据',
        key: 'download',
        iconClass: 'tabler--download',
        asyncFn: () => asyncMsg('数据已获取'),
      },
      {
        label: '上传数据',
        key: 'upload',
        iconClass: 'tabler--upload',
        asyncFn: () => asyncMsg('数据已上传'),
      },
      {
        label: '修改数据',
        key: 'mod',
        iconClass: 'tabler--edit',
        asyncFn: () => asyncMsg('数据已修改'),
      },
    ],
  },
]
</script>

<template>
  <FDropdownButton
    icon-class="tabler--circle-check"
    :options="options"
    :width="200"
  >
    帮我选一下
  </FDropdownButton>
</template>
