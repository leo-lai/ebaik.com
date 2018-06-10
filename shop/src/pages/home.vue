<template>
  <view-box class="l-bg-white">
    <div class="l-search-placeholder">
      <div class="_fixed">
        <div class="_tip" @click="$router.push('/goods/search')">
          <icon type="search"></icon>
          <span>请输入商品名称</span>
        </div>
      </div>
    </div>
    <div class="l-goods-class">
      <div class="_item" v-for="item in goodsClass" :key="item.name" @click="$router.push('/class/goods')">
        <img class="_icon" :src="item.icon" alt="">
        <p class="_txt">{{item.name}}</p>
      </div>
    </div>
    <div class="l-margin-btn">
      <swiper class="l-home-swiper" auto :list="bannerSwiper.list" dots-position="center" :show-desc-mask="false"></swiper>
    </div>
    
    <div class="l-flex-hc l-row-title l-margin-t">
      <h4>店长推荐</h4>
      <div class="l-rest"></div>
      <div class="l-txt-gray l-baseline" @click="$router.push('/class/goods')">
        <span>更多</span>
        <x-icon type="ios-arrow-right" size="20"></x-icon>
      </div>
    </div>
    <div class="l-goods-hot">
      <div class="_item" v-for="item in 4" :key="item" @click="$router.push('/goods/info?id=')">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add" @click.stop="showGoodsInfo(item)"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
    </div>

    <div class="l-flex-hc l-row-title l-margin-t">
      <h4>每天一瓶，有助消化</h4>
      <div class="l-rest"></div>
      <div class="l-txt-gray l-baseline" @click="$router.push('/class/goods')">
        <span>更多</span>
        <x-icon type="ios-arrow-right" size="20"></x-icon>
      </div>
    </div>
    <div class="l-goods-hot">
      <div class="_item" v-for="item in 4" :key="item" @click="$router.push('/goods/info?id=')">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add" @click.stop="showGoodsInfo(item)"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
    </div>

    <!-- 红包 -->
    <div v-transfer-dom>
      <x-dialog v-model="redpack.visible" :dialog-style="{'max-width': '100%', width: '100%', 'background-color': 'transparent'}">
        <div class="l-redpack">
          <div class="_inner">
            <div class="_hd">
              <b class="l-fs-x2">送你5元红包</b>
              <p>赶紧下单使用吧</p>
            </div>
            <div class="_bd">
              <div class="_pack l-flex-hc">
                <div class="_money"><b class="l-rmb">50</b></div>
                <div class="_line"></div>
                <div class="l-rest _desc">
                  <p>限在科学城微米物联大厦使用</p>
                  <p>不限使用类别</p>
                  <p>抵用比例：10%</p>
                  <p>有效期：2018-02-02~2018-12-12</p>
                </div>
              </div>
            </div>
          </div>
          <div class="l-margin-t" @click="redpack.visible = false">
            <x-icon size="40" type="ios-close-outline" style="fill: #fff;"></x-icon>
          </div>
        </div>
      </x-dialog>
    </div>

    <!-- 商品信息 -->
    <div v-transfer-dom>
      <x-dialog v-model="goodsInfo.visible" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', 'background-color': 'transparent'}">
        <div class="l-goods-info">
          <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
          <div class="vux-1px-t _txt">
            <div>
              <div class="_fav">
                <i class="l-icon l-fs-xxl">&#xe648;</i>
                <p class="l-fs-s">收藏</p>
              </div>
              
              <h3 class="l-txt-wrap2">咪咪吓咪咪吓咪咪吓咪咪吓咪咪吓咪咪吓咪咪</h3>
            </div>
            <p class="l-txt-gray l-margin-t-s">
              <span class="l-margin-r">单位：包</span>
              <span class="l-margin-r">规格：5g</span>
            </p>
            <div class="l-margin-t-s">
              <inline-x-number class="_num" :min="1" v-model="goodsInfo.data.num" width="40px" button-style="round"></inline-x-number>
              <span class="l-rmb l-txt-theme l-fs-x2">5.00</span>
            </div>
            <div class="_btn l-txt-center l-margin-tb">
              <x-button type="warn" round mini @click.native="submitShopcar">加入购物车</x-button>
              <span class="l-margin-l"></span>
              <x-button type="primary" round mini @click.native="submitOrder">立即购买</x-button>
            </div>
          </div>
        </div>
        <div class="l-margin-t" @click="goodsInfo.visible = false">
          <x-icon size="40" type="ios-close-outline" style="fill: #fff;"></x-icon>
        </div>
      </x-dialog>
    </div>    

  </view-box>
</template>

<script>
import { Swiper, XDialog, InlineXNumber } from 'vux'
export default {
  name: 'home',
  components: {
    Swiper, XDialog, InlineXNumber
  },
  data () {
    return {
      userInfo: null,
      redpack: {
        visible: false
      },
      goodsInfo: {
        visible: false,
        data: {
          num: 1
        }
      },
      bannerSwiper: {
        list: [
          { 
            url: 'javascript:', 
            img: require('../assets/images/20180531001.jpg'), 
            title: '' 
          }
        ]
      },
      goodsClass: [
        {
          icon: require('../assets/images/icon-001.png'),
          name: '零食'
        },{
          icon: require('../assets/images/icon-002.png'),
          name: '饮料'
        },{
          icon: require('../assets/images/icon-003.png'),
          name: '酒类'
        },{
          icon: require('../assets/images/icon-004.png'),
          name: '香烟'
        },{
          icon: require('../assets/images/icon-005.png'),
          name: '办公'
        },{
          icon: require('../assets/images/icon-006.png'),
          name: '鲜食'
        },{
          icon: require('../assets/images/icon-007.png'),
          name: '水果'
        },{
          icon: require('../assets/images/icon-008.png'),
          name: '生活'
        },{
          icon: require('../assets/images/icon-009.png'),
          name: '肉类'
        },{
          icon: require('../assets/images/icon-010.png'),
          name: '成人'
        }
      ]
    }
  },
  methods: {
    showGoodsInfo() {
      this.goodsInfo.visible = true
    },
    submitShopcar() {
      this.$vux.toast.show({
        text: '已加入购物车'
      })
      this.goodsInfo.visible = false
    },
    submitOrder() {
      this.$router.push('/order/pre?id=')
    }
  },
  mounted() {
    // setTimeout(_ => {
    //   this.redpack.visible = true
    // }, 3000)
  },
  beforeDestroy() {
    // this.$api.abort()
  }
}
</script>

<style>
.l-home-swiper .vux-swiper{height: 140px !important;}
</style>
<style lang="less" scoped>
.l-redpack{
  ._inner{
    background: url('../assets/images/redpack.png') no-repeat 50% 50%; background-size: contain; 
    width: 320px; height: 240px; margin: auto; overflow: hidden;
  }
  ._hd{text-align: center; margin: 30px 0; color: #fff;}
  ._bd{ margin: 42px 15px 0; text-align: left; }
  ._pack{ background-color: #fff; color: @theme-color; border-radius: 5px; }
  ._money{ font-size: 36px; min-width: 90px; text-align: center; }
  ._desc{ font-size: 11px; padding: 5px 5px 5px 10px;}
  ._line{
    background: linear-gradient(0deg, #ddd, #ccc 3px, transparent 3px, transparent);
    background-size: 100% 6px; height: 100px; width: 1px; clear: both;
    position: relative;
    &::before, &::after{
      content: ''; position: absolute; height: 10px; width: 10px;
      border-radius: 50%; left: -5px;
    }
    &::before{ top: -5px; background-color: #b60e59;}
    &::after{ bottom: -5px; background-color: #a31152;}
  }
}

.l-goods-info{
  background-color: #fff; width: 300px; margin: auto; border-radius: 10px;
  ._thumb{display: block; margin: auto; max-width: 100%; width: 200px; height: 200px; background: 50% 50% no-repeat; background-size: 80%;}
  ._txt{padding: 10px 15px; text-align: left; }
  ._fav{
    float: right; font-size: 24px; color: #999; margin: 0 0 0 10px; text-align: center;
    .l-icon{display: block; margin: -3px;}
  }
  ._num{float: right; margin-top: 5px;}
  ._btn{
    .weui-btn{width: 120px;}
  }
}
.l-row-title{padding: 0 15px;}
.l-search-placeholder{
  overflow: hidden;
  ._fixed{position: fixed; top: 46px; width: 100%; z-index: 10; background-color: @theme-color;}
  .weui-icon-search{vertical-align: -2px;}
  ._tip{text-align: center; line-height: 34px; background-color: #fff; color: #999; margin: 5px 10px; font-size: 14px;}
}
.l-goods-class{
  display: flex; flex-flow: row wrap; margin: 10px 0;
  ._item{text-align: center; width: 20%; margin: 5px 0;}
  ._icon{ display: block; margin: auto; width: 40px; height: 40px;}
  ._txt{font-size: 14px; margin-top: 3px;}
}
.l-goods-hot{
  display: flex; flex-flow: row wrap;
  ._item{ width: 21%; margin: 5px 2%; font-size: 12px; margin-bottom: 10px; }
  ._thumb{ display: block; margin: auto; max-width: 100%; width: 100px; height: 80px; background: 50% 50% no-repeat; background-size: 80%; }
  ._txt{margin-top: 3px; color: #999;}
  ._price{color: @theme-color; margin-top: 5px;}
  ._add{float: right; width: 15px; height: 15px; margin-top: 2px; background: url('../assets/images/icon-011.png') 50% 50% no-repeat; background-size: contain;}
}
</style>

