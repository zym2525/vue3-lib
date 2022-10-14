<script lang="tsx">
//import { FILEMIME } from "@/model/enum";

export default {
  name: 'PreviewOffice',
  props: {
    fileUrl: {
      type: String,
      default: '',
    },
    extension: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => {
      return (
        <div class="office-wrapper">
          <embed
            src={`https://view.officeapps.live.com/op/view.aspx?src=${props.fileUrl}`}
            class="previewBody"
          ></embed>
        </div>
      )
    }
  },
}
</script>

<style lang="scss">
@use '@/style/common.scss' as *;

.preview-office {
  &.el-message-box {
    padding-bottom: 0;
    width: 100%;
    min-width: 630px;
    max-width: 60%;
    .el-message-box__content {
      @include scrollBar;
      overflow: auto;
      padding: 0;
      .office-wrapper {
        height: 80vh;
        .previewBody {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
