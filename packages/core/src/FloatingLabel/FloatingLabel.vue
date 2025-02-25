<script setup lang="ts">
import type { FloatingLabelProps } from './types'
import { computed } from 'vue'

const props = defineProps<FloatingLabelProps>()

const isValueEmpty = computed(() => (props.value?.length ?? 0) === 0)
const moveUp = computed(() => props.focused || !isValueEmpty.value)
const labelStartClass = computed<string>(() => {
  // 有prefix内容且没有movedUp时，设置的start需要有offset
  const setLabelOffset = props.hasPrefix && !moveUp.value
  switch (props.size) {
    case 'small':
      return setLabelOffset ? 'start-7.5' : 'start-1.5'
    case 'medium':
      return setLabelOffset ? 'start-8' : 'start-2'
    case 'large':
      return setLabelOffset ? 'start-8.5' : 'start-2.5'
    default:
      return setLabelOffset ? 'start-7.5' : 'start-1.5'
  }
})
const movedLabelClass = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'text-[12px] -translate-y-[15px]'
    case 'medium':
      return 'text-[14px] -translate-y-[16px]'
    case 'large':
      return 'text-[16px] -translate-y-[18px]'
    default:
      return 'text-[12px] -translate-y-[15px]'
  }
})
const originalLabelClass = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'text-[14px] translate-y-0'
    case 'medium':
      return 'text-[16px] translate-y-0'
    case 'large':
      return 'text-[20px] translate-y-0'
    default:
      return 'text-[14px] translate-y-0'
  }
})

const baseLabelClass = computed(() => moveUp.value ? 'text-primary bg-white dark:bg-zinc-900' : 'text-neutral-400')
</script>

<template>
  <span
    class="pointer-events-none absolute top-0.75 z-30 px-0.5 transition-all max-w-3/5 truncate"
    :class="`${baseLabelClass} ${labelStartClass} ${moveUp ? movedLabelClass : originalLabelClass}`"
  >
    {{ placeholder }}
  </span>
</template>
