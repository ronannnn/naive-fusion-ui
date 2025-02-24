<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import type { FloatingLabelInputProps } from './types'
import { NInput } from 'naive-ui'
import { computed, ref } from 'vue'

const props = defineProps<FloatingLabelInputProps>()

const inputRef = ref<InputInst | null>(null)
function focus() {
  inputRef.value?.focus()
}
const inputFocus = ref(false)
const isValueEmpty = computed(() => (props.value?.length ?? 0) === 0)
const moveUp = computed(() => inputFocus.value || !isValueEmpty.value)
const labelStartClass = computed<string>(() => {
  switch (props.size) {
    case 'small':
      return 'start-1.5'
    case 'medium':
      return 'start-2'
    case 'large':
      return 'start-2.5'
    default:
      return 'start-1.5'
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

defineExpose({ focus })
</script>

<template>
  <div class="relative">
    <NInput
      ref="inputRef"
      v-bind="props"
      placeholder=""
      @focus="inputFocus = true"
      @blur="inputFocus = false"
    >
      <template #clear-icon>
        <slot name="clear-icon" />
      </template>
      <template #count>
        <slot name="count" />
      </template>
      <template #password-invisible-icon>
        <slot name="password-invisible-icon" />
      </template>
      <template #password-visible-icon>
        <slot name="password-visible-icon" />
      </template>
      <template #prefix>
        <slot name="prefix" />
      </template>
      <template #separator>
        <slot name="separator" />
      </template>
      <template #suffix>
        <slot name="#suffix" />
      </template>
    </NInput>
    <span
      class="pointer-events-none absolute top-0.75 z-30 px-0.5 transition-all max-w-3/5 truncate"
      :class="`${baseLabelClass} ${labelStartClass} ${moveUp ? movedLabelClass : originalLabelClass}`"
    >
      {{ placeholder }}
    </span>
  </div>
</template>
