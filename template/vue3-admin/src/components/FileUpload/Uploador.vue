<template>
  <el-upload v-loading="loading" element-loading-text="拼命上传中" element-loading-spinner="el-icon-loading" action=""
    :file-list="fileUrl" :auto-upload="true" :http-request="fileUploadRequest" :before-upload="beforeFileUpload"
    :on-exceed="handleExceed" :on-preview="handlepreview" :on-change="handleChange" :on-remove="handleRemove"
    v-bind="$props" :accept="acceptType" :disabled="disabled" ref="upload">
    <slot name="default"></slot>
    <template v-slot:file="scope">
      <slot name="file" v-bind="scope"></slot>
    </template>
    <template #tip>
      <div class="el-upload__tip" v-if="showTip && !isVideo">
        <span v-if="limitFileSize === 'auto'">
          {{ `仅支持${accept.split(',').join('/')}` }}
        </span>
        <span v-else>
          {{ `仅支持${accept.split(',').join('/')}，且不超过${limitFileSize}MB` }}</span>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts">
//import _Upload from "element-plus/es/components/upload/index";

import { OSSBaseURL, OssHRSIE } from '@/constants'
import { FILEMIME } from '@bole-core/core'
import { canPreviewFun } from '@/utils/common/common'
import { defineComponent, reactive, computed, toRefs } from 'vue'
import type { UploadFile } from 'element-plus'
import type { PropType } from 'vue'
import { errorMessage, warnMessage,downloadFileByUrl } from '@/utils'
import { templateRef } from '@vueuse/core'
import { $preview } from '../PreviewFile/preview'
import { useUploadAliyun } from '@/hooks/useUploadAliyun'

const props = {
  //..._Upload.props,
  accept: {
    type: String,
    default: 'pdf,jpg/jpeg,png,doc,docx,xls,xlsx,zip,tar,gz',
  },
  limitFileSize: {
    type: Number || String,
    default: 500,
  },
  disabled: {
    type: Boolean,
    default: false,
  },

  fileDirectory: {
    type: String,
    default: OssHRSIE,
  },

  fileUrl: {
    type: Array as PropType<UploadFile[]>,
    default: () => {
      return []
    },
  },
  url: {
    type: String,
    default: '',
  },

  showFileList: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
  setCustomFileName: {
    type: Boolean,
    default: true,
  },
  needUploadOss: {
    type: Boolean,
    default: true,
  },
  showTip: {
    type: Boolean,
    default: true,
  },
  isSingle: {
    type: Boolean,
    default: false,
  },
  isVideo: {
    type: Boolean,
    default: false,
  },
}

export default defineComponent({
  name: 'Uploador',
  props: props,
  setup(props, { emit }) {
    const state = reactive({
      ossResult: null,
      loading: false,
    })
    const acceptType = computed(() => {
      if (!props.accept) {
        return ''
      }
      let acceptList = props.accept.split(',').map((s) => FILEMIME[s])
      return acceptList.join(',')
    })

    const refUpload = templateRef<HTMLElement | any>('upload', null)

    function fileUploadRequest(fileInfo) {
      console.log('fileInfo,a: ', fileInfo)
      state.loading = true
      const { file } = fileInfo
      emit('fileChange', file)
      if (!props.needUploadOss) {
        state.loading = false
        return
      }
      return useUploadAliyun({
        file,
        fileDirectory: props.fileDirectory,
        customFileName: props.setCustomFileName ? file.name.replace(/\.\w+$/, '') : '',
        OSSUploadSuccess: (source) => {
          state.ossResult = source
          state.loading = false

          emit('OSSUploadSuccess', source)
        },
      })
    }

    function handleChange(file, fileList) {
      const { ossResult } = state
      if (ossResult === null) {
        return
      }
      if (props.isSingle) {
        emit('update:url', ossResult.path)
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
          if (x.response) {
            return {
              url: x.response.fullPath,
              uid: x.response.uid,
              path: x.response.path,
              name: x.name,
            }
          } else {
            return {
              url: OSSBaseURL + x.path,
              path: x.path,
              name: x.name,
            }
          }
        })
      )
    }

    function handleRemove(file) {
      const { fileUrl } = props
      if (fileUrl.length) {
        const index = fileUrl.findIndex((item) => item.uid === file.uid)
        index !== -1 && fileUrl.splice(index, 1)
      }
      emit('onRemove', file)
    }

    function handleExceed() {
      warnMessage(`只能选择${props.limit}个文件！`)
    }
    function handlepreview(file: UploadFile) {
      //const _url = file.response?.fullPath ?? file.url;
      if (props.isSingle) {
        let _url = file?.url
        let _canPrev = canPreviewFun(_url)
        if (_canPrev) {
          $preview({
            fileUrl: _url,
          })
        } else {
          downloadFileByUrl(_url, '')
        }
      } else {
        const _url = file.url
        const _canPrev = canPreviewFun(_url)
        if (_canPrev) {
          $preview({
            fileUrl: _url,
          })
        } else {
          downloadFileByUrl(_url, '')
        }
      }
    }
    function beforeFileUpload(file) {
      const { limitFileSize, accept, isVideo } = props
      const typeList = acceptType.value.split(',')
      const checkType = typeList.findIndex((item) => file.type === item) !== -1
      const checkSize =
        typeof limitFileSize === 'number'
          ? limitFileSize && file.size / 1024 / 1024 < limitFileSize
          : true

      let target = true
      if (!isVideo) {
        if (accept && !checkType) {
          console.log(acceptType.value, accept)
          errorMessage(`上传文件只能是${accept.replace(/\//gi, ',')}格式!`)
          target = false
        }
        if (!checkSize) {
          errorMessage(`上传文件大小不能超过${limitFileSize}MB!`)
          target = false
        }
      }
      state.loading = false
      return target
    }

    function upload() {
      refUpload.value.$refs['upload-inner'].handleClick()
    }

    function clearFiles() {
      refUpload.value.clearFiles()
    }

    return {
      ...toRefs(state),
      acceptType,
      fileUploadRequest,
      handleChange,
      handleRemove,
      handleExceed,
      handlepreview,
      beforeFileUpload,
      upload,
      clearFiles,
    }
  },
})
</script>

<style lang="scss" scoped>
:deep(.el-list-leave-active) {
  transition: none;
}

:deep(.el-list-enter, .el-list-leave-active) {
  opacity: 0;
}

:deep(.el-upload-list__item) {
  &.is-success.focusing .el-icon-close-tip {
    display: none !important;
  }
}
</style>
