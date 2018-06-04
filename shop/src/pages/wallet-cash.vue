<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-zoom">
      <group gutter="0" label-width="80">
        <x-input title="开户银行" placeholder="必填" :max="20" v-model="formData.bank1">
        </x-input>
        <x-input title="开户支行" placeholder="必填" :max="20" v-model="formData.bank2">
        </x-input>
        <x-input title="持卡人姓名" placeholder="必填" :max="50" v-model="formData.name">
        </x-input>
        <x-input title="银行卡号" placeholder="必填" :max="50" v-model="formData.number">
        </x-input>
        <x-input title="提现金额" placeholder="必填" :max="50" v-model="formData.money">
        </x-input>
      </group>
      <div class="l-fs-xs l-txt-gray l-margin">
        <p>根据您余额，最大提现金额为1000.00元</p>
        <p>提现后会回收对应的积分，可能会造成您的会员等级下降。</p>
      </div>
      <br>
      <div class="l-margin">
        <x-button class="l-btn-radius" type="primary">申请提现</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
export default {
  name: 'wallet-cash',
  data () {
    return {
      formData: {
        bank1: '',
        bank2: '',
        name: '',
        number: '',
        money: '',
      }
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

