<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import logo from '@/assets/logo.png'
import logo_small from '@/assets/logo_small.png'
const props = defineProps({
  collapse: Boolean,
})

const title = getCurrentInstance().appContext.config.globalProperties.$config?.Title
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebarLogoFade" style="padding: 0">
      <router-link
        v-if="props.collapse"
        key="props.collapse"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <img style="margin: 4px 0; width: 32px" :src="logo_small" />
      </router-link>
      <router-link v-else key="expand" :title="title" class="sidebar-logo-link" to="/">
        <img style="margin-left: 14px" :src="logo" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  overflow: hidden;
  padding: 10px;
  width: 100%;
  text-align: center;
  .sidebar-logo-link {
    overflow: hidden;
    height: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
