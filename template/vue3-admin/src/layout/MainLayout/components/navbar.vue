<script setup lang="ts">
import { useNav } from '../hooks/nav'
// import Notice from './notice/index.vue'
import mixNav from './sidebar/mixNav.vue'
import avatars from '@/assets/login/avatar.svg?url'
import Hamburger from './sidebar/hamBurger.vue'

import Breadcrumb from './sidebar/breadCrumb.vue'
// import { deviceDetection } from '@/utils/deviceDetection'
// import screenfull from '../components/screenfull/index.vue'

const { logout, toggleSideBar, pureApp, usename } = useNav()
</script>

<template>
  <div class="navbar">
    <Hamburger
      v-if="pureApp.layout !== 'mix'"
      :is-active="pureApp.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <Breadcrumb v-if="pureApp.layout !== 'mix'" class="breadcrumb-container" />

    <mixNav v-if="pureApp.layout === 'mix'" />

    <div v-if="pureApp.layout === 'vertical'" class="vertical-header-right">
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
.navbar {
  overflow: hidden;
  width: 100%;
  height: 61px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    float: left;
    height: 100%;
    transition: background 0.3s;
    line-height: 61px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .vertical-header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 280px;
    height: 61px;
    color: #000000d9;
    :deep(.dropdown-badge) {
      &:hover {
        background: #f6f6f6;
      }
    }
    .screen-full {
      cursor: pointer;
      &:hover {
        background: #f6f6f6;
      }
    }
    .globalization {
      padding: 11px;
      width: 40px;
      height: 61px;
      cursor: pointer;
      &:hover {
        background: #f6f6f6;
      }
    }
    .el-dropdown-link {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      width: 100px;
      height: 61px;
      color: #000000d9;
      cursor: pointer;
      &:hover {
        background: #f6f6f6;
      }
      p {
        overflow: hidden;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
    .el-icon-setting {
      display: flex;
      align-items: center;
      padding: 12px;
      width: 38px;
      height: 61px;
      cursor: pointer;
      &:hover {
        background: #f6f6f6;
      }
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
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
