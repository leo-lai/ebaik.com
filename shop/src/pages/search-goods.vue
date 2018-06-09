<template>
  <view-box>
    <div class="l-flex-hc l-search-box">
      <div class="_back" @click="$router.back()">
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

    <div class="l-goods-item vux-1px-t l-flex-h" v-for="item in 20" :key="item">
      <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-003.jpg') +')' }"></div>
      <div class="l-rest">
        <h3 class="l-txt-wrap2">富士山苹果</h3>
        <p class="l-txt-gray">规格：箱</p>
        <div class="l-margin-t-m">
          <i class="_add"></i>
          <span class="l-rmb l-fs-x2 l-txt-theme">2.50</span>
        </div>
      </div>
    </div>


    <infinite-loading :on-infinite="onInfinite" ref="infinite"></infinite-loading>
  </view-box>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import infiniteLoading from '../components/vue-infinite-loading'

export default {
  name: 'search-goods',
  components: {
    Checker, CheckerItem, infiniteLoading
  },
  data () {
    return {
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
.l-goods-item{
  padding: 15px; background-color: #fff;
  ._thumb{ width: 80px; height: 80px; margin-right: 10px; background: 50% 50% no-repeat; background-size: contain;}
  ._add{float: right; width: 30px; height: 30px; margin-top: 4px; background: url('../assets/images/icon-011.png') 50% 50% no-repeat; background-size: contain;}
}
</style>

