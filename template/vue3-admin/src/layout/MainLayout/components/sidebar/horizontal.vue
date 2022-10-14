<script setup lang="ts">
import { useNav } from '../../hooks/nav'
// import Notice from '../notice/index.vue'
import { templateRef } from '@vueuse/core'
import SidebarItem from './sidebarItem.vue'
import avatars from '@/assets/login/avatar.svg'
// import screenfull from '../screenfull/index.vue'
import { useRoute, useRouter } from 'vue-router'
// import { deviceDetection } from '@/utils'
import { watch, nextTick, onMounted, getCurrentInstance } from 'vue'
import { usePermissionStoreHook } from '@/store/modules/permission'

const route = useRoute()
const routers = useRouter().options.routes
const menuRef = templateRef<ElRef | null>('menu', null)

const title = getCurrentInstance().appContext.config.globalProperties.$config?.Title

const { logout, backHome, handleResize, menuSelect, usename } = useNav()

onMounted(() => {
  nextTick(() => {
    handleResize(menuRef.value)
  })
})

watch(
  () => route.path,
  () => {
    menuSelect(route.path, routers)
  }
)
</script>

<template>
  <div class="horizontal-header">
    <div class="horizontal-header-left" @click="backHome">
      <!-- <FontIcon
        icon="team-iconlogo"
        svg
        style="width: 35px; height: 35px"
      ></FontIcon> -->
      <h4>{{ title }}</h4>
    </div>
    <el-menu
      ref="menu"
      class="horizontal-header-menu"
      mode="horizontal"
      :default-active="route.path"
      router
      @select="(indexPath) => menuSelect(indexPath, routers)"
    >
      <sidebar-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 通知 -->
      <!-- <Notice id="header-notice" /> -->
      <!-- 全屏 -->
      <!-- <screenfull id="header-screenfull" v-show="!deviceDetection()" /> -->

      <!-- 退出登陆 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="avatars" />
          <p>{{ usename }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline
                icon="logout-circle-r-line"
                style="margin: 5px"
              />退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.translation {
  :deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }
  .check-zh {
    position: absolute;
    left: 20px;
  }
  .check-en {
    position: absolute;
    left: 20px;
  }
}
.logout {
  max-width: 120px;
  :deep(.el-dropdown-menu__item) {
    display: inline-flex;
    min-width: 100%;
    flex-wrap: wrap;
  }
}
</style>
