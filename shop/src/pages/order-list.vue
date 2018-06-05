<template>
  <view-box class="l-page-tab">
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-tab">
      <tab line-width="1">
        <tab-item v-for="item in tab.data" :key="item.value" :selected="tab.active == item.value" @click="tabClick(item.value)">{{item.label}}</tab-item>
      </tab>
    </div>

    <div class="l-app-bg l-zoom">
      <div class="l-order-item" v-for="item in 8">
        <div class="_hd l-flex-hc">
          <span>订单类型</span>
          <div class="l-rest l-txt-center">2018-12-12 12:12</div>
          <span class="l-txt-theme">订单状态</span>
        </div>
        <div class="_bd">
          <div class="_goods l-flex-h">
            <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
            <div class="l-rest">
              <p class="l-txt-wrap2">商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事</p>
              <p class="l-txt-gray">规格：5 单位：5</p>
            </div>
            <div class="l-txt-right l-margin-l-m">
              <p>￥19.00</p>
              <p class="l-txt-gray">x1</p>
            </div>
          </div>
          <div class="_goods l-flex-h">
            <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
            <div class="l-rest">
              <p class="l-txt-wrap2">商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事商品名称迪斯科浪费的时刻是犯法的事</p>
              <p class="l-txt-gray">规格：5 单位：5</p>
            </div>
            <div class="l-txt-right l-margin-l-m">
              <p>￥19.00</p>
              <p class="l-txt-gray">x1</p>
            </div>
          </div>
        </div>
        <div class="_total l-flex-hc">
          <span>共2件商品</span>
          <div class="l-rest l-txt-right">
            <span>合计：￥121.00</span>
            <span class="l-margin-l-s">优惠：-￥3.00</span>
            <span class="l-margin-l-s">实收：￥118.00</span>
            
          </div>
        </div>
        <div class="_ft vux-1px-t l-txt-right">
          <x-button round mini plain>评价</x-button>
          <span class="l-margin-l-s"></span>
          <x-button round mini plain>删除</x-button>
        </div>
      </div>
      <infinite-loading :on-infinite="onInfinite" ref="infinite"></infinite-loading>
    </div>
  </view-box>
</template>
<script>
import infiniteLoading from '../components/vue-infinite-loading'
import { Tab, TabItem, Sticky } from 'vux'

export default {
  name: 'order-list',
  components: {
    infiniteLoading, Tab, TabItem, Sticky
  },
  data () {
    return {
      tab: {
        data: [
          { label: '全部', value: 1 },
          { label: '待付款', value: 2 },
          { label: '待发货', value: 3 },
          { label: '待收货', value: 4 },
          { label: '待评价', value: 5 },
        ],
        active: 1
      },
      list: {
        filter: {},
        rows: 50,
        page: 1,
        data: []
      }
    }
  },
  methods: {
    tabClick(value = 1) {
      this.tab.active = value 
    },
    resetInfinite() {
      this.$refs.infinite.$emit('$InfiniteLoading:reset', false)
      this.onInfinite(1)
    },
    onInfinite(page) {
      this.$refs.infinite.$emit('$InfiniteLoading:complete')

      // this.$api.order.getList(this.list.filter, page || this.list.page).then(({data}) => {
      //   let returnList = data.list
        
      //   this.list.data = data.page > 1 ? this.list.data.concat(returnList) : returnList

      //   if(returnList.length > 0){
      //     this.$nextTick(()=>{
      //       this.$refs.infinite.$emit('$InfiniteLoading:loaded')
      //     })
          
      //     if(returnList.length >= data.rows){
      //       this.list.page++
      //     }else{
      //       this.$refs.infinite.$emit('$InfiniteLoading:complete')
      //     }
      //   }else{
      //     this.$refs.infinite.$emit('$InfiniteLoading:complete')
      //   }
      // }).catch(err => {
      //   if(!err.abort) {
      //     this.$refs.infinite.$emit('$InfiniteLoading:complete')
      //   }
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.l-tab{position: fixed; left: 0; right: 0; top: 46px;}
.l-order-item{
  margin-bottom: 10px; background-color: #fff; font-size: 12px;
  ._hd{ padding: 10px;}
  ._goods{
    background-color: #f5f5f5; padding: 10px; margin-bottom: 1px;
    ._thumb{width: 60px; height: 60px; background:#fff 50% 50% no-repeat; background-size: 80%; margin-right: 10px;}
  }
  ._goods::last-child{margin-bottom: 0;}
  ._total{padding: 10px;}
  ._ft{ padding: 10px;}
}
</style>


