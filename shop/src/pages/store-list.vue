<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-search-placeholder">
      <div class="l-flex-hc l-search-box">
        <div class="_filter" @click="filter.visible = !filter.visible">
          <span>广州市</span>
          <i class="l-icon">&#xe6ac;</i>
        </div>
        <div class="l-rest _ipt">
          <icon class="_icon" type="search"></icon>
          <input type="text" placeholder="请输入店铺名称">
        </div>
      </div>

      <div class="l-search-filter" v-show="filter.visible">
        <div class="_hot-city">
          <p class="l-txt-gray">快捷选择</p>
          <checker v-model="list.filter.city" default-item-class="l-checker-item" selected-item-class="l-checker-item-slted">
            <checker-item v-for="item in filter.hotCity" :key="item.name" :value="item.name">{{item.name}}</checker-item>
          </checker>
        </div>
      </div>
    </div>

    <div class="l-store-item" v-for="item in 15" :key="item" @click="$router.back()">
      <div class="_hd l-flex-hc">
        <i class="l-icon l-margin-r-s">&#xe641;</i>
        <h4 class="l-txt-wrap1">丰兴广场店</h4>
        <div class="l-rest"></div>
        <span class="l-txt-theme">10m</span>
      </div>
      <div class="_bd">
        广州市天河区天河路24号丰兴广场
      </div>
      <div class="_ft vux-1px-t l-txt-gray">
        营业时间：08:00 ~ 21:00
      </div>
    </div>

    <infinite-loading :on-infinite="onInfinite" ref="infinite"></infinite-loading>
  </view-box>
</template>

<script>
import { Checker, CheckerItem } from 'vux'
import infiniteLoading from '../components/vue-infinite-loading'

export default {
  name: 'store-list',
  components: {
    Checker, CheckerItem, infiniteLoading
  },
  data () {
    return {
      filter: {
        visible: false,
        hotCity: [
          { name: '广州市' },
          { name: '深圳市' },
          { name: '北京市' },
          { name: '上海市' },
          { name: '东莞市' },
        ],
      },
      list: {
        filter: {
          city: ''
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
.l-search-filter{
  position: fixed; top: 90px; bottom: 0; width: 100%; z-index: 10; background-color: #fff;
  ._hot-city{
    padding: 15px 5px 15px 15px;
  }
}

.l-store-item{
  margin: 10px; padding: 0 15px; background-color: #fff;
  ._hd, ._bd, ._ft{padding: 10px 0;}
  ._bd{padding-top: 0;}
}
</style>

