<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-app-bg l-zoom">
      <div class="l-txt-center">
        <img class="l-img-block" src="../assets/images/20180602005.jpg" alt="招商加盟">
      </div>

      <group label-width="80">
        <x-input title="姓名" placeholder="请输入您的姓名" :max="20" v-model="formData.name">
        </x-input>
        <x-input title="联系电话" placeholder="请输入手机号码" :max="20" v-model="formData.phone">
        </x-input>
        <x-input title="加盟地区" placeholder="请填写加盟地区" :max="50" v-model="formData.area">
        </x-input>
      </group>
      <div class="l-margin">
        <x-button class="l-btn-radius" type="primary">提交</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
export default {
  name: 'join',
  data () {
    return {
      formData: {
        name: '',
        phone: '',
        area: '',
      }
    }
  },
  methods: {
    submit() {
      
    }
  },
  mounted() {
    // this.$api.user.getInfo().then(data => {
    //   this.userInfo = data
    // })
  }
}
</script>

<style lang="less">
.l-user-avatar{ width: 50px; height: 50px; background-color: #fff; border-radius: 50%; }
</style>

