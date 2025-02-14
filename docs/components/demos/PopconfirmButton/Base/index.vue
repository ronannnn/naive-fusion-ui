<script setup lang="ts">
import { FPopconfirmButton } from 'naive-fusion-ui'
import { useMessage } from 'naive-ui'

const msg = useMessage()
function confirm() {
  msg.success('你真的删除我了')
}
async function asyncConfirm() {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  msg.success('你真的删除我了')
}
</script>

<template>
  <div class="flex flex-wrap gap-3 items-end">
    <FPopconfirmButton
      icon-class="tabler--circle-check"
      popconfirm-content="真的要删除我吗"
      @confirm="confirm"
    >
      删除我
    </FPopconfirmButton>

    <FPopconfirmButton
      icon-class="tabler--circle-check"
      type="primary"
      popconfirm-content="真的要删除我吗"
      @async-confirm="asyncConfirm"
    >
      异步删除我
    </FPopconfirmButton>
  </div>
</template>
