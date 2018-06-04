<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
        <a slot="right">注册</a>
      </x-header>
    </header>
    <div class="l-login-logo">
      <img width="30%" src="../assets/images/20180602004.png" alt="">
      <p class="l-txt-gray l-fs-l l-margin-t-m">欢迎您回来，么么哒</p>
    </div>

    <group title="">
      <x-input placeholder="手机号码" class="weui-vcode">
        <x-button slot="right" type="primary" mini>获取验证码</x-button>
      </x-input>
      <x-input placeholder="手机验证码"></x-input>
    </group>
    
    <br>
    <div class="l-margin">
      <x-button type="primary">登录</x-button>
    </div>
    <br>
    <div class="l-txt-center" style="width: 60%; margin: auto;">
      <divider>合作账号登录</divider>
      <i class="l-icon l-fs-40 l-txt-green">&#xe606;</i>
    </div>
    
  </view-box>
</template>

<script>
import { Divider } from 'vux'
export default {
  name: 'login',
  components: {
    Divider
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
  }
}
</script>

<style lang="less">
.l-login-logo{
  text-align: center; margin: 60px 15px; 
}
</style>

