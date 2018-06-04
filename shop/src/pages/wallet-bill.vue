<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-bg-white">
      <x-table>
        <thead>
          <tr>
            <th class="l-padding-lr-s">时间</th>
            <th class="l-padding-lr-s">项目</th>
            <th class="l-padding-lr-s">金额</th>
            <th class="l-padding-lr-s">余额</th>
          </tr>
        </thead>
        <tbody class="l-fs-xs">
          <tr v-for="item in 8" :key="item">
            <td>2018-01-01 12:12</td>
            <td>充值</td>
            <td>10.00</td>
            <td>10000.00</td>
          </tr>
        </tbody>
      </x-table>
    </div>
  </view-box>
</template>

<script>
import { XTable } from 'vux'
export default {
  name: 'wallet-bill',
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

