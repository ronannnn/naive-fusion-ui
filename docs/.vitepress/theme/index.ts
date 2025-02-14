import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import CategoryDesc from '../components/CategoryDesc.vue'
import ComponentPreview from '../components/ComponentPreview.vue'
import ComponentPreviewGroup from '../components/ComponentPreviewGroup.vue'
import NaiveUILayout from './NaiveUILayout.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  Layout: NaiveUILayout,
  enhanceApp({ app }) {
    app.component('CategoryDesc', CategoryDesc)
    app.component('ComponentPreview', ComponentPreview)
    app.component('ComponentPreviewGroup', ComponentPreviewGroup)
  },
} satisfies Theme
