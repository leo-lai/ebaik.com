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
      <div class="l-recharge-list">
        <div class="l-recharge-item" v-for="item in list.data" :key="item.sid" @click="submitRecharge(item)">
          <img class="_img" :src="item.schemeImg" :alt="item.schemeName">
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
export default {
  name: 'wallet-recharge2',
  components: {
  },
  data () {
    return {
      organId: null,
      openId: null,
      userInfo: {},
      list: {
        data: []
      }
    }
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('getUserInfo').then(userInfo => {
        this.userInfo = userInfo || {}
      })
    },
    getRechargeList() {
      this.$api.loading.show()
      this.$ajax.json('/sys-authcenter/user/findSchemeSrored', {
        organId: this.organId,
        page: { pageNum: 1, pageSize: 100 }
      }).then(({data}) => {
        if(data.resCode == 0) {
          this.list.data = data.list.list
        }else{
          this.$api.alert(data.resMsg)
        }
      }).finally(() => {
        this.$api.loading.hide()
      })
    },
    submitRecharge(item = {}) {
      this.rechargeItem = item
      if(!this.userInfo.tel) {
        this.$vux.confirm.prompt('请绑定手机号码', {
          closeOnConfirm: false,
          inputAttrs: {
            type: 'tel',
            maxLength: 11
          },
          title: '充值提示',
          onShow: () => {
            this.$vux.confirm.setInputValue(this.tel)
          },
          onConfirm: (value) => {
            if(!/^1[2-9]\d{9}$/.test(value)){
              return this.$toptip('请输入正确的手机号码')
            }
            this.tel = value
            let formData = {
              organId: this.organId,
              wxopenId: this.openId,
              id: this.userInfo.id,
              tel: this.tel
            }
            this.$api.loading.show()
            this.$ajax.json('/sys-authcenter/user/updStoredCustomer', formData).then(({ data }) => {
              if(data.resCode == 0) {
                this.userInfo.tel = this.tel
                this.$vux.confirm.hide()
                this.submitRecharge(this.rechargeItem)
              }else{
                this.$api.alert(data.resMsg)
              }
            }).finally(() => {
              this.$api.loading.hide()
            })
          }
        })
        return 
      }

      let formData = {
        sid: item.sid,
        schemeName: item.schemeName,
        openId: this.openId
      }

      this.$api.loading.show()
      this.$ajax.json('/sys-machinepurchase/recharge/rechargeOrder', formData).then(({ data }) => {
        if(data.appId) {
          let payConfig = {
            'appId': data.appId,          // 公众号名称，由商户传入
            'timeStamp': data.timeStamp,  // 时间戳，自1970年以来的秒数
            'nonceStr': data.nonceStr,    // 随机串
            'package': data.package,
            'signType': data.signType,  // 微信签名方式：
            'paySign': data.paySign     // 微信签名,paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
          };
          this.$onBridgeReady(() => {
            WeixinJSBridge.invoke('getBrandWCPayRequest', payConfig, (res) => {
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              if (res.err_msg.indexOf('get_brand_wcpay_request:ok') > -1) { 
                this.$api.toast('充值成功')
                // this.$router.replace('/purchase?tab=1')
                // this.$href(this.$utils.url.getFullPath('.') + '?#/purchase?tab=1', 'replace')
                this.getUserInfo()
              } else if(res.err_msg.indexOf('cancel') === -1){
                this.$api.alert(res.err_msg)
              }
            })
          })
        }else{
          this.$api.alert('充值失败')
        }
      }).finally(() => {
        this.$api.loading.hide()
      })
    }
  },
  mounted() {
    this.organId = this.$storage.session.get('organId')
    this.openId = this.$storage.session.get('openId')
    this.getUserInfo()
    this.getRechargeList()

    this.$utils.setTitle(this.$route.meta.title)
  }
}
</script>

<style lang="less" scoped>
.l-recharge-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2%;
}
.l-recharge-item{
  width: 46%; margin: 2%; max-height: 150px; border-radius: 10px; overflow: hidden; box-shadow: 0px 0px 1px 1px #e8e8e8;
  ._img{ width: 100%; max-height: 100%; min-height: 100px; object-fit: fill; }
}
.l-app-disabled{ 
  position: fixed; top:0; left:0; z-index: 1000; 
  width: 100%; height: 100%; 
  background-color: rgba(0, 0, 0, 0.8); 
}

.l-user-card{
  // background-image: linear-gradient(180deg, #0071bc, #18bdd8);
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

