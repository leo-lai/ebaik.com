<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg">
      <group gutter="0" label-width="80">
        <x-input title="收货人" placeholder="" :max="20" v-model="formData.name">
        </x-input>
        <x-input title="联系电话" placeholder="" :max="20" v-model="formData.phone">
        </x-input>
        <x-address title="所在地区" v-model="region.value" :list="region.data" value-text-align="left" placeholder="请选择"></x-address>
        <x-textarea title="详细地址" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等" :show-counter="false" :max="500" :rows="3" v-model="formData.address"></x-textarea>
      </group>
      <group :gutter="0" label-width="80">
        <x-switch title="设置默认地址" :value-map="[0, 1]" v-model="formData.checked"></x-switch>
      </group>
      <br>
      <div class="l-margin">
        <x-button class="l-btn-radius" type="primary">保存</x-button>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XAddress, XTextarea, XSwitch, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
export default {
  name: 'address-add',
  components: {
    XAddress, XTextarea, XSwitch
  },
  data () {
    return {
      region: {
        data: ChinaAddressV4Data,
        value: []
      },
      formData: {
        name: '',
        phone: '',
        address: '',
        checked: 0
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

