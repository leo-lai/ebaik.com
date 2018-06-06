<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
        <router-link to="/address/add" slot="right">添加新地址</router-link>
      </x-header>
    </header>
    
    <div class="l-app-bg">
      <div class="l-address-item" v-for="item in list.data">
        <div class="_hd l-flex-hc">
          <span>{{item.name}}</span>
          <div class="l-rest"></div>
          <span>{{item.phone}}</span>
        </div>
        <div class="_bd">
          {{item.address}}
        </div>
        <div class="_ft l-flex-hc vux-1px-t">
          <check-icon class="_check" :value.sync="item.checked">设为默认</check-icon>
          <div class="l-rest"></div>
          <span><i class="l-icon">&#xe61f;</i> 编辑</span>
          <span class="l-margin-l"><i class="l-icon">&#xe600;</i> 删除</span>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { CheckIcon } from 'vux'
export default {
  name: 'my-address',
  components: {
    CheckIcon
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

<style lang="less">
.l-address-item{
  background-color: #fff; margin-bottom: 10px;
  ._hd{padding: 10px 15px 0;}
  ._bd{padding: 10px 15px; min-height: 3em;}
  ._ft{padding: 10px 15px;}
  ._check{margin-left: -5px;}
}
.l-address-item:last-child{margin-bottom: 0;}
</style>

