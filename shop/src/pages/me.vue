<template>
  <view-box class="l-scroll-bg">
    <header id="page-view-header" class="l-bg-none">
      <x-header :left-options="{backText: '', showBack: false && !$route.meta.tabbar}">
        <!-- <span>{{$route.meta.title}}</span> -->
        <!-- <router-link to="/me/info" slot="right"><i class="l-icon l-fs-x2">&#xe668;</i></router-link> -->
      </x-header>
    </header>
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
      <!-- <div class="l-user-other l-flex-hc">
        <div class="_grade" @click="$router.push('/grade')">
          <p class="l-fs-xs">还需850个积分升级</p>
          <h3 class="l-margin-t-s">普通会员</h3>
        </div>
        <div class="l-rest">
          <div class="_line vux-1px-l"></div>  
        </div>
        <div class="_qrcode">
          <img src="../assets/images/temp-002.jpg" alt="">
        </div>
        <div class="l-rest">
          <div class="_line vux-1px-l"></div>  
        </div>
        <div class="_score" @click="$router.push('/grade')">
          <b>0分</b>
          <p>积分</p>
        </div>
        <div class="l-rest">
          <div class="_line vux-1px-l"></div>  
        </div>
        <div class="_redpack" @click="$router.push('/redpack')">
          <b>0个</b>
          <p>红包</p>
        </div>
      </div> -->

      <div class="l-user-other l-flex-hc">
        <div class="l-rest l-txt-center _redpack">
          <b class="l-rmb">{{userInfo.balance | Yuan}}</b>
          <p>储值金额</p>
        </div>
        <div class="l-rest l-txt-center _redpack">
          <b class="l-rmb">{{userInfo.giveIntegral | Yuan}}</b>
          <p>礼券</p>
        </div>
        <div class="l-rest l-txt-center _redpack">
          <b>{{userInfo.discount}}%</b>
          <p>折扣</p>
        </div>
      </div>
      <div class="l-bg-white l-margin-t">
        <group gutter="0">
          <cell title="充值" link="/wallet/recharge2">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-020.png">
          </cell>
          <cell title="消费记录" link="/wallet/bill">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-021.png">
          </cell>

          <!-- <cell title="我的钱包" link="/wallet">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-020.png">
          </cell>
          <cell title="我的订单" link="/order/list">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-021.png">
          </cell>
          <cell title="地址管理" link="/address">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-022.png">
          </cell>
          <cell title="我的收藏" link="/favorite">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-023.png">
          </cell>
          <cell title="积分商城" is-link>
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-024.png">
          </cell>
          <cell title="我要加盟" link="/join">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-025.png">
          </cell>
          <cell title="意见反馈" link="/feedback">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-026.png">
          </cell>
          <cell title="系统设置" link="/setting">
            <img class="weui-cell__icon" slot="icon" src="../assets/images/icon-027.png">
          </cell> -->
        </group>
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

export default {
  name: 'me',
  components: {
  },
  data () {
    return {
      organId: null,
      openId: null,
      userInfo: {}
    }
  },
  methods: {
  },
  mounted() {
    this.organId = this.$storage.session.get('organId')
    this.$store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo = userInfo || {}
    })
  }
}
</script>

<style lang="less" scoped>
.l-app-disabled{ 
  position: fixed; top:0; left:0; z-index: 1000; 
  width: 100%; height: 100%; 
  background-color: rgba(0, 0, 0, 0.8); 
}

.l-user-card{
  background-color: @theme-color; color: #fff; text-align: center; padding-bottom: 50px;
  ._avatar{
    position: relative; top: -35px; left: 50%; margin-left: -25px;
    width: 50px; height: 50px; border-radius: 50%; border: 2px solid #fec96b; 
    background: no-repeat 50% 50%; background-size: cover;
  }
  ._nametel{margin: -20px 15px 0; text-align: center;}
  ._name, ._tel{width: 50%;}
}

.l-user-other{
  background-color: #fff; border-radius: 5px; margin: -35px 15px 0; padding: 15px;text-align: center; 
  border: 1px solid #af1459;
  ._line{ width: 1px; height: 20px; margin: auto;}
  ._qrcode{
    width: 60px; height: 60px; 
    img{width: 100%; height: 100%}
  }
  ._score{
    b{font-weight: 400; color: #1AAD19;}
  }
  ._redpack{
    b{font-weight: 400; color: #f74c31;}
  }
}
</style>

