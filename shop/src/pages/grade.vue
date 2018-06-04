<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-app-bg l-bg-white l-padding">
      <p class="l-margin-tb">您当前的会员等级为：<span class="l-fs-xl">普通会员</span></p>
      <p class="l-margin-tb">您当前的积分为：<span class="l-fs-xl">20分</span></p>
      <br>
      <p>会员等级与折扣的关系如下：</p>
      <div class="l-margin-t-m">
        <x-table full-bordered>
          <thead>
            <tr>
              <th>会员等级</th>
              <th>累积消费(元)</th>
              <th>最低折扣(%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>新注册</td>
              <td>0</td>
              <td>90</td>
            </tr>
            <tr>
              <td>普通</td>
              <td>0 - 500</td>
              <td>100</td>
            </tr>
            <tr>
              <td>银卡</td>
              <td>501 - 3000</td>
              <td>98</td>
            </tr>
            <tr>
              <td>金卡</td>
              <td>3001 - 8000</td>
              <td>95</td>
            </tr>
            <tr>
              <td>至尊</td>
              <td>8001 - 以上</td>
              <td>93</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XTable } from 'vux'
export default {
  name: 'grade',
  components: {
    XTable
  },
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

</style>

