<script setup lang="ts">
import { FFloatingLabelInput } from 'n-fusion-ui'
import { ref } from 'vue'

const modelValue = ref<string>('')
const modelValueWithDefault = ref<string>('333')
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
    <FFloatingLabelInput size="large" placeholder="请输入" :value="modelValue" @update-value="val => modelValue = val" />
    <FFloatingLabelInput size="large" placeholder="请输入" prefix-icon-class="tabler--at" :value="modelValue" @update-value="val => modelValue = val" />
    <FFloatingLabelInput size="large" placeholder="请输入" :value="modelValueWithDefault" @update-value="val => modelValueWithDefault = val" />

    <FFloatingLabelInput size="medium" placeholder="请输入" :value="modelValue" @update-value="val => modelValue = val" />
    <FFloatingLabelInput size="medium" placeholder="请输入" prefix-icon-class="tabler--at" :value="modelValue" @update-value="val => modelValue = val" />
    <FFloatingLabelInput size="medium" placeholder="请输入" :value="modelValueWithDefault" @update-value="val => modelValueWithDefault = val" />

    <FFloatingLabelInput size="small" placeholder="请输入" :value="modelValue" @update-value="val => modelValue = val" />
    <FFloatingLabelInput size="small" placeholder="请输入" prefix-icon-class="tabler--at" :value="modelValue" @update-value="val => modelValue = val" />
    <FFloatingLabelInput size="small" placeholder="请输入" :value="modelValueWithDefault" @update-value="val => modelValueWithDefault = val" />
  </div>
</template>
