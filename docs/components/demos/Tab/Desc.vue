<script setup lang="ts">
import { NA, NText } from 'naive-ui'
import { useRouter } from 'vitepress'

const router = useRouter()
</script>

<template>
  <div>
    基于
    <NA @click="router.go('/docs/components/scroll')">
      <NText code>
        Scroll
      </NText>
    </NA>
    和<NA @click="router.go('/docs/composables/color')">
      <NText code>
        Color
      </NText>
    </NA>
    的定制化标签页
  </div>
</template>
