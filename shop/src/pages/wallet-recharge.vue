<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-zoom">
      <div class="l-recharge-money">
        <p class="l-fs-s">充值金额</p>
        <div class="l-flex-h _ipt">
          <span class="l-margin-r-m">￥</span>
          <div class="l-rest">
            <input type="number" maxlength="10">
          </div>
        </div>
        <p class="l-fs-s l-txt-gray l-margin-t">单次充值请勿超过1000元</p>
      </div>
      
      <group title="请选择支付方式">
        <radio :options="payWays" v-model="formData.payWay"></radio>
      </group>
      <br>
      <div class="l-margin">
        <x-button type="primary">立即充值</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
import { Radio } from 'vux'

export default {
  name: 'wallet-recharge',
  components: {
    Radio
  },
  data () {
    return {
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
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.l-recharge-money{
  padding: 20px; background-color: #fff;
  ._ipt{
    padding: 10px 0; border-bottom: 1px solid #eee; font-size: 30px;
    input{
      border:none; width: 100%; font-size: 30px; outline: 0;
    }
  }
}
</style>

