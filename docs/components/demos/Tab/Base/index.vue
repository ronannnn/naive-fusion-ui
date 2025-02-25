<script setup lang="ts">
import type { TabItemProps } from 'n-fusion-ui'
import { FTab } from 'n-fusion-ui'
import { ref } from 'vue'

const items = ref<TabItemProps[]>([
  { id: '1', label: 'Tab 1', icon: 'tabler--menu-2', closable: true },
  { id: '2', label: 'Tab 2', icon: 'tabler--menu-2' },
  { id: '3', label: 'Tab 3', icon: 'tabler--menu-2', closable: true },
  { id: '4', label: 'Tab 4', icon: 'tabler--menu-2' },
  { id: '5', label: 'Tab 5', icon: 'tabler--menu-2', closable: true },
  { id: '6', label: 'Tab 6', icon: 'tabler--menu-2' },
  { id: '7', label: 'Tab 7', icon: 'tabler--menu-2', closable: true },
  { id: '8', label: 'Tab 8', icon: 'tabler--menu-2' },
  { id: '9', label: 'Tab 9', icon: 'tabler--menu-2' },
])

const activeTabId = ref('1')

function closeTab(id: string) {
  items.value = items.value.filter(item => item.id !== id)
  // active tab is closed, we need to switch to another tab
  if (id === activeTabId.value) {
    activeTabId.value = items.value.length > 0 ? items.value[0].id : ''
  }
}
</script>

<template>
  <FTab
    :active-tab-id="activeTabId"
    :tab-height="40"
    :tab-item-height="32"
    :tab-items="items"
    class="w-full border-b border-b-primary-200 dark:border-b-primary-800"
    @close-tab="closeTab"
    @switch-tab="id => activeTabId = id"
  />
</template>
