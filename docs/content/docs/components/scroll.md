---
title: Scroll
---

# Scroll

<CategoryDesc category="Scroll" />

<br />

<ComponentPreviewGroup
  category="Scroll"
  :components="[
    { name: 'Horizontal', title: '水平滚动' },
  ]"
/>

:::warning
1. 当`<slot />`内容长度小于`<FScroll />`长度时，没有滚动效果
2. Item Class必须要加上`class="whitespace-nowrap"`，否则会换行
:::

<br />

<ComponentPreviewGroup
  category="Scroll"
  :components="[
    { name: 'Vertical', title: '垂直滚动' },
  ]"
/>

:::warning
当`<slot />`内容高度小于`<FScroll />`高度时，没有滚动效果
:::
