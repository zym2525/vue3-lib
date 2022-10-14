<template>
  <div class="upload-wrapper">
    <el-upload action="" :multiple="multiple" list-type="picture-card" :file-list="fileUrl" :auto-upload="true"
      :http-request="fileUploadRequest" :accept="acceptInfo" :limit="limitFileCount" :on-change="handleChange"
      :on-exceed="handleExceed" :before-upload="beforeFileUpload" :limitFileSize="limitFileSize" :class="{
        hideUploadBtn: !canEdit || limitFileCount === fileUrl.length,
      }" ref="imageUpload" :key="timer">
      <template #default>
        <i class="el-icon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor"
              d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z">
            </path>
          </svg>
        </i>
      </template>
      <template #file="{ file }">
        <div class="img-item">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePreview(file)">
              <i class="el-icon el-icon--zoom-in">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                    d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z">
                  </path>
                </svg>
              </i>
            </span>
            <span v-if="canEdit" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon el-icon--delete">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z">
                  </path>
                </svg>
              </i>
            </span>

            <span v-if="canDownload" class="el-upload-list__item-delete" @click="handleDownload(file)">
              <i class="fa fa-download" aria-hidden="true"></i>
            </span>
          </span>
        </div>
      </template>
      <template #tip>
        <div class="el-upload__tip" v-if="canEdit">
          {{ `仅支持${limitFileType.join('/')}，且不超过${limitFileSize}MB` }}
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { FILEMIME } from '@bole-core/core'
import { OssHRSIE } from '@/constants'
import type { UploadFile, UploadRequestOptions } from 'element-plus'
import { errorMessage, warnMessage, downloadFileByUrl } from '@/utils'
import { templateRef } from '@vueuse/core'
import type { PropType } from 'vue'
import { $preview } from '../PreviewFile/preview'
import { useUploadAliyun } from '@/hooks/useUploadAliyun'

export interface MyUploadFile extends UploadFile {
  path: string
}

const props = {
  fileUrl: {
    type: Array as PropType<MyUploadFile[]>,
    default: () => {
      return []
    },
  },
  limitFileCount: {
    type: Number,
    default: 1,
  },
  limitFileSize: {
    type: Number,
    default: 2,
  },
  limitFileType: {
    type: Array,
    default: () => {
      return ['png', 'jpg/jpeg']
    },
  },
  fileDirectory: {
    type: String,
    default: OssHRSIE,
  },

  canEdit: {
    type: Boolean,
    default: true,
  },
  canDownload: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
}
export default defineComponent({
  props: props,
  emits: ['update:fileUrl', 'OSSUploadSuccess'],
  setup(props, { emit }) {
    const state = reactive({
      disabled: false,
      acceptInfo: '',
      ossResult: null,
      timer: new Date().getTime(),
    })
    const refUpload = templateRef<HTMLElement | any>('imageUpload', null)

    watch(
      () => props.limitFileType,
      (newVal: string[]) => {
        const accessType = newVal.map((item) => {
          return FILEMIME[item]
        })

        state.acceptInfo = accessType.join(',')
        return
      },
      { deep: true, immediate: true }
    )

    function beforeFileUpload(file) {
      const { limitFileSize, limitFileType } = props
      const { acceptInfo } = state
      const typeList = acceptInfo.split(',')
      const checkType = typeList.findIndex((item) => file.type === item) !== -1
      const checkSize = file.size / 1024 / 1024 < limitFileSize

      if (!checkType) {
        errorMessage(`上传图片只能是${limitFileType.join('/')}格式!`)
      }
      if (!checkSize) {
        errorMessage(`上传图片大小不能超过${limitFileSize}MB!`)
      }
      return checkType && checkSize
    }
    function fileUploadRequest(fileInfo: UploadRequestOptions) {
      const { file } = fileInfo

      return useUploadAliyun({
        file,
        fileDirectory: props.fileDirectory,
        OSSUploadSuccess: (source) => {
          state.ossResult = source
          emit('OSSUploadSuccess', source, file)
        },
      })
    }
    function handleExceed() {
      warnMessage(`只能选择${props.limitFileCount}个文件！`)
    }
    function handleChange(file, fileList) {
      const { ossResult } = state
      if (ossResult === null) {
        return
      }
      fileList.filter((item) => {
        if (file.uid === item.uid) {
          item.path = ossResult.path
        }
      })
      state.ossResult = null

      emit(
        'update:fileUrl',
        fileList.map((x) => {
          return {
            url: x.response?.fullPath ?? x.url,
            uid: x.response?.uid ?? x.uid,
            path: x.response?.path ?? x.path,
          }
        })
      )
    }
    function handleRemove(file) {
      const { fileUrl } = props
      const index = fileUrl.findIndex((item) => item.path === file.path)
      if (index !== -1) {
        fileUrl.splice(index, 1)
        state.timer = new Date().getTime()
      }
    }

    function handlePreview(file) {
      $preview({
        fileUrl: file.response?.fullPath ?? file.url,
      })
    }

    function handleDownload(file) {
      downloadFileByUrl(file.url || file.response.fullPath, '')
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let fileResult = null
        reader.readAsDataURL(file) //开始转
        reader.onload = function () {
          fileResult = reader.result
        } //转 失败
        reader.onerror = function (error) {
          reject(error)
        } //转 结束  咱就 resolve 出去
        reader.onloadend = function () {
          resolve(fileResult)
        }
      })
    }

    function clearFiles() {
      const $upload = refUpload.value
      $upload.imageUpload.clearFiles()
    }

    return {
      ...toRefs(state),
      beforeFileUpload,
      fileUploadRequest,
      handleExceed,
      handlePreview,
      handleChange,
      handleRemove,
      handleDownload,
      getBase64,
      clearFiles,
    }
  },
})
</script>

<style scoped lang="scss">
.hideUploadBtn :deep(.el-upload--picture-card) {
  display: none;
  /* 上传按钮隐藏 */
}

.img-item {
  position: relative;
  width: 100%;
}

.setup-btn {
  position: absolute;
  bottom: 15px;
  margin-left: calc(50% - 24px);
  font-size: 12px;
  color: #f1f1f1;

  &:hover {
    color: #409eff;
    cursor: pointer;
  }
}

.inset-btn {
  position: absolute;
  bottom: 15px;
  margin-left: calc(50% - 12px);
  font-size: 12px;
  color: #f56c6c;
}

.upload-wrapper {
  line-height: 1;
  width: 100%;

  .el-upload-list__item-thumbnail {
    width: 120px;
    height: 120px;
  }

  :deep(.el-upload-list--picture-card) {
    // display: flex;
    // flex-wrap: wrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;

    .el-upload-list__item {
      margin-bottom: 0px;
      width: 120px;
      height: 120px;
    }
  }

  :deep(.el-upload--picture-card) {
    width: 120px;
    height: 120px;
    line-height: 129px;

    // i {
    //   margin-top: 49px;
    // }
  }
}
</style>
