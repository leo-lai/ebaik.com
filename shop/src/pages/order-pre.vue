<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-margin l-radius l-bg-white">
      <div class="l-padding l-is-link" @click="$router.push('/address/slter?id=')">
        <div v-if="address">
          <p>
            <span class="l-margin-r">收货人：赖小帅</span>
            <span>18602029524</span>
          </p>
          <p>收货地址：广东省广州市海珠区仑头村委会3号</p>
        </div>
        <div v-else class="l-flex-hc">
          <span>配送地址</span>
          <div class="l-rest"></div>
          <span class="l-txt-gray">请选择</span>
        </div>
      </div>
      <div class="l-h-1px l-margin-lr vux-1px-t"></div>
      <div class="l-padding l-flex-hc l-is-link">
        <span>配送时间</span>
        <div class="l-rest"></div>
        <span class="l-txt-gray">请选择</span>
      </div>
    </div>

    <div class="l-margin l-radius l-bg-white">
      <div class="l-order-item" v-for="item in 1">
        <div class="_hd l-flex-hc">
          <span>商品信息</span>
        </div>
        <div class="_bd">
          <div class="_goods l-flex-hc" v-for="item in 2">
            <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
            <div class="l-rest">
              <p class="l-txt-wrap2">商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事</p>
              <p class="l-txt-gray l-margin-t-s">
                <span class="l-margin-r">规格：5</span>
                <span>单位：包</span>
              </p>
              <p class="l-margin-t-s">
                <span class="l-fr l-txt-gray">x1</span>
                <span class="l-txt-theme l-rmb">19.00</span>
              </p>
            </div>
          </div>
        </div>
        <div class="l-h-1px l-margin-lr vux-1px-t"></div>
        <div class="l-padding l-flex-hc l-is-link" @click="gotoRedpack()">
          <span>红包</span>
          <div class="l-rest"></div>
          <!-- <span class="l-txt-gray">无可用红包</span> -->
          <span class="l-txt-theme">有可用红包</span>
        </div>
        <div class="l-h-1px l-margin-lr vux-1px-t"></div>
        <div class="l-padding">
          <h3><span class="l-fr l-rmb">200.00</span>商品金额</h3>
          <div class="l-txt-gray l-fs-s">
            <p><span class="l-fr">- <i class="l-rmb">10.00</i></span>买一送一</p>
            <p><span class="l-fr">- <i class="l-rmb">10.00</i></span>新注册用户</p>
            <p><span class="l-fr">- <i class="l-rmb">10.00</i></span>使用红包</p>
          </div>
        </div>
      </div>
    </div>

    <div class="l-order-bottom l-margin-t">
      <div class="_inner">
        <div class="l-flex-hc">
          <div class="_price">
            合计金额：
            <span class="l-rmb l-fs-l l-txt-theme">170.00</span>  
          </div>
          <div class="l-rest"></div>
          <x-button class="_primary" type="primary" @click.native="submitOrder()">提交订单</x-button>
        </div>
      </div>
      <div class="_placeholder"></div>
    </div>
  </view-box>
</template>

<script>
import { CheckIcon } from "vux"
export default {
  name: "order-pre",
  components: {
    CheckIcon
  },
  data() {
    return {
      checkAll: false,
      address: 1,
      list: {
        filter: {},
        rows: 50,
        page: 1,
        data: []
      },
    }
  },
  methods: {
    getList() {
      let tempArr = new Array(1,1,1,1,1,1,1,1,1,1)
      this.list.data = tempArr.map((item, index) => {
        return {
          id: index + 1,
          checked: false,
          thumb: require('../assets/images/temp-001.jpg'),
          name: '歌飞龙波尔多红葡萄酒歌飞龙波尔多红葡萄酒',
          num: index + 1,
          price: (150 + index).toFixed(2)
        }
      })
    },
    gotoRedpack() {
      this.$router.push('/redpack?mode=slter')
    },
    submitOrder() {
      this.$router.push('/order/pay?id=')
    }
  },
  mounted() {
    this.getList()
  },
  beforeDestroy() {
    this.$api.abort()
  }
};
</script>

<style lang="less" scoped>
.l-order-bottom{
  ._tip{background-color: #fff; padding: 5px 15px; font-size: 12px;}
  ._inner{position: fixed; bottom: 0; left: 0; right: 0;  background-color: #eee;}
  ._check{margin-left: 10px;}
  ._price{margin: 0 10px;}
  ._primary{width: 100px; font-size: 14px; padding: 7px 20px; border-radius: 0;}
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

