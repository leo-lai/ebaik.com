<template>
  <view-box>
    <div class="l-flex-hc l-search-box">
      <div class="_back" @click="$router.back">
        <x-icon type="ios-arrow-left" size="30"></x-icon>
      </div>
      <div class="l-rest _ipt">
        <icon class="_icon" type="search"></icon>
        <input @focus="filter.visible = true" @blur="filter.visible = false" type="text" placeholder="请输入商品名称" minlength="100">
      </div>
      <span class="l-margin-l">搜索</span>
    </div>

    <div class="l-search-filter" v-show="filter.visible">
      <div class="_hot-city">
        <p class="l-txt-gray">热门搜索</p>
        <checker v-model="list.filter.keywords" default-item-class="l-checker-item" selected-item-class="l-checker-item-slted" @on-change="filter.visible = false">
          <checker-item v-for="item in filter.hotKeywords" :key="item.name" :value="item.name">{{item.name}}</checker-item>
        </checker>
      </div>
    </div>

    <div class="l-result-total">
      水果相关的产品（约<b class="l-txt-theme">20</b>个结果）
    </div>

    <div class="l-goods-item vux-1px-t l-flex-h" v-for="item in 20" :key="item" @click="$router.push('/goods/info?id=')">
      <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-003.jpg') +')' }"></div>
      <div class="l-rest">
        <h3 class="l-txt-wrap2">富士山苹果</h3>
        <p class="l-txt-gray">规格：箱</p>
        <div class="l-margin-t-m">
          <i class="_add" @click.stop="showGoodsInfo(item)"></i>
          <span class="l-rmb l-fs-x2 l-txt-theme">2.50</span>
        </div>
      </div>
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

    <infinite-loading :on-infinite="onInfinite" ref="infinite"></infinite-loading>
  </view-box>
</template>

<script>
import { Checker, CheckerItem, XDialog, InlineXNumber } from 'vux'
import infiniteLoading from '../components/vue-infinite-loading'

export default {
  name: 'search-goods',
  components: {
    Checker, CheckerItem, infiniteLoading, XDialog, InlineXNumber
  },
  data () {
    return {
      goodsInfo: {
        visible: false,
        data: {
          num: 1
        }
      },
      filter: {
        visible: false,
        hotKeywords: [
          { name: '手抓饼' },
          { name: '进口' },
          { name: '面条' },
          { name: '安全食品' },
          { name: '便宜' },
        ],
      },
      list: {
        filter: {
          keywords: ''
        },
        rows: 50,
        page: 1,
        data: []
      }
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
    },
    resetInfinite() {
      this.$refs.infinite.$emit('$InfiniteLoading:reset', false)
      this.onInfinite(1)
    },
    onInfinite(page) {
      this.$refs.infinite.$emit('$InfiniteLoading:complete',)
    }
  }
}
</script>

<style lang="less" scoped>
.l-search-box{
  padding-left: 0; top: 0;
  ._back{color: #fff; padding: 0 10px 0 5px; margin-top: 2px;}
  .vux-x-icon {
    fill: #fff;
  }
}
.l-search-filter{
  position: fixed; top: 46px; bottom: 0; width: 100%; z-index: 10; background-color: #fff;
  ._hot-city{
    padding: 15px 5px 15px 15px;
  }
}

.l-result-total{
  padding: 15px; background-color: #fff; 
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

.l-goods-item{
  padding: 15px; background-color: #fff;
  ._thumb{ width: 80px; height: 80px; margin-right: 10px; background: 50% 50% no-repeat; background-size: contain;}
  ._add{float: right; width: 30px; height: 30px; margin-top: 4px; background: url('../assets/images/icon-011.png') 50% 50% no-repeat; background-size: contain;}
}
</style>

