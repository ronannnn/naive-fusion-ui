---
title: Tailwindcss Color
---

# Tailwindcss Color

`Naive Fusion UI`自定义了部分颜色
```css
@theme {
  --color-primary: var(--ui-color-primary-500);
  --color-primary-50: var(--ui-color-primary-50);
  --color-primary-100: var(--ui-color-primary-10);
  --color-primary-200: var(--ui-color-primary-200);
  ...
  --color-primary-950: var(--ui-color-primary-950)

  --color-info: ...;
  ...
  --color-success: ...;
  ...
  --color-warning: ...;
  ...
  --color-error: ...;
  ...
}
```

在class中可以这样使用
```js
<div class="bg-info text-primary border-primary-200" />
```

## 使用步骤

### 1. 在`css`文件中添加

```css{2}
@import "tailwindcss";
@import "n-fusion-ui";
```

### 2. 初始化颜色变量

```ts
import { saveColorVarsToHtml } from 'n-fusion-ui'

saveColorVarsToHtml({
  primary: '#6366f1',
  info: 'sky',
  // default values
  // primary: 'blue',
  // info: 'blue',
  // success: 'green',
  // warning: 'yellow',
  // error: 'red',
})
```
:::tip
1. 工作原理就是把`--ui-color-primary-500`写入到`html`的`style`标签中
2. 颜色值可以是来自[Tailwindcss Color](https://tailwindcss.com/docs/colors)的文字，也可以是具体的颜色Hex
   1. `sky`表示`tailwindcss`的`sky`颜色
   2. `#6366f1`表示具体的颜色：输入一个颜色后，其他颜色会计算出来
3. 该函数可用于后续实时修改主题颜色
:::

## 参考文档

- [Tailwindcss Color](https://tailwindcss.com/docs/colors)
- [Nuxt UI Color](https://github.com/nuxt/ui/blob/v3/src/runtime/plugins/colors.ts)
