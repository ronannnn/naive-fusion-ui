<script setup lang="ts">
import { FDnd } from 'naive-fusion-ui'
import { ref } from 'vue'

interface ItemProps {
  id: number
  name: string
}

const list1Items = ref<ItemProps[]>([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
])

const list2Items = ref<ItemProps[]>([
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
])
</script>

<template>
  <div class="space-y-3">
    <FDnd
      v-model="list1Items"
      class="border border-gray-300 dark:border-gray-700 rounded-md p-3"
      dnd-class="flex gap-1"
      group="list"
    >
      <div v-for="item in list1Items" :key="item.id" class="p-2 border border-gray-300 dark:border-gray-700 rounded-md">
        {{ item.name }}
      </div>
    </FDnd>
    <FDnd
      v-model="list2Items"
      class="border border-gray-300 dark:border-gray-700 rounded-md p-3"
      dnd-class="flex gap-1"
      group="list"
    >
      <div v-for="item in list2Items" :key="item.id" class="p-2 border border-gray-300 dark:border-gray-700 rounded-md">
        {{ item.name }}
      </div>
    </FDnd>
  </div>
</template>
