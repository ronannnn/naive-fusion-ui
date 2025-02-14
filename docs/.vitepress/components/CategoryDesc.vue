<script setup lang="ts">
import { defineAsyncComponent, h } from 'vue'

const props = withDefaults(defineProps<{
  category: string
  type?: 'demo' | 'example'
}>(), {
  type: 'demo',
})

const Component = defineAsyncComponent({
  loadingComponent: h('div', { class: 'iconify tabler--loader-2 animate-spin' }),
  loader: () => import(`../../components/demos/${props.category}/Desc.vue`),
  timeout: 5000,
  suspensible: false,
})
</script>

<template>
  <div class="mt-2">
    <component :is="Component" />
  </div>
</template>
