<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import type { FloatingLabelInputProps } from './types'
import { NInput } from 'naive-ui'
import { computed, ref } from 'vue'

const props = defineProps<FloatingLabelInputProps>()

const slots = defineSlots<SimpleLayoutSlots>()
const inputRef = ref<InputInst | null>(null)
function focus() {
  inputRef.value?.focus()
}

type SlotFn = (props?: Record<string, unknown>) => any
export interface SimpleLayoutSlots {
  'clear-icon'?: SlotFn
  'password-invisible-icon'?: SlotFn
  'password-visible-icon'?: SlotFn
  'count'?: SlotFn
  'prefix'?: SlotFn
  'separator'?: SlotFn
  'suffix'?: SlotFn
}
const inputFocus = ref(false)
const isValueEmpty = computed(() => (props.value?.length ?? 0) === 0)
const moveUp = computed(() => inputFocus.value || !isValueEmpty.value)
const labelStartClass = computed<string>(() => {
  // 有prefix内容且没有movedUp时，设置的start需要有offset
  const setLabelOffset = (Boolean(slots.prefix) || props.prefixIconClass) && !moveUp.value
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
        <slot name="prefix">
          <div v-if="prefixIconClass" class="iconify" :class="prefixIconClass" />
        </slot>
      </template>
      <template #separator>
        <slot name="separator" />
      </template>
      <template #suffix>
        <slot name="suffix">
          <div v-if="suffixIconClass" class="iconify" :class="suffixIconClass" />
        </slot>
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
