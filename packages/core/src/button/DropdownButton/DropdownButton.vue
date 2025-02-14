<script setup lang="ts">
import type { DropdownButtonProps } from './types'
import { NButton, NDropdown } from 'naive-ui'
import { computed, h, ref } from 'vue'
import { findDropdownButtonOptionsKeyRecursively } from './utils'

const props = withDefaults(defineProps<DropdownButtonProps>(), {
  trigger: 'click',
})
const fnLoading = ref(false)
const btnLoading = computed(() => fnLoading.value || props.loading)

function adaptOptions(options: DropdownButtonProps['options']) {
  return options.map((option) => {
    const newOption = { ...option }
    if (option.iconClass && !option.icon) {
      newOption.icon = () => h('div', { class: ['iconify', option.iconClass] })
    }
    if (option.children) {
      newOption.children = adaptOptions(option.children)
    }
    return newOption
  })
}
const adaptedOptions = computed(() => adaptOptions(props.options))

async function onSelect(key: string | number) {
  const foundDropdownButtonOption = findDropdownButtonOptionsKeyRecursively(props.options, key)
  if (!foundDropdownButtonOption) {
    console.warn('Popselect option not found, key is:', key)
    return
  }
  if (foundDropdownButtonOption.syncFn) {
    foundDropdownButtonOption.syncFn()
  }
  else if (foundDropdownButtonOption.asyncFn) {
    fnLoading.value = true
    try {
      await foundDropdownButtonOption.asyncFn()
    }
    catch (error) {
      console.error('Popselect option asyncFn error:', error)
    }
    fnLoading.value = false
  }
  else {
    console.warn('Popselect option has no syncFn or asyncFn, key is:', key)
  }
}
</script>

<template>
  <NDropdown
    :trigger="trigger"
    :disabled="btnLoading || props.disabled"
    :placement="placement"
    :options="adaptedOptions"
    :width="width"
    @select="onSelect"
  >
    <NButton v-bind="props" :loading="btnLoading" :disabled="disabled" @click="e => e.stopPropagation()">
      <template v-if="iconClass" #icon>
        <slot name="icon">
          <div class="iconify" :class="iconClass" />
        </slot>
      </template>
      <template #default>
        <slot />
      </template>
    </NButton>
  </NDropdown>
</template>
