# Vue规范

## 组合式api

### 组件创建-代码片段

创建文件后，输入vue3-component

```
<template>
  <div></div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'Button',
})

type Props = {

}

const props = withDefaults(defineProps<Props>(), {

})

</script>
  
<style lang="scss" scoped>

</style>

```

### Page创建-代码片段

创建文件后，输入vue3-page

```
<template>
  <div class="app-container">

    <div class="filter-wrapper">
      <div class="filter-list">
        <div class="filter-list-item">

        </div>
      </div>

      <div class="search-btn-wrapper">
        <el-button type="primary"> 查询 </el-button>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">

defineOptions({
  name: 'Button',
})



</script>
  
<style lang="scss" scoped>

</style>
  


```