<script setup lang="ts">
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'

const { Layout } = DefaultTheme

const data = useData()

const naiveTheme = computed(() => (data.isDark.value ? darkTheme : undefined))
</script>

<template>
  <NConfigProvider :theme="naiveTheme">
    <NMessageProvider>
      <Layout />
    </NMessageProvider>
  </NConfigProvider>
</template>
