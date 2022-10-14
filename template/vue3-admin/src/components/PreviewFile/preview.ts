import _ from 'lodash-es'
import PreviewImage from './previewImage.vue'
import PreviewOffice from './previewOffice.vue'
import PreviewVideo from './PreviewVideo.vue'
import { ElMessageBox } from 'element-plus'
import { h } from 'vue'

import { OSSBaseURL } from '@/constants'
import { isExternal } from '@/utils'

//判断视频
export function isPreviewVideo(extension) {
  return /mp4|avi|wmv|flv|f4v|m3u8/gi.test(extension)
}

//判断图片
export function isPreviewImage(extension) {
  return /png|jpg|jpeg/gi.test(extension)
}

//判断文档
export function isPreviewDoc(extension) {
  return /doc|docx|ppsx|xlsx|xls/gi.test(extension)
}

export function isPreviewPdf(extension) {
  return /pdf/gi.test(extension)
}
export function isPreviewTxt(extension) {
  return /txt/gi.test(extension)
}

//判断音频
export function isPreviewAudio(extension) {
  return /mp3/gi.test(extension)
}

//判断PPT
export function isPreviewPpt(extension) {
  return /ppt|pptx/gi.test(extension)
}

export function $preview({ fileUrl, title = '', isQrImage = false }) {
  fileUrl = isExternal(OSSBaseURL) ? fileUrl : OSSBaseURL + '/' + fileUrl

  try {
    const extension = _.last(fileUrl.split('.'))
    if (isPreviewImage(extension)) {
      ElMessageBox({
        title: title || '图片',
        message: h(PreviewImage, {
          extension,
          fileUrl,
        }),
        customClass: `preview-image ${isQrImage && 'Qr-image'}`,
        showConfirmButton: false,
      }).catch(() => { })
    } else if (isPreviewPdf(extension)) {
      window.open(fileUrl, '“_blank”')
    } else if (isPreviewTxt(extension)) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', fileUrl, false) // 文件路径
      xhr.overrideMimeType('application/json;charset=utf-8') //默认为utf-8
      xhr.send(null)
      const datas = window.URL.createObjectURL(
        new Blob([xhr.responseText], { type: 'application/json;charset=utf-8' })
      )
      window.open(datas, '“_blank”')
    } else if (isPreviewVideo(extension)) {
      ElMessageBox({
        title: title || '预览',
        message: h(PreviewVideo, {
          extension,
          fileUrl,
        }),
        customClass: 'preview-video',
        showConfirmButton: false,
        // beforeClose: function (action, instance, done) {
        //   if (instance.$children[2]) {
        //     const vp = instance.$children[2].$refs["videoPlayer"];
        //     vp.player && vp.player.pause();
        //   }
        //   done();
        // }
      }).catch(() => { })
    } else {
      ElMessageBox({
        title: title || '预览',
        message: h(PreviewOffice, {
          extension,
          fileUrl,
        }),
        customClass: 'preview-office',
        showConfirmButton: false,
      }).catch(() => { })
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
