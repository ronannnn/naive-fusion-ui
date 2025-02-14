import { customAlphabet } from 'nanoid'
import { isString } from './type'

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)

export function isEmptyString(str: any): boolean {
  if (str === null || str === undefined)
    return true

  if (!isString(str))
    return false

  return str === ''
}

export function NonemptyStringsJoin(strings: any[], delimiter: string = '-'): string {
  return strings.filter(str => !isEmptyString(str)).join(delimiter)
}

export function uniqueShortId(len: number = 5): string {
  return nanoid(len)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[\w\\.]+@(?:[\w-]+\.)+[\w-]{2,4}$/
  return emailRegex.test(email)
}

export function convertToChineseUppercase(num: number): string {
  const units = ['', '拾', '百', '千', '萬', '拾', '百', '千', '億']
  const digits = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖']

  // 处理负数
  if (num < 0)
    return `负${convertToChineseUppercase(-num)}`

  // 将数字分为整数部分和小数部分
  const [integerPart, decimalPart] = String(num).split('.')

  // 处理整数部分
  let result = ''
  let isPreviousZero = false

  const len = integerPart?.length ?? 0

  for (let i = 0; i < len; i++) {
    const digit = Number.parseInt(integerPart?.[i] ?? '', 10)
    const unitPosition = len - i - 1 // 从右到左的单位位置

    if (digit !== 0) {
      if (isPreviousZero) {
        result += digits[0] // 添加零
        isPreviousZero = false
      }
      result += (digits[digit] ?? '') + (units[unitPosition] ?? '')
    }
    else {
      isPreviousZero = true
    }
  }

  // 处理最后的“万”或“亿”
  if (result.endsWith(digits[0] ?? '')) {
    result = result.slice(0, -1) // 去掉最后的零
  }

  // 处理小数部分
  if (decimalPart) {
    result += '点' // 添加小数点
    for (let j = 0; j < decimalPart.length; j++) {
      const decimalDigit = Number.parseInt(decimalPart?.[j] ?? '', 10)
      result += digits[decimalDigit]
    }
    return `${result}元`
  }
  else {
    return `${result}元整`
  }
}
