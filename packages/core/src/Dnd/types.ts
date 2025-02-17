import type { SortableEvent } from 'vue-draggable-plus'

export interface DndProps {
  dndClass?: string
  dndGhostClass?: string
  dndDragClass?: string
  handle?: string
  group?: string
  onAfterDrag?: (event: SortableEvent) => void
}
