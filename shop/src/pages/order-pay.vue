<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-pay-money">
      <p class="l-margin-b">
        <span>支付剩余时间：</span>
        <clocker :time="leftTime" format="%M 分 %S 秒"></clocker>
      </p>
      <b class="l-rmb l-fs-40">170.00</b>
    </div>

    <group title="请选择支付方式">
      <radio :options="payWays" v-model="formData.payWay"></radio>
    </group>
    <br>
    <div class="l-margin">
      <x-button class="l-btn-radius" type="primary" @click.native="submitPay">确认支付</x-button>
    </div>
    
  </view-box>
</template>

<script>
import { Radio, Clocker } from 'vux'
export default {
  name: 'order-pay',
  components: {
    Radio, Clocker
  },
  data () {
    return {
      leftTime: '',
      payWays: [
        {
          icon: require('../assets/images/icon-029.png'),
          key: 'wxpay',
          value: '微信支付'
        },
        {
          icon: require('../assets/images/icon-030.png'),
          key: 'alipay',
          value: '支付宝支付'
        }
      ],
      formData: {
        payWay: 'wxpay'
      }
    }
  },
  methods: {
    submitPay() {
      this.$router.push('/order/result')
    }
  },
  mounted() {
    this.leftTime = new Date(Date.now() + (10 * 60 * 1000)).format('yyyy-MM-dd HH:mm:ss')
  }
}
</script>

<style lang="less" scoped>
.l-pay-money{
  background-color: #fff; padding: 60px 0; text-align: center;
  b{font-size: 30px;}
}
</style>

