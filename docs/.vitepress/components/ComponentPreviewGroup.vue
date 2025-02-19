<script setup lang="ts">
withDefaults(defineProps<{
  category: string
  components: {
    name: string
    title: string
    resizable?: boolean
    resizableContainerHeight?: number
  }[]
  type?: 'demo' | 'example'
}>(), {
  type: 'demo',
})
</script>

<template>
  <div class="space-y-6">
    <ComponentPreview
      v-for="(component) in components"
      :key="component.name"
      :category="category"
      :name="component.name"
      :title="`${component.title}`"
      :resizable="component.resizable"
      :resizable-container-height="component.resizableContainerHeight"
    />
  </div>
</template>
