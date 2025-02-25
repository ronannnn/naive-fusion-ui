<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import type { FloatingLabelInputProps } from './types'
import { FFloatingLabel } from '@/FloatingLabel'
import { isEmptyString } from '@/shared'
import { NInput } from 'naive-ui'
import { ref } from 'vue'

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
    <FFloatingLabel
      :value="props.value"
      :focused="inputFocus"
      :has-prefix="Boolean(slots.prefix) || !isEmptyString(props.prefixIconClass)"
      :size="size"
      :placeholder="props.placeholder"
    />
  </div>
</template>
