import AliOSS from 'ali-oss'
import dayjs from 'dayjs'
import { buildUUID } from './uuid'

namespace BoleOss {
    export type UploadOptions = {
        /**
         * 上传的文件
         */
        file: File
        /**
         * oss存放文件夹
         */
        fileDirectory?: string
        /**
        * oss上的文件名
        */
        customFileName?: string
        /**
         * 成功回调
         */
        OSSUploadSuccess?: () => any
    }
}

class BoleOss {

    public client;

    constructor(initOptions: AliOSS.Options) {
        this.client = new AliOSS(initOptions);
    }

    async asyncUpload(uploadOptions: BoleOss.UploadOptions) {
        try {
            const { file, fileDirectory = '', customFileName, OSSUploadSuccess } = uploadOptions;
            const dateTime = dayjs().format('YYYY-MM-DD') // 当前时间
            const extensionName = `.${file.name.replace(/.+\./, '')}` // 文件扩展名
            const realFileName = file.name.replace(/\.\w+$/, '')
            const ossFileName = customFileName ?? realFileName;
            const ossSavePath = `${fileDirectory + dateTime}/${ossFileName}_${buildUUID()}${extensionName}`
            const result = await this.client.put(ossSavePath, file);
            console.log('asyncUpload result: ', result);
            return result
        } catch (error) {
            throw error;
        }
    }

    getOssClient() {
        return this.client;
    }

}

export default BoleOss;