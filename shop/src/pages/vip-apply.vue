<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>
    <div class="l-app-bg l-zoom">
      <div class="l-flex-vhc l-margin" style="height: 150px; background: #251F1F; color:#fff;">
        <span class="l-fs-xl">文案部分</span>
        <!-- <img class="l-img-block" src="../assets/images/20180602005.jpg" alt="招商加盟"> -->
      </div>

      <group label-width="80">
        <x-input title="姓名" placeholder="请输入您的姓名" :max="20" v-model="formData.mname">
        </x-input>
        <x-input title="手机" type="tel" placeholder="请输入手机号码" :max="11" v-model="formData.phone">
        </x-input>
      </group>
      <group title="收卡地址" label-width="80">
        <x-address class="l-txt-left" title="地区" placeholder="请选择地区" v-model="formData.region" :list="addressData"></x-address>
        <x-textarea title="详细地址" placeholder="请填写详细地址" v-model="formData.address" :autosize="true">
        </x-textarea>
      </group>
      <div class="l-margin">
        <x-button class="l-btn-radius" type="primary" @click.native="submit">申领会员卡</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XAddress, ChinaAddressV4Data } from 'vux'
export default {
  name: 'vip-apply',
  components: { XAddress },
  data () {
    return {
      organId: null,
      openId: null,
      userInfo: {},
      addressData: ChinaAddressV4Data,
      formData: {
        mname: '',
        phone: '',
        region: [],
        address: '',
      }
    }
  },
  methods: {
    submit() {
      let formData = Object.assign({}, this.formData)

      if(!formData.mname) {
        return this.$toptip('请填写姓名')
      }
      if(!formData.phone) {
        return this.$toptip('请填写手机号码')
      }
      if(formData.region.length === 0) {
        return this.$toptip('请选择收卡地区')
      }
      if(!formData.address) {
        return this.$toptip('请填写收卡地址')
      }


      this.$api.loading.show()
      this.$ajax.json('/sys-mallcenter/mall/addCart', {
        organId: this.organId,
        openId: this.openId,
        phone: formData.phone,
        mname: formData.phone,
        shippingAddress: formData.region + formData.address,
      }).then(({data}) => {
        if(data.resCode == 0) {
          this.$api.toast('申领成功')
        }else{
          this.$api.alert(data.resMsg)
        }
      }).finally(() => {
        this.$api.loading.hide()
      })
    }
  },
  mounted() {
    this.organId = this.$storage.session.get('organId')
    this.openId = this.$storage.session.get('openId')
    this.$store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo = userInfo || {}
    })
  }
}
</script>

<style lang="less">
.l-user-avatar{ width: 50px; height: 50px; background-color: #fff; border-radius: 50%; }
</style>

