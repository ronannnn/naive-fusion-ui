<script setup lang="ts">
import { FScroll } from 'n-fusion-ui'
</script>

<template>
  <FScroll vertical class="h-32 border border-gray-300 dark:border-gray-700 rounded-md">
    <div class="p-3">
      <div v-for="i in 10" :key="i">
        Item {{ i }}
      </div>
    </div>
  </FScroll>
</template>
