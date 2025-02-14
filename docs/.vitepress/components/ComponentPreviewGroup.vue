<script setup lang="ts">
withDefaults(defineProps<{
  category: string
  components: {
    name: string
    title: string
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
    />
  </div>
</template>
