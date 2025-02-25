<script setup lang="ts">
import defu from 'defu'
import { getNaiveColor, saveColorVarsToHtml } from 'n-fusion-ui'
import { darkTheme, type GlobalThemeOverrides, NConfigProvider, NMessageProvider } from 'naive-ui'
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
const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => (defu(
  getNaiveColor(themeColor).value,
  {
    common: {
      borderRadius: '6px',
    },
    Tag: {
      borderRadius: '6px',
    },
  },
)))
</script>

<template>
  <NConfigProvider
    :theme="naiveTheme"
    :theme-overrides="naiveThemeOverrides"
  >
    <NMessageProvider>
      <Layout />
    </NMessageProvider>
  </NConfigProvider>
</template>
