<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import type { PopselectButtonProps } from './types'
import { isEmptyString } from '@/shared'
import { NButton, NInput, NPopselect } from 'naive-ui'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<PopselectButtonProps>(), {
  trigger: 'click',
})
const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)
const searchContent = ref('')
const filteredOptions = computed<SelectOption[]>(() => props.options.filter((option) => {
  if (!props.searchable || isEmptyString(searchContent.value)) {
    return true
  }
  return String(option.label).includes(searchContent.value)
}))
</script>

<template>
  <NPopselect
    :trigger="trigger"
    :disabled="btnLoading || props.disabled"
    :placement="popselectPlacement"
    :options="filteredOptions"
    :render-label="renderLabel"
    :width="width"
    scrollable
    @update-value="onUpdateValue"
  >
    <NButton v-bind="props" :loading="btnLoading" :disabled="disabled">
      <template v-if="iconClass" #icon>
        <slot name="icon">
          <div class="iconify" :class="iconClass" />
        </slot>
      </template>
      <template #default>
        <slot />
      </template>
    </NButton>
    <template v-if="props.searchable" #header>
      <NInput
        v-model:value="searchContent"
        clearable
        :placeholder="searchInputPlaceholder"
        size="small"
      />
    </template>
  </NPopselect>
</template>
