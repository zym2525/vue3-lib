<template>
  <router-view v-slot="{ Component, route }">
    <transition name="zoom-fade" mode="out-in" appear>
      <div :key="route.fullPath">
        <keep-alive v-if="isKeepAlive">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
const isKeepAlive: Boolean = currentRoute.value.meta?.keepAlive as boolean

// const bg_img = {}
</script>
