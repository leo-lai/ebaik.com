<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-bg-white l-txt-center" style="color: #ddd;">
      <h1 style="padding: 60px 0 20px;">Page Not Found！</h1>
      <p>{{$route.query.err}}</p>
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

