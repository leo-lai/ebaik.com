<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: '', showBack: showBack}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <msg title="支付成功" description="机器正在出货，如有疑问，请联系客服。" icon="success" :buttons="buttons"></msg>
  </view-box>
</template>

<script>
import { Msg } from 'vux'
export default {
  name: 'demo',
  components: { Msg },
  data () {
    return {
      showBack: true,
      buttons: [{
        type: 'default',
        text: '返回',
        onClick: this.back.bind(this)
      }]
    }
  },
  methods: {
    back() {
      this.$closeWindow()
    }
  },
  mounted() {
    let from = this.$route.query.from ||this.$utils.url.getArgs().from
    if(from === 'machine') {
      this.showBack = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>

