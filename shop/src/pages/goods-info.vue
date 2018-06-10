<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg">
      <swiper class="l-goods-swiper" :aspect-ratio="320/320" auto dots-position="center" :show-desc-mask="false">
        <swiper-item v-for="(item, index) in bannerSwiper.list" :key="index">
          <div class="_img" :style="{backgroundImage: 'url(' + item.img +')' }"></div>
        </swiper-item>
      </swiper>
      <div class="l-padding l-bg-white">
        <h3 class="l-margin-b-m">乐事（Lay's）薯片 零食 休闲食品 零食大礼包 580g 整箱装 百事食品</h3>
        <p>
          价格：<i class="l-rmb l-fs-x2 l-txt-theme">180.00</i>
          <badge class="l-margin-l-s" text="包邮"></badge>
        </p>
        <p>市场价：<del class="l-rmb">200.00</del></p>
        <p>原产地：荷兰</p>
        <p>起订量：10</p>
        <p>到货时间：5-10天</p>
      </div>
      <div class="l-bg-white l-margin-t">
        <div class="l-padding-btn">商品详情</div>
        <div>
          <img style="display:block" v-for="item in 2" src="../assets/images/temp-005.jpg">
        </div>
      </div>
    </div>

    <div class="l-goods-bottom l-margin-t">
      <div class="_inner">
        <div class="l-flex-hc">
          <div class="_icon">
            <i class="l-icon l-fs-xxl">&#xe63d;</i>
            <p class="l-fs-s">收藏</p>
          </div>
          <div class="_icon" @click="$router.push('/shop/car')">
            <i class="l-icon l-fs-xxl">&#xe63f;</i>
            <p class="l-fs-s">购物车</p>
          </div>
          <div class="l-rest"></div>
          <x-button class="_btn" type="warn" @click.native="submitShopcar">加入购物车</x-button>
          <span></span>
          <x-button class="_btn" type="primary" @click.native="submitOrder">立即购买</x-button>
        </div>
      </div>
      <div class="_placeholder"></div>
    </div>
  </view-box>
</template>

<script>
import { Swiper, SwiperItem, Badge, InlineXNumber } from 'vux'
export default {
  name: 'goods-info',
  components: {
    Swiper, SwiperItem, Badge, InlineXNumber
  },
  data () {
    return {
      bannerSwiper: {
        list: [
          { 
            url: 'javascript:', 
            img: require('../assets/images/temp-004.jpg'), 
            title: '' 
          },
          { 
            url: 'javascript:', 
            img: require('../assets/images/temp-004.jpg'), 
            title: '' 
          },
          { 
            url: 'javascript:', 
            img: require('../assets/images/temp-004.jpg'), 
            title: '' 
          }
        ]
      },
    }
  },
  methods: {
    submitShopcar() {
      this.$vux.toast.show({
        text: '已加入购物车'
      })
    },
    submitOrder() {
      this.$router.push('/order/pre?id=')
    }
  },
  mounted() {
  }
}
</script>

<style lang="less">
.l-goods-swiper{
  ._img{display: block; width: 100%; height: 100%; background: 50% 50% no-repeat; background-size: contain;}
}
</style>
<style lang="less" scoped>
.l-goods-bottom{
  ._tip{background-color: #fff; padding: 5px 15px; font-size: 12px;}
  ._inner{position: fixed; bottom: 0; left: 0; right: 0;  background-color: #eee;}
  ._btn{width: 120px; font-size: 14px; padding: 7px 0; border-radius: 0;}
  ._btn::after{display: none;}
  ._icon{text-align: center; margin: 3px 10px 0;}
  .l-icon{display: block; margin: -6px;}
  ._placeholder{height: 47px;}
}
</style>

