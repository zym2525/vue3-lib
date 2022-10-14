import { format } from '@/utils'
import { BoleRegExp, FILEMIME } from '@bole-core/core'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export function downloadFile(data, fileName, fileSuffix) {
  // const name = fileName + '_' + format(new Date(), "yyyyMMddhhmmss") + '.' + fileSuffix
  // saveAs(data, name);

  const blob = new Blob([data], { type: FILEMIME[fileSuffix] })
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName + '_' + format(new Date(), 'YYYYMMDDhhmmss') + '.' + fileSuffix //命名下载名称
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob) //表示一个指定的file对象或Blob对象
    document.body.appendChild(elink)
    elink.click() //点击触发下载
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    //navigator.msSaveBlob 废弃;
    // navigator.msSaveBlob(
    //   blob,
    //   fileName + "_" + format(new Date(), "yyyyMMDDhhmmss") + "." + fileSuffix
    // );
    return false
  }
}

export function downloadFileByUrl(fileUrl, fileName) {
  //const suffix = /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileUrl)[1];
  const suffix = /\.([0-9a-z]+)(?:[#]|$)/i.exec(fileUrl)[1]
  let name = fileName ? fileName : fileUrl.replace(BoleRegExp.RegFileName, '$2')
  name += `.${suffix}`
  saveAs(fileUrl, name)
  return
  // if (/pdf/gi.test(suffix)) {
  //   handlePdfLink(fileUrl, name);
  // } else {
  //   handleFileDownload(fileUrl, name);
  // }
}
export const handleFileSaver = (file, name) => {
  saveAs(file, name)
  console.log(file, name)
}
export function handleFileDownload(url, filename) {
  // 创建 a 标签
  const elink = document.createElement('a') // 创建a标签
  elink.style.display = 'none'
  elink.download = filename // 设置下载文件的文件名
  elink.href = url // content为后台返回的下载地址
  document.body.appendChild(elink)
  elink.click() // 设置点击事件
  URL.revokeObjectURL(elink.href) // 释放URL 对象
  document.body.removeChild(elink)
}

export const getFileByBlob = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'get',
      //responseType: "blob"
    })
      .then(function (res) {
        if (res.status !== 200) {
          return res.json()
        }
        return res.blob()
      })
      .then((blobRes) => {
        resolve(blobRes)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const downloadWithZip = (fileList, zipName, callback) => {
  if (fileList.length === 0) {
    return
  }
  const zip = new JSZip()

  Promise.resolve()
    .then(() => {
      return fileList.reduce((accumulator, fileInfo) => {
        let newName = ''
        if (typeof fileInfo !== 'string') {
          newName = fileInfo.newName
          fileInfo = fileInfo.url
        }

        // eslint-disable-next-line no-useless-escape
        const suffix = /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileInfo)[1]
        let name = newName || fileInfo.replace(BoleRegExp.RegFileName, '$2')
        name += `.${suffix}`

        return accumulator.then(() =>
          fetch(fileInfo)
            .then((resp) => resp.blob())
            .then((blob) => {
              zip.file(name, blob)
            })
        )
      }, Promise.resolve())
    })
    .then(() => {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        // 生成二进制流
        downloadFile(content, zipName, 'zip')
        callback && callback()
      })
    })
}
