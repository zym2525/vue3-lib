<script lang="tsx">
const props = {
  fileUrl: {
    type: String,
    default: '',
  },
  extension: {
    type: String,
    default: '',
  },
}

export default {
  name: 'PreviewImage',
  props: props,
  setup(props) {
    return () => {
      return (
        <div class="image-wrapper">
          <img width="100%" src={props.fileUrl} />
        </div>
      )
    }
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.preview-image {
  &.el-message-box {
    width: auto;
    min-width: 300px;
    max-width: 60%;
    .el-message-box__content {
      @include scrollBar;
      overflow: auto;
      max-height: 80vh;
      img {
        width: 100%;
      }
    }
  }
}
.Qr-image {
  &.el-message-box {
    width: auto;
    min-width: 300px;
    max-width: 60%;
    .el-message-box__title {
      max-width: 340px;
      font-weight: bold;
      color: #303133;
    }
  }
}
</style>
