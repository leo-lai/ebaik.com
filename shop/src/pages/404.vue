<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-bg-white">
      <h1 class="l-txt-center" style="padding: 60px 0; color: #ddd;">Page Not Found！</h1>
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

<style lang="less" scoped>

</style>

