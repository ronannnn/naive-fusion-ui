<script setup lang="ts">
import type { DndProps } from './types'
import { VueDraggable } from 'vue-draggable-plus'

withDefaults(defineProps<DndProps>(), {
  dndGhostClass: 'opacity-32',
})
const model = defineModel<any>()
</script>

<template>
  <div>
    <slot name="header" />
    <VueDraggable
      v-model="model"
      :class="dndClass"
      :animation="200"
      :handle="handle"
      :group="group"
      :ghost-class="dndGhostClass"
      :drag-class="dndDragClass"
      @add="onAfterDrag"
    >
      <slot />
    </VueDraggable>
    <slot name="footer" />
  </div>
</template>
