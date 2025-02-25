<script setup lang="ts">
import { FDnd } from 'n-fusion-ui'
import { ref } from 'vue'

interface ItemProps {
  id: number
  name: string
}

const items = ref<ItemProps[]>([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
])
</script>

<template>
  <FDnd
    v-model="items"
    class="border border-gray-300 dark:border-gray-700 rounded-md p-3"
    dnd-class="flex gap-1"
  >
    <div v-for="item in items" :key="item.id" class="p-2 border border-gray-300 dark:border-gray-700 rounded-md">
      {{ item.name }}
    </div>
  </FDnd>
</template>
