<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{ showBack: false }">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-search-placeholder">
      <div class="l-flex-hc l-search-box">
        <div class="l-rest _ipt">
          <icon class="_icon" type="search"></icon>
          <input type="text" placeholder="请输入设备名称或编号">
        </div>
      </div>
    </div>

    <div class="l-machine-item l-flex-hc" v-for="item in 18" :key="item">
      <div class="_thumb l-txt-gray">
        <i class="l-icon l-fs-x2">&#xe63b;</i>
        <p>售货机</p>
      </div>
      <div class="l-rest">
        <h3 class="l-txt-wrap1">岭南电商园1号机</h3>
        <p class="l-txt-wrap2 l-txt-gray">岭南电商园1号机</p>
        <p class="l-txt-gray">NO：209801092</p>
      </div>
      <span class="l-txt-theme">300m</span>
    </div>
  </view-box>
</template>

<script>
export default {
  name: 'demo',
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
  }
}
</script>

<style lang="less">
.l-machine-item{
  background-color: #fff; margin: 10px 0; padding: 10px 15px;
  ._thumb{ min-width: 60px; text-align: center; margin-right: 15px; }
}
</style>

