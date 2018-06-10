<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
        <router-link to="/address" slot="right">管理地址</router-link>
      </x-header>
    </header>
    
    <div class="l-address-item" v-for="item in list.data" :key="item.id">
      <div class="_hd l-flex-hc">
        <span class="l-txt-wrap1">{{item.name}}</span>
        <div class="l-rest l-margin-l-m">
          <badge v-if="item.id == 1" text="默认"></badge>
        </div>
        <span>{{item.phone}}</span>
      </div>
      <div class="_bd">
        {{item.address}}
      </div>
    </div>

    <div class="l-fixed-bottom">
      <div class="_placeholder"></div>
      <div class="_inner">
        <div class="l-margin">
          <x-button link="/address/add" class="l-btn-radius" type="primary">新增地址</x-button>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { CheckIcon, Badge } from 'vux'
export default {
  name: 'my-address',
  components: {
    CheckIcon, Badge
  },
  data () {
    return {
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
          name: '赖小帅',
          phone: '18602029524',
          address: '广东省广州市海珠区仑头村委会33号',
        }
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.l-address-item{
  background-color: #fff; margin-bottom: 10px;
  ._hd{padding: 10px 15px 5px;}
  ._bd{padding: 0 15px 10px;}
  ._ft{padding: 10px 15px;}
  ._check{margin-left: -5px;}
}
.l-address-item:last-child{margin-bottom: 0;}
</style>

