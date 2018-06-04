<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
        <router-link to="/wallet/bill" slot="right">查看明细</router-link>
      </x-header>
    </header>

    <div class="l-app-bg l-bg-white l-zoom">
      <div class="l-wallet-money">
        <img class="_icon" src="../assets/images/icon-028.png" alt="">
        <p class="_txt l-margin-t-s"><b>￥10000.20</b></p>
      </div>

      <div class="l-margin">
        <p class="l-fs-xs l-margin-b-m">充值送积分，快速升级会员等级，享受更多折扣。</p>
        <x-button link="/wallet/recharge" type="primary">充值</x-button>
        <x-button link="/wallet/cash" >提现</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
export default {
  name: 'wallet',
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
.l-wallet-money{
  text-align: center; margin: 60px 15px;
  ._icon{ width: 120px; height: 120px; }
  ._txt{font-size: 40px;}
}
</style>

