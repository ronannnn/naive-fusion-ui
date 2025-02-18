import type { GlobalThemeOverrides } from 'naive-ui'
import defu from 'defu'
import tailwindColors from 'tailwindcss/colors'
import { computed } from 'vue'
import { useColor } from './colorPalette.ts'

interface ColorVars {
  primary?: string
  info?: string
  success?: string
  warning?: string
  error?: string
}
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const tailwindcssColorsKeys = Object.keys(tailwindColors)
const colorUtil = useColor()

export function getNaiveColor(themeColor: string, colorPrimaryIdx = 6) {
  const themeColorPatternsHex = computed<string[]>(() => colorUtil.generateColorPatternsHex(themeColor))
  const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => (
    {
      common: {
        primaryColor: themeColorPatternsHex.value[colorPrimaryIdx],
        primaryColorHover: themeColorPatternsHex.value[colorPrimaryIdx - 1],
        primaryColorPressed: themeColorPatternsHex.value[colorPrimaryIdx + 1],
        primaryColorSuppl: themeColorPatternsHex.value[colorPrimaryIdx],
      },
    }
  ))
  return naiveThemeOverrides
}

export function saveColorVarsToHtml(colors: ColorVars) {
  const innerColors = defu(colors, {
    primary: 'blue',
    info: 'blue',
    success: 'green',
    warning: 'yellow',
    error: 'red',
  })
  const rootCss = `@layer base {
  :root {
  ${Object.entries(innerColors).map(([key, value]: [string, string]) => {
    // 如果选择了tailwindcss的颜色，那么直接使用
    if (tailwindcssColorsKeys.includes(value)) {
      return generateTailwindcssColorShades(key, value)
    }
    // 自定义颜色
    return generateCustomColorShades(key, value)
  }).join('\n  ')}
  }
}`

  const styleId = 'theme-vars'
  const style: HTMLStyleElement = document.querySelector(`#${styleId}`) || document.createElement('style')
  style.id = styleId
  style.textContent = rootCss
  document.head.appendChild(style)
}

// 生成例子
// key: primary; value: blue
// --ui-color-primary-50: var(--color-blue-50);
// --ui-color-primary-100: var(--color-blue-100);
// --ui-color-primary-200: var(--color-blue-200);
// ...
function generateTailwindcssColorShades(key: string, value: string) {
  return `${shades.map(shade => `--ui-color-${key}-${shade}: var(--color-${value}-${shade});`).join('\n  ')}`
}

// 生成例子
// key: primary; value: #6366F1
// --ui-color-primary-50: #f0f3ffff;
// --ui-color-primary-100: #f0f2ffff;
// --ui-color-primary-200: #e3e6ffff;
// --ui-color-primary-300: #bac0ffff;
// ...
function generateCustomColorShades(key: string, value: string) {
  const rgbTxtList = colorUtil.generateColorPatternsHex(value)
  return `${shades.map((shade, i) => `--ui-color-${key}-${shade}: ${rgbTxtList[i]};`).join('\n  ')}`
}
