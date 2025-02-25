<script setup lang="ts">
import { FHoverBox } from 'n-fusion-ui'
</script>

<template>
  <div class="flex gap-1">
    <FHoverBox tooltip-content="切换语言">
      <div class="iconify tabler--language" />
    </FHoverBox>
    <FHoverBox tooltip-content="搜索">
      <div class="iconify tabler--search" />
    </FHoverBox>
  </div>
</template>
