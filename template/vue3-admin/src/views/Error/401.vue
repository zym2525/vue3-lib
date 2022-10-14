<script setup lang="ts">
import imgs from '@/assets/401.gif'
import { ref } from 'vue'

const img = ref(`${imgs}?${new Date()}`)
</script>

<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Pure Admin</h1>
        <h2>你没有权限去该页面</h2>
      </el-col>
      <el-col :span="12">
        <img :src="img" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.errPage-container {
  margin: 100px auto;
  width: 800px;
  max-width: 100%;
  .pan-back-btn {
    border: none !important;
    color: #ffffff;
    background: #008489;
  }
  .pan-gif {
    display: block;
    margin: 0 auto;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      text-decoration: none;
      color: #008489;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
