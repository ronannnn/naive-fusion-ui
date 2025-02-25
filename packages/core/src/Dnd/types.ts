import type { SortableEvent } from 'vue-draggable-plus'

export interface DndProps {
  class?: string
  dndClass?: string
  dndGhostClass?: string
  dndDragClass?: string
  handle?: string
  group?: string
  direction?: 'vertical' | 'horizontal'
  onAfterDrag?: (event: SortableEvent) => void
}
