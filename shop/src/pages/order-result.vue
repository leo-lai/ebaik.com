<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-txt-center">
      <div class="l-result-icon">
        <img src="../assets/images/20180609001.png">
        <p>宜百客店小二正在<br>快马加鞭为您送货</p>
      </div>
      <p class="l-margin-t l-fs-x2"><b>您已下单成功</b></p>
    </div>
    <br>
    <div class="l-margin">
      <x-button link="/" type="primary">继续购买</x-button>
      <x-button link="/order/list">查看订单</x-button>
    </div>
  </view-box>
</template>

<script>
export default {
  name: 'demo',
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

<style lang="less" scoped>
.l-result-icon{
  width: 200px; height: 200px; border-radius: 50%; background-color: #fff;
  text-align: center; margin: 30px auto; overflow: hidden;
  img{display: block; margin: 20px auto 5px; width: 100px; height: 100px;}
}
</style>

