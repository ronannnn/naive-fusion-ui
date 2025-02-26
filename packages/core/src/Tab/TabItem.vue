<script setup lang="ts">
import type { TabItemProps } from './types'
import { NButton } from 'naive-ui'

defineProps<{
  active: boolean
  tab: TabItemProps
}>()
const emit = defineEmits<{
  close: []
}>()
function handleClose(e: MouseEvent) {
  e.stopPropagation()
  emit('close')
}
</script>

<template>
  <div
    class="min-w-16 flex-center whitespace-nowrap border border-b-0 rounded-t-md px-3 transition-all hover:cursor-pointer"
    :class="active ? 'text-primary bg-primary/10 border-primary/0 dark:b-primary-800' : 'border-gray-100 dark:border-gray-800 hover:bg-[#f6f6f6] dark:hover:bg-[#333]'"
  >
    <div class="iconify mr-3" :class="tab.icon" />
    <slot />
    <div class="flex-center ml-2">
      <NButton
        v-if="tab.closable"
        :type="active ? 'primary' : undefined"
        size="tiny"
        circle
        quaternary
      >
        <template #icon>
          <div class="iconify tabler--x" @click="handleClose" />
        </template>
      </NButton>
    </div>
  </div>
</template>
