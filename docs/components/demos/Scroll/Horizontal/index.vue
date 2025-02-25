<script setup lang="ts">
import { FScroll } from 'n-fusion-ui'
</script>

<template>
  <FScroll horizontal class="w-64 border border-gray-300 dark:border-gray-700 rounded-md">
    <div class="flex gap-3 p-3">
      <div v-for="i in 10" :key="i" class="whitespace-nowrap">
        Item {{ i }}
      </div>
    </div>
  </FScroll>
</template>
