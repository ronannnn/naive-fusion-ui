<script setup lang="ts">
import type { DndProps } from './types'
import { VueDraggable } from 'vue-draggable-plus'

const props = withDefaults(defineProps<DndProps>(), {
  dndGhostClass: 'opacity-32',
})
const model = defineModel<any>()
</script>

<template>
  <div :class="props.class">
    <slot name="header" />
    <VueDraggable
      v-model="model"
      :class="dndClass"
      :animation="300"
      :handle="handle"
      :group="group"
      :ghost-class="dndGhostClass"
      :drag-class="dndDragClass"
      :direction="direction"
      @add="onAfterDrag"
    >
      <slot />
    </VueDraggable>
    <slot name="footer" />
  </div>
</template>
