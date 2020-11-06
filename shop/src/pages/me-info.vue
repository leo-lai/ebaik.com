<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <group gutter="0">
      <cell title="头像">
        <div class="l-user-avatar l-bg-co" :style="{'background-image':'url('+ $config.avatar +')'}"></div>
      </cell>
      <cell title="昵称" :value="userInfo.nname"></cell>
      <cell title="手机号码" :value="userInfo.tel || '未绑定'" is-link></cell>
    </group>
    <!-- <group>
      <cell title="修改密码" is-link></cell>
    </group> -->

    <!-- <div class="l-fixed-bottom">
      <div class="_placeholder"></div>
      <div class="_inner">
        <div class="l-margin">
          <x-button @click.native="logout" class="l-btn-radius" type="primary">退出登录</x-button>
        </div>
      </div>
    </div> -->
  </view-box>
</template>

<script>
export default {
  name: 'me-info',
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    logout() {
      this.$vux.confirm.show({
        title: '系统提示',
        content: '是否确定退出登录',
        onConfirm: _ => {
          this.$api.auth.logout().then(() => {
            this.$router.push('/login')
          })
        }
      })
    },
    getUserInfo() {
      this.$store.dispatch('getUserInfo').then(userInfo => {
        this.userInfo = userInfo || {}
      })
    },
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.l-user-avatar{ width: 50px; height: 50px; background-color: #fff; border-radius: 50%; }
</style>

