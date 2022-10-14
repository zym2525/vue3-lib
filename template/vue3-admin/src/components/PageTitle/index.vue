<template>
  <div
    class="chunk_container"
    :class="full ? 'full_container' : bottom ? 'bottom_container' : ''"
    :style="{
      padding: specialTitle ? '0' : '20px',
      marginBottom: specialTitle ? '10px' : bottom ? '0px' : '16px',
    }"
  >
    <el-row
      type="flex"
      justify="space-between"
      :style="{ 'margin-bottom': titleMarginBottom + 'px' }"
    >
      <div v-if="specialTitle" :class="isSystem ? 'system-special-title' : 'special-title'">
        <slot name="right-header"></slot>
      </div>

      <div>
        <span v-if="title" class="title">
          {{ title }}
        </span>

        <slot name="info"></slot>
      </div>
      <div class="handlerBtn">
        <slot name="btn" />
      </div>
    </el-row>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'container',
  props: {
    title: {
      type: String,
      default: '',
    },
    full: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    titleMarginBottom: {
      type: Number,
      default: 0,
    },
    specialTitle: {
      type: String,
      default: '',
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.chunk_container {
  position: relative;
  margin-bottom: 16px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 5px 0px rgba(112, 114, 117, 0.3);
  flex: 1;
}
.full_container {
  min-height: calc(100vh - 111px);
}
.title {
  height: 23px;
  font-size: 23px;
  font-weight: 400;
  color: #333333;
}
.special-title {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
}
.system-special-title {
  display: flex;
  padding: 20px;
  width: 100%;
}
</style>

<style lang="scss">
.chunk_container {
  &:last-child {
    margin-bottom: 0;
    flex: 1;
  }
}
</style>
