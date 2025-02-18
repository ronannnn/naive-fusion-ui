<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  height: number
}>()

const el = ref(null)
const { width } = useElementSize(el)
const boxWidth = ref(0)
const prevClientX = ref(0)

function initResize() {
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

function resize(e: MouseEvent) {
  if (prevClientX.value === 0) {
    prevClientX.value = e.clientX
  }
  if (boxWidth.value === 0) {
    boxWidth.value = width.value
  }
  boxWidth.value = boxWidth.value + e.clientX - prevClientX.value
  prevClientX.value = e.clientX
}

function stopResize() {
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  document.addEventListener('mouseup', stopResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopResize)
})
</script>

<template>
  <div
    ref="el"
    class="flex items-center w-full"
    :style="{ width: `${boxWidth === 0 ? 'auto' : boxWidth}px`, height: `${height}px` }"
  >
    <slot />
    <div
      class="ml-1 rounded-md bg-primary-200 w-[5px] h-12 cursor-ew-resize"
      @mousedown="initResize"
    />
  </div>
</template>
