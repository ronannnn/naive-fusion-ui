<script setup lang="ts">
import { FTooltipButton } from 'naive-fusion-ui'
</script>

<template>
  <div class="flex flex-wrap gap-3 items-end">
    <FTooltipButton
      icon-class="tabler--circle-check"
      type="primary"
      size="large"
      tooltip-content="This is a primary tooltip button"
    >
      Primary
    </FTooltipButton>
    <FTooltipButton
      icon-class="tabler--circle-check"
      type="info"
      secondary
      size="medium"
      circle
      tooltip-content="This is a secondary tooltip button"
    />
    <FTooltipButton
      icon-class="tabler--circle-check"
      type="warning"
      tertiary
      size="small"
      round
      tooltip-content="This is a tertiary tooltip button"
    >
      Tertiary
    </FTooltipButton>
    <FTooltipButton
      icon-class="tabler--circle-check"
      type="error"
      quaternary
      size="tiny"
      tooltip-content="This is a quaternary tooltip button"
    >
      Quaternary
    </FTooltipButton>
  </div>
</template>
