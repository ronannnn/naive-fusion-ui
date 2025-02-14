<script setup lang="ts">
import { NCard, NCollapseTransition, NTooltip } from 'naive-ui'
import { codeToHtml } from 'shiki'
import { defineAsyncComponent, h, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  category: string
  name: string
  title: string
  disableCode?: boolean
  type?: 'demo' | 'example'
}>(), {
  type: 'demo',
})

const Component = defineAsyncComponent({
  loadingComponent: h('div', { class: 'iconify tabler--loader-2 animate-spin' }),
  loader: () => import(`../../components/demos/${props.category}/${props.name}/index.vue`),
  timeout: 5000,
  suspensible: false,
})
const showDesc = ref(true)
const Desc = defineAsyncComponent({
  loadingComponent: h('div', { class: 'iconify tabler--loader-2 animate-spin' }),
  loader: () => import(`../../components/demos/${props.category}/${props.name}/Desc.vue`),
  timeout: 5000,
  suspensible: false,
  onError: (error) => {
    console.error(error)
    showDesc.value = false
  },
})

const codeCollapsed = ref(true)

const vueTxt = ref('')
watch(
  () => props.name,
  () => {
    import(`../../components/demos/${props.category}/${props.name}/index.vue?raw`).then(
      (res) => {
        vueTxt.value = res.default
      },
    )
  },
  { immediate: true },
)

const shikiHtml = ref('')
watch(
  () => vueTxt.value,
  async () => {
    shikiHtml.value = await codeToHtml(vueTxt.value, {
      lang: 'vue',
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    })
    shikiHtml.value = shikiHtml.value.replace(`background-color:#ffffff`, `background-color:#f9f9fc`)
  },
  { immediate: true },
)
</script>

<template>
  <NCard :title="title">
    <template v-if="!disableCode" #header-extra>
      <NTooltip>
        <template #trigger>
          <div
            class="iconify cursor-pointer"
            :class="codeCollapsed ? 'tabler--code' : 'tabler--code-off'"
            @click="codeCollapsed = !codeCollapsed"
          />
        </template>
        {{ codeCollapsed ? 'Show code' : 'Hide code' }}
      </NTooltip>
    </template>
    <component :is="Desc" v-if="showDesc" class="mb-3" />
    <component :is="Component" />
    <NCollapseTransition :show="!codeCollapsed">
      <div class="mt-3 p-3 bg-[#f9f9fc] dark:bg-[#121212] rounded-md" v-html="shikiHtml" />
    </NCollapseTransition>
  </NCard>
</template>
