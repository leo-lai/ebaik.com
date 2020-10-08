<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <msg title="支付成功" description="机器正在出货，如有疑问，请联系客服。" icon="success"></msg>
  </view-box>
</template>

<script>
import { Msg } from 'vux'
export default {
  name: 'demo',
  components: { Msg },
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

<style lang="less" scoped>

</style>

