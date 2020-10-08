<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-margin l-radius l-bg-white">
      <div class="l-order-item" v-for="item in 1" :key="item">
        <div class="_hd l-flex-hc vux-1px-b">
          <span>订单编号：{{orderInfo.orderId}}</span>
        </div>
        <div class="_bd">
          <div class="_goods l-flex-hc" v-for="item in goodsList" :key="item.orderDetailId">
            <div class="_thumb" :style="{backgroundImage: 'url(' + item.goodsImg +')' }"></div>
            <div class="l-rest">
              <p class="l-txt-wrap2">{{item.goodsName}}</p>
              <!-- <p class="l-txt-gray l-margin-t-s">
                <span class="l-margin-r">规格：5</span>
                <span>单位：包</span>
              </p> -->
              <p class="l-margin-t-s">
                <span class="l-fr l-txt-gray">x{{item.number}}</span>
                <span class="l-txt-theme l-rmb">{{item.priceStr}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <group class="l-margin l-radius l-no-border" title="" gutter="0">
      <radio :options="payWays.list" v-model="payWays.value" :disabled="payWays.disabled">
        <template slot-scope="props" slot="each-item">
          <img :src="props.icon" class="vux-radio-icon">
          <span class="vux-radio-label">{{props.label}}</span>
          <span class="l-txt-gray l-fs-s" v-if="payWays.list[props.index].key === 'wallet'">
            &ensp;余额: ￥{{userInfo.balance}}
            &ensp;礼券: ￥{{userInfo.giveIntegral}}
          </span>
        </template>
      </radio>
    </group>

    <div class="l-margin l-radius l-bg-white">
      <div class="l-padding">
        <h4><span class="l-fr l-rmb">{{orderInfo.amountStr}}</span>商品金额</h4>
        <!-- <div class="l-txt-gray l-fs-s">
          <p><span class="l-fr">- <i class="l-rmb">10.00</i></span>买一送一</p>
          <p><span class="l-fr">- <i class="l-rmb">10.00</i></span>新注册用户</p>
          <p><span class="l-fr">- <i class="l-rmb">10.00</i></span>使用红包</p>
        </div> -->
      </div>
    </div>

    <div class="l-order-bottom l-margin-t">
      <div class="_inner">
        <div class="l-flex-hc">
          <div class="_price">
            应付金额：
            <span class="l-rmb l-fs-l l-txt-theme">{{orderInfo.orderAmountTotalStr}}</span>  
          </div>
          <div class="l-rest"></div>
          <x-button class="_btn" type="primary" @click.native="submitPay">立即支付</x-button>
        </div>
      </div>
      <div class="_placeholder"></div>
    </div>
  </view-box>
</template>

<script>
import { Radio } from 'vux'
const goodsImg = require('../assets/images/image.png')
export default {
  name: 'pay',
  components: { Radio },
  data () {
    return {
      payWays: {
        disabled: false,
        value: 'wallet',
        list: [
          {
            icon: require('../assets/images/icon-020.png'),
            key: 'wallet',
            value: '钱包支付',
          },
          {
            icon: require('../assets/images/icon-029.png'),
            key: 'wxpay',
            value: '微信支付',
          },
          // {
          //   icon: require('../assets/images/icon-030.png'),
          //   key: 'alipay',
          //   value: '支付宝支付'
          // },
        ]
      },
      userInfo: {},
      orderInfo: {},
      goodsList: []
    }
  },
  methods: {
    getOrderInfo() {
      this.$api.loading.show()
      this.$ajax.get('/sys-machineorder/order/get/' + this.orderId).then(({data}) => {
        data.order.orderAmountTotalStr = (data.order.orderAmountTotal / 100).toFixed(2)
        data.order.amountStr = (data.order.amount / 100).toFixed(2)
        this.orderInfo = data.order
        this.goodsList = data.orderDetail.map(item => {
          item.priceStr = (item.price / 100).toFixed(2)
          item.goodsImg = item.goodsImg || goodsImg
          return item
        })
        if(data.order.orderAmountTotal > this.userInfo.total){
          this.payWays.disabled = true
          this.payWays.value = 'wxpay'
        }
      }).finally(() => {
        this.$api.loading.hide()
      })
    },
    submitPay() {
      if(this.payWays.value === 'wxpay') {
        this.$api.loading.show()
        this.$ajax.post('/sys-machinepurchase/weixinorder/weixinPayConf', {
          orderId: this.orderInfo.orderId,
          openid: this.openId
        }).then(({ data }) => {
          if(data.appId) {
            let that = this
            let payConfig = {
              'appId': data.appId,          // 公众号名称，由商户传入
              'timeStamp': data.timeStamp,  // 时间戳，自1970年以来的秒数
              'nonceStr': data.nonceStr,    // 随机串
              'package': data.package,
              'signType': data.signType,  // 微信签名方式：
              'paySign': data.paySign     // 微信签名,paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
            };
            this.$onBridgeReady(function() {
              WeixinJSBridge.invoke('getBrandWCPayRequest', payConfig, function (res) {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                if (res.err_msg.indexOf('get_brand_wcpay_request:ok') > -1) { 
                  this.$router.replace('/pay/result')
                } else if(res.err_msg.indexOf('cancel') === -1){
                  that.$api.alert(res.err_msg)
                }
              })
            })
          }else{
            this.$api.alert('支付失败')
          }
        }).finally(() => {
          this.$api.loading.hide()
        })
      }else if(this.payWays.value === 'wallet'){
        this.$api.loading.show()
        this.$ajax.post('/sys-machinepurchase/order/integralShipment', {
          orderId: this.orderInfo.orderId,
          openid: this.openId,
          id: this.userInfo.id
        }).then(({data}) => {
          if(data.resCode == 0) {
            this.$router.replace('/pay/result')
          }else{
            this.$api.alert(data.resMsg)
          }
        }).finally(() => {
          this.$api.loading.hide()
        })
      }
    }
  },
  mounted() {
    this.organId = this.$storage.session.get('organId')
    this.openId = this.$storage.session.get('openId')
    this.orderId = this.$route.query.orderId || this.$utils.url.getArgs().orderId
    this.$store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo = userInfo || {}
      this.getOrderInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.l-order-bottom{
  ._tip{background-color: #fff; padding: 5px 15px; font-size: 12px;}
  ._inner{position: fixed; bottom: 0; left: 0; right: 0;  background-color: #eee;}
  ._check{margin-left: 10px;}
  ._price{margin: 0 10px;}
  ._btn{width: 100px; font-size: 14px; padding: 7px 20px;}
  ._placeholder{height: 47px;}
}

.l-order-item{
  margin-bottom: 10px; background-color: #fff;
  ._hd{ padding: 10px 15px;}
  ._goods{
    margin: 10px 15px; font-size: 12px;
    ._thumb{width: 80px; height: 80px; background:#fff 50% 50% no-repeat; background-size: 80%; margin-right: 10px;}
  }
  ._goods::last-child{margin-bottom: 0;}
  ._total{padding: 10px 15px;}
}
</style>

