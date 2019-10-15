<template>
<!-- //  此组件为最大的组件 根组件 -->
  <div id="app">

  <router-view></router-view>
  </div>
</template>

<style lang="scss">
// 在这里面写样式可以控制到其他组件 可以写一些公共类
 * {
   margin: 0;
   padding: 0;
 }
 html,
 body,
 #app {
   width: 100%;
   height: 100%;
 }
</style>
