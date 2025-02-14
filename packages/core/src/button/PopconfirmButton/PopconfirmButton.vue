<script setup lang="ts">
import type { PopconfirmButtonProps } from './types'
import { NButton, NPopconfirm } from 'naive-ui'
import { computed, ref } from 'vue'

const props = defineProps<PopconfirmButtonProps>()

const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)

async function handlePositiveClick(e: MouseEvent) {
  e.stopPropagation()

  if (props.disabled) {
    return
  }
  if (props.onAsyncConfirm) {
    try {
      fnLoading.value = true
      await props.onAsyncConfirm(e)
    }
    finally {
      fnLoading.value = false
    }
  }
  else if (props.onConfirm) {
    props.onConfirm(e)
  }
}
</script>

<template>
  <NPopconfirm
    :disabled="btnLoading || props.disabled"
    :negative-button-props="{ size: 'tiny', round: true, loading: btnLoading }"
    :positive-button-props="{ size: 'tiny', round: true, disabled: btnLoading }"
    positive-text="确认"
    negative-text="取消"
    @positive-click="handlePositiveClick"
  >
    <template #trigger>
      <NButton
        v-bind="props"
        :loading="btnLoading"
        :disabled="disabled"
      >
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
    {{ props.popconfirmContent }}
  </NPopconfirm>
</template>
