<template>
  <view-box class="no-header">
    <div class="l-app-bg">
      <div class="l-user-card">
        <div class="_avatar" :style="{'background-image': 'url(' + $config.avatar +')'}"></div>
        <div class="_nametel l-flex-hc">
          <div class="_name">
            <i class="l-icon">&#xe67a;</i>
            <span>{{userInfo.nname || '未设置'}}</span>
          </div>
          <div class="_tel">
            <i class="l-icon">&#xe613;</i>
            <span>{{userInfo.tel || '未绑定'}}</span>
          </div>
        </div>
      </div>

      <div class="l-user-other l-flex-hc">
        <div class="l-rest l-txt-center _redpack">
          <b class="l-rmb">{{userInfo.balance | Yuan}}</b>
          <p>余额</p>
        </div>
        <div class="l-rest l-txt-center _redpack">
          <b class="l-rmb">{{userInfo.giveIntegral | Yuan}}</b>
          <p>礼券</p>
        </div>
        <!-- <div class="l-rest l-txt-center _redpack">
          <b>{{userInfo.discount}}%</b>
          <p>折扣</p>
        </div> -->
      </div>
      <div class="l-bg-white l-margin-t">
        <group gutter="0">
          <cell title="充值" link="/qcsy/recharge2">
            <img class="weui-cell__icon" slot="icon" src="../../assets/qcsy/18.png">
          </cell>
          <cell title="消费记录" link="/wallet/bill">
            <img class="weui-cell__icon" slot="icon" src="../../assets/qcsy/19.png">
          </cell>
        </group>
      </div>

      <div class="l-box-1">
        <div class="_hd l-flex-hc">
          <b>我的订单</b>
          <span class="l-rest"></span>
          <span class="l-fs-xs l-txt-gray" @click="onItemClick">查看全部订单</span>
          <x-icon type="ios-arrow-right" class="l-txt-gray" size="16"></x-icon>
        </div>
        <div style="margin-bottom: -1px;">
          <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="4">
            <grid-item link="" label="待发货" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/21.png">
            </grid-item>
            <grid-item link="" label="待收货" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/22.png">
            </grid-item>
            <grid-item link="" label="待评价" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/23.png">
            </grid-item>
          </grid>
        </div>
      </div>

      <div class="l-box-1">
        <div class="_hd l-flex-hc">
          <b>我的服务</b>
          <span class="l-rest"></span>
        </div>
        <div style="margin-bottom: -1px;">
          <grid :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item link="" label="优惠券" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/7.png">
            </grid-item>
            <grid-item link="" label="推荐有礼" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/8.png">
            </grid-item>
            <grid-item link="" label="优惠活动" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/9.png">
            </grid-item>
            <grid-item link="" label="客服二维码" @on-item-click="onItemClick">
              <img slot="icon" src="../../assets/qcsy/10.png">
            </grid-item>
          </grid>
        </div>
      </div>
    </div>

    

    <div v-if="!organId" class="l-app-disabled l-flex-vhc">
      <div class="l-txt-center" style="color: #eee;">
        <h4 class="l-fs-xl">页面不可用</h4>
        <p>获取不到organID</p>
      </div>
    </div>
  </view-box>
</template>

<script>
import { Grid, GridItem } from 'vux'

export default {
  name: 'me',
  components: {
    Grid,
    GridItem
  },
  data () {
    return {
      organId: null,
      openId: null,
      userInfo: {}
    }
  },
  methods: {
    onItemClick() {
      this.$api.toast('功能开发中', 'text')
    }
  },
  mounted() {
    this.organId = this.$storage.session.get('organId')
    this.$store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo = userInfo || {}
    })

    this.$utils.setTitle(this.$route.meta.title)
  }
}
</script>

<style lang="less">
.l-box-1{
  background-color: #fff; margin: 15px; border-radius: 5px; overflow: hidden;
  ._hd{  
    background: url('../../assets/qcsy/20.png') no-repeat 5px 0px;
    background-size: 30px; padding: 10px 10px;
    b{ color: #000; }
  }
}
.l-app-disabled{ 
  position: fixed; top:0; left:0; z-index: 1000; 
  width: 100%; height: 100%; 
  background-color: rgba(0, 0, 0, 0.8); 
}

.l-user-card{
  background: url('../../assets/qcsy/img-24.jpg') no-repeat; background-size: 100%;
  color: #fff; text-align: center; padding-bottom: 50px; padding-top: 46px;
  ._avatar{
    position: relative; top: -35px; left: 15px;
    width: 50px; height: 50px; border-radius: 50%; border: 2px solid #ffffff; 
    background: no-repeat 50% 50%; background-size: cover;
  }
  ._nametel{margin: -20px 15px 0; text-align: center;}
  ._name, ._tel{width: 50%;}
}

.l-user-other{
  background-color: #fff; border-radius: 5px; margin: -35px 15px 0; padding: 15px;text-align: center; 
  border: 1px solid #dadada;
  ._line{ width: 1px; height: 20px; margin: auto;}
  ._qrcode{
    width: 60px; height: 60px; 
    img{width: 100%; height: 100%}
  }
  ._score{
    b{font-weight: 400; color: #1AAD19;}
  }
  ._redpack{
    b{font-weight: 400; color: #ff4141; font-size: 17px;}
  }
}
</style>

