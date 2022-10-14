import { loadEnv } from '@build/index'
const { VITE_OSS_URL } = loadEnv()

export const openLink = (link: string) => {
  const $a: HTMLElement = document.createElement('a')
  $a.setAttribute('href', link)
  $a.setAttribute('target', '_blank')
  $a.setAttribute('rel', 'noreferrer noopener')
  $a.setAttribute('id', 'external')
  document.getElementById('external') &&
    document.body.removeChild(document.getElementById('external'))
  document.body.appendChild($a)
  $a.click()
  $a.remove()
}

export const combineURLs = (baseURL: string, relativeURL: string) => {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

// export const isAbsoluteURL = (url) => {
//   return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url)
// }

export function isAbsoluteURL(path: string): boolean {
  // eslint-disable-next-line no-useless-escape
  // const reg =
  //   /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(path)
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function setOSSLink(url: string) {
  if (!isAbsoluteURL(url)) {
    return combineURLs(VITE_OSS_URL, url)
  }
  return url
}

export function setOssFileName(ossUrl: string) {
  // 取出文件名 去掉上传时生成的随机数
  const fileName = ossUrl.replace(/(.*\/)*([^.]+).*/gi, '$2').replace(/(\w+)*([^_]+).*/gi, '$2')
  // 匹配 . 之前除换行符以外的所有字符替换为""
  const fileType = ossUrl.replace(/.+\./, '')

  return `${fileName}.${fileType}`
}
