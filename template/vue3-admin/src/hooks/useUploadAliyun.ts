import { Base64 } from 'js-base64'
import cryptoJs from 'crypto-js'
import axios from 'axios'

import { OssHRSIE } from '@/constants'

import { loadEnv } from '@build/index'
import { setOSSLink, format } from '@/utils'

const { VITE_OSS_URL } = loadEnv()

const host = VITE_OSS_URL

// 计算签名。
function computeSignature(accessKeySecret, canonicalString) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA1(canonicalString, accessKeySecret))
}

export type SourceType = {
  path: string
  fullPath: string
  originFileName?: string
}

const Credentials = {
  AccessKeyId: '',
  AccessKeySecret: '',
}

function getFormDataParams() {
  // const credentials = await axios.get('/getToken')

  // 什么时候执行？
  const date = new Date()
  date.setHours(date.getHours() + 1)

  const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ['content-length-range', 0, 1024 * 1024 * 1024],
    ],
  }

  const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
  const signature = computeSignature(Credentials.AccessKeySecret, policy)
  const formData = {
    OSSAccessKeyId: Credentials.AccessKeyId,
    signature,
    policy,
    // 'x-oss-security-token': credentials.SecurityToken,
  }
  return formData
}

export function useUploadAliyun(option) {
  const { file, fileDirectory = OssHRSIE, customFileName = '', OSSUploadSuccess } = option

  const initFormData = getFormDataParams()

  const dayInfo = format(new Date(), 'YYYYMMDD') // 当前时间-年月日 作为目录的一部分
  const extensionName = `.${file.name.replace(/.+\./, '')}` // 文件扩展名
  const realFileName = file.name.replace(/\.\w+$/, '')

  const msTime = format(new Date(), 'HHmmssSSS') // 当前时间-时分秒 文件唯一,不同名

  const ossFileName = customFileName ? customFileName : realFileName

  const fileName = fileDirectory + dayInfo + '/' + ossFileName + '_' + msTime + extensionName // 文件名字（相对于根目录的路径 + 文件名）

  // 组装发送数据
  const request = new FormData()
  request.append('OSSAccessKeyId', initFormData.OSSAccessKeyId) // Bucket 拥有者的Access Key Id。
  request.append('policy', initFormData.policy) // policy规定了请求的表单域的合法性
  request.append('Signature', initFormData.signature) // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
  // ---以上都是阿里的认证策略
  request.append('name', file.name) // 文件名字，可设置路径
  request.append('key', fileName) // 文件名字，可设置路径
  request.append('success_action_status', '200') // 让服务端返回200,不然，默认会返回204
  request.append('file', file) // 需要上传的文件 file
  //request.append("callback", callbackbody); // 回调，非必选，可以在policy中自定义
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }

  return new Promise((resolve, reject) => {
    axios
      .post(host, request, config)
      .then((res) => {
        if (res.status === 200 || res.request.status === 200) {
          const source = {
            path: fileName,
            fullPath: setOSSLink(fileName),
            originFileName: file.name.replace(/(.*\/)*([^.]+).*/gi, '$2'),
          }
          OSSUploadSuccess && OSSUploadSuccess(source)
          resolve(source)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
