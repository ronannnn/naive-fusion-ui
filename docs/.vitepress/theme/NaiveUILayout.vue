<script setup lang="ts">
import { getNaiveColor, saveColorVarsToHtml } from 'naive-fusion-ui'
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted } from 'vue'

const { Layout } = DefaultTheme

const data = useData()

const naiveTheme = computed(() => (data.isDark.value ? darkTheme : undefined))

const themeColor = '#6366f1'
onMounted(() => saveColorVarsToHtml({
  primary: themeColor,
}))
</script>

<template>
  <NConfigProvider
    :theme="naiveTheme"
    :theme-overrides="getNaiveColor(themeColor).value"
  >
    <NMessageProvider>
      <Layout />
    </NMessageProvider>
  </NConfigProvider>
</template>
