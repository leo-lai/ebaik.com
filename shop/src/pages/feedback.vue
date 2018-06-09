<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
        <a slot="right">联系客服</a>
      </x-header>
    </header>

    <div class="l-app-bg l-padding">
      <p class="l-txt-gray">快快前来吐槽宜百客，帮助我们更加快速地成长。</p>
      <group gutter="0" class="l-feed-text">
        <x-textarea :rows="6" :max="500" placeholder="请输入您的意见反馈"></x-textarea>
      </group>
      <br>
      <div class="l-margin-tb">
        <x-button class="l-btn-radius" type="primary">提交</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XTextarea } from 'vux'
export default {
  name: 'feedback',
  components: {
    XTextarea
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
.l-feed-text{
  border-radius: 5px; overflow: hidden; margin-top: 15px;
  .weui-cells::before{border-top: none;}
  .weui-cells::after{border-bottom: none;}
}
</style>

