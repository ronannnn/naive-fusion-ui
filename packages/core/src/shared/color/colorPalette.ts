import { inputToRGB, rgbaToHex, rgbToHex, rgbToHsv } from '@ctrl/tinycolor'

const hueStep = 2 // 色相阶梯
const saturationStep = 0.16 // 饱和度阶梯，浅色部分
const saturationStep2 = 0.05 // 饱和度阶梯，深色部分
const brightnessStep1 = 0.05 // 亮度阶梯，浅色部分
const brightnessStep2 = 0.15 // 亮度阶梯，深色部分
const lightColorCount = 5 // 浅色数量，主色上
const darkColorCount = 5 // 深色数量，主色下
// 暗色主题颜色映射关系表
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
]

interface HsvObject {
  h: number
  s: number
  v: number
}

export interface RgbObject {
  r: number
  g: number
  b: number
  a?: number
}

function toRgbTxt({ r, g, b, a }: RgbObject): string {
  return a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

// Wrapper function ported from TinyColor.prototype.toHsv
// Keep it here because of `hsv.h * 360`
function toHsv({ r, g, b }: RgbObject): HsvObject {
  const hsv = rgbToHsv(r, g, b)
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v }
}

// Wrapper function ported from TinyColor.prototype.toHexString
// Keep it here because of the prefix `#`
function toHex({ r, g, b, a }: RgbObject): string {
  return a === undefined ? `#${rgbToHex(r, g, b, false)}` : `#${rgbaToHex(r, g, b, a, false)}`
}

function rgbWithA(rgb: RgbObject, a: number): RgbObject {
  return { ...rgb, a }
}

// Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
// Amount in range [0, 1]
// Assume color1 & color2 has no alpha, since the following src code did so.
function mix(rgb1: RgbObject, rgb2: RgbObject, amount: number): RgbObject {
  const p = amount / 100
  const rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
  }
  return rgb
}

function getHue(hsv: HsvObject, i: number, light?: boolean): number {
  let hue: number
  // 根据色相不同，色相转向不同
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240)
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i
  else
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i

  if (hue < 0)
    hue += 360
  else if (hue >= 360)
    hue -= 360

  return hue
}

function getSaturation(hsv: HsvObject, i: number, light?: boolean): number {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0)
    return hsv.s

  let saturation: number
  if (light)
    saturation = hsv.s - saturationStep * i
  else if (i === darkColorCount)
    saturation = hsv.s + saturationStep
  else
    saturation = hsv.s + saturationStep2 * i

  // 边界值修正
  if (saturation > 1)
    saturation = 1

  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1)
    saturation = 0.1

  if (saturation < 0.06)
    saturation = 0.06

  return Number(saturation.toFixed(2))
}

function getValue(hsv: HsvObject, i: number, light?: boolean): number {
  let value: number
  if (light)
    value = hsv.v + brightnessStep1 * i
  else
    value = hsv.v - brightnessStep2 * i

  if (value > 1)
    value = 1

  return Number(value.toFixed(2))
}

interface Opts {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}

function generateColorPatternsRgb(color: string, opts: Opts = {}): RgbObject[] {
  const patterns: RgbObject[] = []
  const pColor = inputToRGB(color)
  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsv = toHsv(pColor)
    const colorRgb = inputToRGB({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true),
    })
    patterns.push(colorRgb)
  }
  patterns.push(pColor)
  for (let i = 1; i <= darkColorCount; i += 1) {
    const hsv = toHsv(pColor)
    const colorRgb = inputToRGB({
      h: getHue(hsv, i),
      s: getSaturation(hsv, i),
      v: getValue(hsv, i),
    })
    patterns.push(colorRgb)
  }

  // dark theme patterns
  if (opts.theme === 'dark') {
    return darkColorMap.map(({ index, opacity }) => {
      const darkColorString = mix(
        inputToRGB(opts.backgroundColor || '#141414'),
        inputToRGB(patterns[index]),
        opacity * 100,
      )
      return darkColorString
    })
  }
  return patterns
}

function generateColorPatternsRgbTxt(color: string, opts: Opts = {}): string[] {
  return generateColorPatternsRgb(color, opts).map(toRgbTxt)
}

function generateColorPatternsHex(color: string, opts: Opts = {}): string[] {
  return generateColorPatternsRgb(color, opts).map(toHex)
}

function hexToRgbaWithOpacity(hex: string, opacity: number = 1): string {
  const rgb = inputToRGB(hex)
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

export function useColor() {
  return {
    rgbWithA,
    toHex,
    generateColorPatternsHex,
    generateColorPatternsRgb,
    generateColorPatternsRgbTxt,
    hexToRgbaWithOpacity,
  }
}
