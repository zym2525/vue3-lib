import dayjs from 'dayjs'
import { BoleRegExp } from '@bole-core/core'
import { round, floor } from 'lodash-es'

export function format(date: string | Date, fmt = 'YYYY-MM-DD') {
  return date ? dayjs(date).format(fmt) : ''
}

export const canPreviewFun = (url: string) => {
  const _can = BoleRegExp.RegCanPreview.test(url)
  BoleRegExp.RegCanPreview.lastIndex = 0
  return _can
}

export function toRound(val: number, num = 2) {
  if (val >= 0) {
    return round(val, num)
  } else {
    const abs = Math.abs(val)
    return 0 - round(abs, num)
  }
}

export function toThousand(input) {
  const num = toRound(Number(input)).toFixed(2)
  if (Number(num) >= 0) {
    return num.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  } else {
    const posNum = (0 - Number(num)).toFixed(2)
    return (
      '-' + posNum.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
    )
  }
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function setTemplateId() {
  return guid().replace(/-/g, '').toUpperCase().slice(0, 16)
}

// 时间 0填充
const timePad = (num) => {
  if (num < 10) {
    num = '0' + num
  }
  return num
}

export const secondsToMinutes = (seconds) => {
  const minutes = floor(seconds / 60)
  const resetSeconds = seconds % 60
  return `${timePad(minutes)}:${timePad(resetSeconds)}`
}

export const hiddenIDNumber = (realIDNumber) =>
  realIDNumber.replace(/^(.{6})(?:\d+)(.{4})$/, '$1********$2')

export const hiddenPhoneNumber = (realPhoneNumbe) =>
  realPhoneNumbe.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2')
