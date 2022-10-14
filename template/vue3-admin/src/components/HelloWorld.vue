<script setup lang="ts">
import SvgTestComponent from '@/assets/svgIcons/dir/test2.svg?component'
import svgTestUrl from '@/assets/svgIcons/dir/test2.svg?url'

defineProps<{ msg: string }>()
</script>

<template>
  <svg-test-component width="200" height="200" viewBox="0 0 1024 1024" />
  <img :src="svgTestUrl" width="200" height="200" />
  <svg-test-component width="200" height="200" viewBox="0 0 1024 1024" />

  <h1>{{ msg }}</h1>

  <svg aria-hidden="true">
    <use :href="'#icon-test'" />
  </svg>

  <svg aria-hidden="true">
    <use :href="'#icon-dir-test2'" />
  </svg>

  <IconifyIconOffline icon="tickets" />

  <FontIcon :title="'全屏'" :icon="'team-iconfullscreen'" />

  <SvgIcon iconClass="test" />
</template>

<style scoped>
.read-the-docs {
  color: #888888;
  background-color: red;
}
</style>
