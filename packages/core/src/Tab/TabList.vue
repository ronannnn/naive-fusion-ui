<script setup lang="ts">
import type { TabListProps } from './types'
import { FScroll } from '@/Scroll'
import { nextTick, reactive, ref, watch } from 'vue'
import { FTabItem, FTabItemContextMenu } from '.'

const props = defineProps<TabListProps>()
const emit = defineEmits<{
  switchTab: [string]
  closeTab: [string]
  closeTabs: [string[]]
  closeLeftTabs: [string]
  closeRightTabs: [string]
}>()
// partially copy from soybean admin
const tabRef = ref<HTMLElement>()
const bsScroll = ref<InstanceType<typeof FScroll>>()

interface DropdownConfig {
  visible: boolean
  x: number
  y: number
  tabId: string
}

const dropdown: DropdownConfig = reactive({
  visible: false,
  x: 0,
  y: 0,
  tabId: '',
})

function setDropdown(config: Partial<DropdownConfig>) {
  Object.assign(dropdown, config)
}

let isClickContextMenu = false

function handleDropdownVisible(visible: boolean) {
  if (!isClickContextMenu)
    setDropdown({ visible })
}

async function handleContextMenu(e: MouseEvent, tabId: string) {
  e.preventDefault()
  const { clientX, clientY } = e
  isClickContextMenu = true
  const DURATION = dropdown.visible ? 150 : 0
  setDropdown({ visible: false })
  setTimeout(() => {
    setDropdown({
      visible: true,
      x: clientX,
      y: clientY,
      tabId,
    })
    isClickContextMenu = false
  }, DURATION)
}

const TAB_DATA_ID = 'data-tab-id'

type TabNamedNodeMap = NamedNodeMap & {
  [TAB_DATA_ID]: Attr
}

async function scrollToActiveTab(activeTabId: string) {
  await nextTick()
  if (!tabRef.value)
    return

  const { children } = tabRef.value

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]

    const { value: tabId } = (child.attributes as TabNamedNodeMap)[TAB_DATA_ID]

    if (tabId === activeTabId) {
      const { left, width } = child.getBoundingClientRect()
      const clientX = left + width / 2

      setTimeout(() => {
        bsScroll.value?.scrollByClientX(clientX)
      }, 50)

      break
    }
  }
}

watch(
  () => props.activeTabId,
  () => {
    scrollToActiveTab(props.activeTabId)
  },
)
</script>

<template>
  <FScroll
    ref="bsScroll"
    horizontal
    class="mt-auto"
    :style="{ height: `${tabItemHeight}px` }"
  >
    <div ref="tabRef" class="h-full flex gap-1">
      <FTabItem
        v-for="tabItem in tabItems"
        :key="tabItem.id"
        :[TAB_DATA_ID]="tabItem.id"
        :active="activeTabId === tabItem.id"
        :tab="tabItem"
        @click="emit('switchTab', tabItem.id)"
        @close="() => emit('closeTab', tabItem.id)"
        @contextmenu="handleContextMenu($event, tabItem.id)"
      >
        {{ tabItem.label }}
      </FTabItem>
    </div>
  </FScroll>
  <FTabItemContextMenu
    :visible="dropdown.visible"
    :tab-id="dropdown.tabId"
    :x="dropdown.x"
    :y="dropdown.y"
    @update:visible="handleDropdownVisible"
    @close-tab="emit('closeTab', $event)"
    @close-tabs="emit('closeTabs', $event)"
    @close-left-tabs="emit('closeLeftTabs', $event)"
    @close-right-tabs="emit('closeRightTabs', $event)"
  />
</template>
