<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { FHoverBox, FSimpleLayout } from 'naive-fusion-ui'
import { computed, ref, watch } from 'vue'

const siderWidth = ref(80)
const siderCollapsedWidth = ref(50)
const siderCollapsed = ref(false)

const el = ref(null)
const { width } = useElementSize(el)
const isMobile = computed(() => width.value < 400)
watch(
  () => isMobile.value,
  () => {
    if (isMobile.value) {
      siderCollapsed.value = true
    }
  },
)
</script>

<template>
  <FSimpleLayout
    ref="el"
    v-model:sider-width="siderWidth"
    v-model:sider-collapsed-width="siderCollapsedWidth"
    v-model:sider-collapsed="siderCollapsed"
    :sider-min-width="50"
    :sider-max-width="100"
    :is-mobile="isMobile"
    class="border border-primary-100 dark:border-primary-900 rounded-md"
  >
    <template #header>
      <div class="p-1 flex items-center gap-1 h-full">
        <FHoverBox @click="siderCollapsed = !siderCollapsed">
          <div v-if="siderCollapsed" class="iconify tabler--layout-sidebar-left-expand" />
          <div v-else class="iconify tabler--layout-sidebar-left-collapse" />
        </FHoverBox>
        <span>Header</span>
      </div>
    </template>
    <template #tab>
      <div class="p-1 h-full flex items-center">
        Tab
      </div>
    </template>
    <template #sider>
      <div class="p-1">
        Sider
      </div>
    </template>
    <div class="p-1 h-full">
      Content
    </div>
  </FSimpleLayout>
</template>
