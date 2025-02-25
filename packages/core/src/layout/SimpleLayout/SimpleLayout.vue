<script setup lang="ts">
import type { SimpleLayoutProps } from './types'
import { NBackTop, NDrawer, NSplit } from 'naive-ui'
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<SimpleLayoutProps>(), {
  headerHeight: 48,

  tabHeight: 40,
  tabItemHeight: 32,

  siderCollapsed: false,
  siderWidth: 220,
  siderMaxWidth: 320,
  siderMinWidth: 180,
  siderCollapsedWidth: 64,
  siderMaxCollapsedWidth: 100,
  siderMinCollapsedWidth: 50,
})
const emit = defineEmits<{
  'update:siderWidth': [number]
  'update:siderCollapsedWidth': [number]
  'update:siderCollapsed': [boolean]
}>()

const slots = defineSlots<SimpleLayoutSlots>()
type SlotFn = (props?: Record<string, unknown>) => any
export interface SimpleLayoutSlots {
  /** Main */
  default?: SlotFn
  /** Header */
  header?: SlotFn
  /** Tab */
  tab?: SlotFn
  /** Sider */
  sider?: SlotFn
}

// visible
const headerVisible = computed(() => Boolean(slots.header) && !props.hideHeader)
const tabVisible = computed(() => Boolean(slots.tab) && !props.hideTab)
const siderVisible = computed(() => Boolean(slots.sider) && !props.hideSider && !props.isFullContent)
const embeddedSiderVisible = computed(() => !props.isMobile && siderVisible.value)
const floatingSiderVisible = computed(() => props.isMobile && siderVisible.value)

const resizeTriggerSize = ref(4)
const embeddedSiderWidth = computed<string>({
  get() {
    if (!embeddedSiderVisible.value) {
      return '0px'
    }
    if (props.siderCollapsed) {
      return `${props.siderCollapsedWidth}px`
    }
    return `${props.siderWidth}px`
  },
  set(newValue) {
    if (!embeddedSiderVisible.value) {
      return
    }
    if (props.siderCollapsed) {
      emit('update:siderCollapsedWidth', Number(newValue.replace('px', '')))
      return
    }
    emit('update:siderWidth', Number(newValue.replace('px', '')))
  },
})
const floatingSiderWidth = computed<string>({
  get() {
    return `${props.siderWidth}px`
  },
  set(newValue) {
    emit('update:siderWidth', Number(newValue.replace('px', '')))
  },
})

const dragging = ref(false)

// 保证n-fusion-ui-simple-layout挂载到DOM中
const layoutMounted = ref(false)
onMounted(() => {
  layoutMounted.value = true
})
</script>

<template>
  <NSplit
    id="n-fusion-ui-simple-layout"
    v-model:size="embeddedSiderWidth"
    direction="horizontal"
    :pane1-class="`flex ${!dragging && 'transition-all duration-300'}`"
    :pane2-class="`flex ${!dragging && 'transition-all duration-300'}`"
    :max="siderCollapsed ? `${siderMaxCollapsedWidth}px` : `${siderMaxWidth}px`"
    :min="siderCollapsed ? `${siderMinCollapsedWidth}px` : `${siderMinWidth}px`"
    :resize-trigger-size="embeddedSiderVisible ? resizeTriggerSize : 0"
    class="relative overflow-hidden"
    @drag-start="dragging = true"
    @drag-end="dragging = false"
  >
    <!-- sider -->
    <template #1>
      <aside
        v-if="embeddedSiderVisible"
        class="w-full"
      >
        <slot name="sider" />
      </aside>
      <Teleport to="body">
        <NDrawer
          v-if="floatingSiderVisible && layoutMounted"
          :width="floatingSiderWidth"
          placement="left"
          to="#n-fusion-ui-simple-layout"
          :trap-focus="false"
          :block-scroll="false"
          :show="!siderCollapsed"
          @update:show="show => emit('update:siderCollapsed', !show)"
        >
          <slot name="sider" />
        </NDrawer>
      </Teleport>
    </template>

    <!-- header + tab + content -->
    <template #2>
      <div class="grow flex flex-col overflow-x-hidden">
        <template v-if="headerVisible">
          <header
            v-show="!isFullContent"
            class="border-b border-primary-100 dark:border-primary-900"
            :style="{
              height: `${headerHeight}px`,
            }"
          >
            <slot name="header" />
          </header>
        </template>

        <template v-if="tabVisible">
          <div
            class="border-b border-primary-100 dark:border-primary-900"
            :style="{
              height: `${tabHeight}px`,
            }"
          >
            <slot name="tab" />
          </div>
        </template>

        <!-- content -->
        <div class="flex-1 bg-primary-50/30 dark:bg-neutral-900">
          <slot />
          <NBackTop />
        </div>
      </div>
    </template>

    <!-- n-split resize-trigger -->
    <template #resize-trigger>
      <div class="h-full flex justify-end rounded-md">
        <div class="h-full w-[1px] rounded-md bg-primary-100 dark:bg-primary-900" />
      </div>
    </template>
  </NSplit>
</template>
