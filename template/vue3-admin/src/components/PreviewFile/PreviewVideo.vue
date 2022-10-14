<script lang="tsx">
// import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import { VideoPlayer } from '@videojs-player/vue'

import { reactive } from 'vue'

export default {
  name: 'PreviewVideo',
  components: {
    VideoPlayer,
  },
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
    const state = reactive({
      playerOptions: {
        aspectRatio: '16:9',
        autoplay: false,
        muted: false,
        language: 'en',
        fluid: false,
        sources: [
          {
            type: 'video/mp4', // 类型
            src: '', // url地址
          },
        ],
        poster: '', // 封面地址
        controls: true,
        controlBar: {
          timeDivider: false, // 当前时间和持续时间的分隔符
          durationDisplay: false, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    })
    return () => {
      state.playerOptions.sources[0].src = props.fileUrl
      return (
        <div class="player-wrapper perview-video-wrapper">
          <video-player
            class="vjs-custom-skin"
            ref="videoPlayer"
            playsinline={true}
            options={state.playerOptions}
          />
        </div>
      )
    }
  },
}
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;
@import '@/style/components/player.scss';
.preview-pdf {
  &.el-message-box {
    width: 60%;
    min-width: 300px;
    max-width: 60%;
    .el-message-box__content {
      @include scrollBar;
      overflow: auto;
      max-height: 80vh;
    }
  }
}
</style>
