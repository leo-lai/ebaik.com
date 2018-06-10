<template>
  <view-box class="l-scroll-bg l-no-padding">
    <header id="page-view-header" class="l-bg-none">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
        <router-link to="/goods/search" slot="right">
          <x-icon type="ios-search" size="30"></x-icon>
        </router-link>
      </x-header>
    </header>

    <div class="l-page-banner">
      <img src="../assets/images/20180609002.jpg">
    </div>

    <div class="l-list-filter l-sticky">
      <div class="_inner l-flex-hc">
        <div class="_item" @click="filterClick('types')">
          <span>{{typesName}}</span>
          <i class="l-icon">&#xe6ac;</i>
        </div>
        <div class="_line vux-1px-l"></div>
        <div class="_item" @click="filterClick('sorts')">
          <span>{{sortsName}}</span>
          <i class="l-icon">&#xe6ac;</i>
        </div>
        <div class="l-rest"></div>
        <span class="l-icon l-fs-xxl">&#xe628;</span>
      </div>
      <div class="_down" v-show="filter.visible">
        <group gutter="0" v-show="filter.current === 'types'">
          <radio v-model="list.filter.types" :options="filter.types"></radio>
        </group>
        <group gutter="0" v-show="filter.current === 'sorts'">
          <radio v-model="list.filter.sorts" :options="filter.sorts"></radio>
        </group>
        <div class="_layer" @click="filter.visible = false"></div>
      </div>
    </div>

    <div class="l-app-bg l-zoom">
      <div class="l-goods-item vux-1px-t l-flex-h" v-for="item in 10" :key="item">
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
    </div>
  </view-box>
</template>

<script>
import { Sticky, Radio } from 'vux'
import infiniteLoading from '../components/vue-infinite-loading'

export default {
  name: 'search-goods',
  components: {
    Sticky, Radio, infiniteLoading
  },
  data () {
    return {
      filter: {
        visible: false,
        current: '',
        types: [
          { key: '1', value: '全部' },
          { key: '2', value: '新鲜水果' },
          { key: '3', value: '包装水果' },
        ],
        sorts: [
          { key: '1', value: '智能排序' },
          { key: '2', value: '价格排序' },
          { key: '3', value: '销量排序' },
        ],
      },
      list: {
        filter: {
          types: '1',
          sorts: '1',
          keywords: ''
        },
        rows: 50,
        page: 1,
        data: []
      }
    }
  },
  computed: {
    typesName() {
      return this.filter.types.filter(item => item.key === this.list.filter.types)[0].value
    },
    sortsName() {
      return this.filter.sorts.filter(item => item.key === this.list.filter.sorts)[0].value
    }
  },
  methods: {
    filterClick(type = 'types') {
      this.filter.visible = true
      this.filter.current = type
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
.l-goods-item{
  padding: 15px; background-color: #fff;
  ._thumb{ width: 80px; height: 80px; margin-right: 10px; background: 50% 50% no-repeat; background-size: contain;}
  ._add{float: right; width: 30px; height: 30px; margin-top: 4px; background: url('../assets/images/icon-011.png') 50% 50% no-repeat; background-size: contain;}
}

.l-page-banner{
  img{display: block; width: 100%;}
}
.l-app-bg{min-height: 667px;}
.l-list-filter{
  height: 46px; 
  ._item{ }
  ._inner{ height: 46px; background-color: #fff; padding: 0 15px; }
  ._line{ width: 1px; height: 10px; margin: 0 15px; }
  ._down{ position: relative; z-index: 1; }
  ._layer{
    background-color: rgba(0, 0, 0, 0.3);
    height: 667px;
    width: 100%;
  }
  .weui-cells_radio{font-size: 14px;}
}
</style>

