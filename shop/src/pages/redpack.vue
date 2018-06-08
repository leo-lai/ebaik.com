<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-zoom">
      <div class="l-redpack-item" v-for="item in list.data" :key="item.id">
        <div class="_bd l-flex-hc">
          <div class="_money">
            <b class="l-rmb l-txt-theme l-fs-x2">{{item.money}}</b>
            <p class="l-fs-s">限消费金额10%</p>
          </div>
          <div class="l-rest">
            <h3>{{item.title}}</h3>
            <div class="l-fs-s l-margin-t-s">
              <p>限2018-01-26当天使用</p>
              <p>限收货手机号为18622222222</p>
            </div>
          </div>
          <div class="_check" v-if="mode === 'slter'">
            <check-icon :value.sync="item.checked"></check-icon>
          </div>
        </div>
        <div class="_line"></div>
        <div class="_ft l-fs-s l-flex-hc">
          <span>限品类：果蔬生鲜</span>
          <div class="l-rest"></div>
          <span>仅限在微米物联大厦店使用</span>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { CheckIcon } from 'vux'
export default {
  name: 'redpack',
  components: {
    CheckIcon
  },
  data () {
    return {
      mode: 'list',
      list: {
        filter: {},
        rows: 50,
        page: 1,
        data: []
      }
    }
  },
  methods: {
    getList() {
      let tempArr = new Array(1,1,1,1,1,1,1,1,1,1)
      this.list.data = tempArr.map((item, index) => {
        return {
          id: index + 1,
          checked: false,
          title: '店铺红包',
          money: 1500
        }
      })
    }
  },
  mounted() {
    this.mode = this.$route.query.mode || 'list'
    this.getList()
  }
}
</script>

<style lang="less">
.l-redpack-item{
  background-color: #fff; margin: 10px; border-radius: 5px; overflow: hidden;
  ._bd{padding: 10px 15px;}
  ._ft{padding: 10px 15px;}
  ._money{ min-width: 100px; text-align: center; margin-right: 10px; }
  ._check{margin-left: 10px;}
  ._line{
    background: linear-gradient(to right, #ddd, #ccc 5px, transparent 5px, transparent);
    background-size: 10px 100%; height: 1px; clear: both; margin: 10px 0; 
    &::before, &::after{
      content: ''; display: block; height: 20px; width: 20px; background-color: #f5f5f5;
      border-radius: 50%; margin-top: -10px; 
    }
    &::before{float: right; margin-right: -10px;}
    &::after{float: left; margin-left: -10px;}
  }
}
</style>

