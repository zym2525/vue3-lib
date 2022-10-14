<template>
  <div :class="isDesktop ? 'desktop-no-data' : 'no-data'">
    <img v-if="type == 'content'" :src="noContent" />
    <img v-else-if="type == 'network'" :src="noNetwork" />
    <img v-else :src="noData" />
    <div class="no-data-text">{{ noDataText }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import noContent from '@/assets/noData/no-info.png'
import noNetwork from '@/assets/noData/no-net.png'
import noData from '@/assets/noData/no-data.png'
const NoDataText = {
  content: '暂无内容',
  data: '暂无数据',
  network: '暂无网络',
}
export default defineComponent({
  name: 'NoData',
  props: {
    type: {
      type: String,
      validator: (value: string) => {
        // 这个值必须与下列字符串中的其中一个相匹配
        return ['content', 'data', 'network'].includes(value)
      },
      default: 'data',
    },
    text: {
      type: String,
      default: '',
    },
    isDesktop: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop) {
    const noDataText = computed(() => {
      return prop.text ? prop.text : NoDataText[prop.type]
    })
    return { noDataText, noContent, noData, noNetwork }
  },
})
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  img {
    display: block;
    margin: 0 auto;
  }
  .no-data-text {
    margin-top: 20px;
    font-size: 22px;
    text-align: center;
    color: #67666e;
  }
}
.desktop-no-data {
  padding-bottom: 16px;
  img {
    display: block;
    margin: 0 auto;
    width: 14%;
  }
  .no-data-text {
    font-size: 20px;
    text-align: center;
    color: #67666e;
  }
}
</style>
