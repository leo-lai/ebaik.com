<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <group title="">
      <x-input placeholder="手机号码" class="weui-vcode">
        <x-button slot="right" type="primary" mini>获取验证码</x-button>
      </x-input>
      <x-input placeholder="手机验证码"></x-input>
    </group>
    
    <br>
    <div class="l-margin">
      <x-button type="primary" @click.native="submit">立即注册</x-button>
    </div>
    
  </view-box>
</template>

<script>
import { Divider } from 'vux'
export default {
  name: 'register2',
  components: {
    Divider
  },
  data () {
    return {
      
    }
  },
  methods: {
    submit() {
      this.$router.push('/')
    }
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

