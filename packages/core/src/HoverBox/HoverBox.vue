<script setup lang="ts">
import type { HoverBoxProps } from './types'
import { NTooltip } from 'naive-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<HoverBoxProps>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
})

const showTooltip = computed(() => Boolean(props.tooltipContent))
</script>

<template>
  <!-- use div here so class can be passed in -->
  <div class="h-7">
    <NTooltip :placement="placement" trigger="hover" :disabled="!showTooltip">
      <template #trigger>
        <div class="h-full flex justify-center items-center cursor-pointer rounded px-2 transition-all hover:bg-[#f6f6f6] dark:hover:bg-[#333]">
          <slot />
        </div>
      </template>
      {{ tooltipContent }}
    </NTooltip>
  </div>
</template>
