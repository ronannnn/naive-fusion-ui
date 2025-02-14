<script setup lang="ts">
import type { TooltipButtonProps } from './types'
import { NButton, NTooltip } from 'naive-ui'
import { computed, ref } from 'vue'

const props = defineProps<TooltipButtonProps>()

const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)
async function handleClick(e: MouseEvent) {
  if (props.onAsyncClick && props.onSyncClick) {
    throw new Error('onAsyncClick and onSyncClick cannot be used together')
  }
  e.stopPropagation()

  if (props.disabled) {
    return
  }
  if (props.onAsyncClick) {
    try {
      fnLoading.value = true
      await props.onAsyncClick(e)
    }
    finally {
      fnLoading.value = false
    }
  }
  else if (props.onSyncClick) {
    props.onSyncClick(e)
  }
}
</script>

<template>
  <NTooltip
    :disabled="!props.tooltipContent"
    :placement="props.tooltipPlacement"
    :keep-alive-on-hover="props.keepAliveOnHover"
  >
    <template #trigger>
      <NButton v-bind="props" :loading="btnLoading" @click="handleClick">
        <template v-if="iconClass" #icon>
          <slot name="icon">
            <div class="iconify" :class="iconClass" />
          </slot>
        </template>
        <template #default>
          <slot />
        </template>
      </NButton>
    </template>
    {{ props.tooltipContent }}
  </NTooltip>
</template>
