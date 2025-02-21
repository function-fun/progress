<template>
  <div id="app">
    <!-- 引入 ProgressList 组件 -->
    <ProgressList />
  </div>
</template>

<script lang="ts" setup>
// 引入 ProgressList 组件
import ProgressList from './components/ProgressList.vue';
</script>

<style lang="scss">
// 引入全局的 SCSS 文件
@use './assets/main.scss' as *;

// 可以在这里添加一些全局样式，例如给 #app 容器设置样式
#app {
  width: 100%;
  height: 100%;
}
</style>