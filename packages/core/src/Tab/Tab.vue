<script setup lang="ts">
import type { TabProps } from './types'
import { computed } from 'vue'
import { FTabList } from '.'

const props = defineProps<TabProps>()

const emit = defineEmits<{
  switchTab: [string]
  closeTab: [string]
  closeTabs: [string[]]
  closeLeftTabs: [string]
  closeRightTabs: [string]
}>()

const listProps = computed(() => {
  const { tabHeight, ...rest } = props
  return rest
})
</script>

<template>
  <div class="flex-y-center w-full" :style="{ height: `${tabHeight}px` }">
    <slot name="prefix" />
    <FTabList
      v-bind="listProps"
      @switch-tab="emit('switchTab', $event)"
      @close-tab="emit('closeTab', $event)"
      @close-tabs="emit('closeTabs', $event)"
      @close-left-tabs="emit('closeLeftTabs', $event)"
      @close-right-tabs="emit('closeRightTabs', $event)"
    />
    <slot name="suffix" />
  </div>
</template>
