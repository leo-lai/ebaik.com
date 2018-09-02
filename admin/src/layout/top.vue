<template>
  <div id="app">
    <el-container class="l-app" direction="vertical">
      <el-header class="l-header" height="70px">
        <b class="_logo-txt">微米物联内部业务管理系统</b>
      </el-header>
      <el-main class="l-main">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
      <el-footer class="l-copyright" height="40px">
        ©2018 广州微米物联网科技有限公司
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'top-layout',
  data () {
    return {

    }
  },
}
</script>
<style lang="less" scoped>
.l-app{
  height: 100%;
  // background: #2d3a4b url('../assets/images/bg.jpg') no-repeat 50% 50%;
  background-color: #2d3a4b ;
  background-size: cover;
}
.l-copyright{ text-align: center; color: #ccc; font-size: 14px; }
</style>

