<template>
  <el-container v-if="info" class="l-h100">
    <el-header class="l-padding-0" height="auto">
      <div :class="getState(info.state).css">
        <i :class="getState(info.state).icon"></i>&ensp;{{info.stateName}}
        <span v-if="info.state >= 0 && info.state !== 2">（{{statusList[info.status].label}}）</span>
      </div>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/order/list">垫资单管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{info.orderId}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="l-margin-t l-zoom">
        <div class="l-panel-item l-margin-b">
          <div class="_hd l-border-b" style="padding-bottom: 15px;">
            <span>
              <b class="l-fs-xl">垫资金额</b>
              <span class="l-margin-l l-txt-theme l-fs-x2"><i class="l-rmb">{{ info.status > 0 ? info.adjustAmount : info.amount}}</i></span>
              
              <template v-if="info.state <= 2">
                <span class="l-margin-lr l-txt-gray" v-if="info.adjustAmount !== info.amount">
                  <i class="el-icon-warning" title=""></i>&nbsp;经审核，将您的垫资申请金额做出调整
                </span>
                <span class="l-margin-l l-txt-error">应付保证金：<i class="l-rmb">{{info.adjustBond || info.bond}}</i></span>
              </template>
              <template v-if="info.state === 6 && info.status > 20">
                <b class="l-margin-l-x2 l-fs-xl">溢价回购总额：</b>
                <span class="l-margin-l l-txt-theme l-fs-x2"><i class="l-rmb">{{info.totalAmount}}</i></span>
              </template>

              <b class="l-margin-l l-txt-link" v-if="info.state === 2" @click="payAmount(0)">
                <i class="el-icon-edit-outline"></i>&nbsp;去付保证金
              </b>
              <b class="l-margin-l l-txt-link" v-if="info.state === 3 && info.status === 6" @click="pickupVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;允许提车并同意放款
              </b>
              <b class="l-margin-l l-txt-link" v-if="info.state === 5 && info.status === 16" @click="settleVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;结算申请
              </b>
              <b class="l-margin-l l-txt-link" v-if="info.state >= 5 && info.state <= 6" @click="checkcarVisible = true">
                <i class="el-icon-edit-outline"></i>&nbsp;验车申请
              </b>
              <b class="l-margin-l l-txt-link" v-if="info.state === 6 && info.status === 22" @click="payAmount(1)">
                <i class="el-icon-edit-outline"></i>&nbsp;去付溢价回购金额
              </b>
            </span>
            <p style="font-size: 14px; margin: 8px 20px 0;">
              <span>融资期限：{{info.period}}天</span>
              <span class="l-liney"></span>
              <span>
                <i class="el-icon-question l-txt-theme" title="以实际放款日为准，乙方按照合同约定无条件溢价回购已转让债权，并向甲方按照合同之约定支付回购价款的行为"></i>
                溢价回购期限：{{info.deadline}}
              </span>
              <template v-if="info.status > 10">
                <span class="l-liney"></span>
                <span>实际放款时间：{{info.voucherTime}}</span>
              </template>
              <template v-if="info.state > 2">
                <span class="l-liney"></span>
                <span>已付保证金：<i class="l-rmb">{{info.adjustBond || info.bond}}</i></span>
              </template>
              <template v-if="info.status > 0">
                <span class="l-liney"></span>
                <span>日利率：{{info.rate}}%</span>
              </template>
              <template v-if="info.status > 16">
                <span class="l-liney"></span>
                <span>产生利息：{{info.interests}}</span>
              </template>
            </p>
          </div>
          <div class="l-zoom l-padding-x">
            <div class="l-carsInfo l-fl">
              <p>
                <i class="_tag">垫资车辆</i>
                <b class="l-fs-l l-margin-r">{{info.carName}} {{info.style}}</b>
                <span>车架号：{{info.frameNumber}}</span>
              </p>
              <div class="l-margin-t">
                <p>
                  <span class="_item">车辆变速箱：{{info.gearbox}}</span>
                  <span class="_item">车身颜色：{{info.color}}</span>
                  <span class="_item">内饰颜色：{{info.interiorColor}}</span>
                </p>
                <p>
                  <span class="_item">官方指导价：<i class="l-rmb">{{info.guidePrice}}</i></span>
                  <span class="_item">提车时间：{{info.pickUpTime}}</span>
                  <el-popover v-if="info.type === '选配'" placement="bottom-start" width="300" trigger="hover" :content="info.remark">
                    <span class="_item" slot="reference">车辆配置：{{info.type}} <i class="el-icon-caret-bottom"></i></span>
                  </el-popover>
                  <span v-else class="_item">车辆配置：{{info.type}}</span>
                </p>
              </div>
              <div class="l-margin-t-s">
                <p class="_tag2 l-margin-r">
                  <span class="l-dib" style="min-width: 200px;">
                    4S店采购价：<i class="l-rmb">{{info.purchasePrice}}</i>
                  </span>
                  <i class="l-liney"></i>
                  <span class="l-dib" style="min-width: 200px;">
                    已付4S店定金：<i class="l-rmb">{{info.paidDeposit}}</i>
                  </span>
                </p>
                <p class="_tag2 l-margin-r">
                  <span class="l-dib" style="min-width: 200px;">
                    买方成交价：<i class="l-rmb">{{info.price}}</i>
                  </span>
                  <i class="l-liney"></i>
                  <span class="l-dib" style="min-width: 200px;">
                    买方已付定金：<i class="l-rmb">{{info.deposit}}</i>
                  </span>
                </p>
              </div>
            </div>
            <div class="l-order-news l-fl">
              <h4>订单动态</h4>
              <el-steps v-if="info.records && info.records.length > 0" class="l-margin-t" direction="vertical" :active="0">
                <el-step v-for="(item,index) in info.records" :key="index">
                  <img slot="icon" src="../assets/images/20180828001.jpg" alt="">
                  <div slot="description">
                    <p>{{item.createTime}} <el-tag v-if="index === 0" class="l-margin-l-s" type="danger" size="mini">最新</el-tag></p>
                    <p>
                      {{item.title}} 
                      <a class="l-txt-link l-margin-l-s" v-if="[1, 3, 5, 7].includes(item.type)" @click="showViewer(item)">查看详情</a>
                    </p>
                  </div>
                </el-step>
              </el-steps>
            </div>
          </div>
        </div>
        <div class="l-zoom l-bg-white">
          <div class="l-fl l-margin-r" style="width: 790px;">
            <div class="l-panel-item l-margin-b">
              <div class="_hd l-fs-xl"><b>买家（车主）信息</b></div>
              <div class="l-padding-x">
                <table class="l-table-02" style="width: 100%;">
                  <tr>
                    <td width="100" class="_tit">买方姓名</td>
                    <td>{{info.userName}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">手机号码</td>
                    <td>{{info.phone}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">身份证号</td>
                    <td>{{info.idCard}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">居住地址</td>
                    <td>{{info.address}}</td>
                  </tr>
                </table>
                <div class="l-margin-t">
                  <div class="l-image-preview l-margin-r">
                    <div class="_tit">身份证正反面</div>
                    <div class="_img" :style="{'background-image': 'url('+info.idCardOn+')'}">
                      <b @click="previewImage(0, [info.idCardOn, info.idCardOff])">点击查看大图(2张)</b>
                    </div>
                  </div>
                  <div class="l-image-preview l-margin-r">
                    <div class="_tit">定金凭证</div>
                    <div class="_img" :style="{'background-image': 'url('+info.voucher[0]+')'}">
                      <b @click="previewImage(0, info.voucher)">点击查看大图({{info.voucher.length}}张)</b>
                    </div>
                  </div>
                  <div class="l-image-preview">
                    <div class="_tit">购车合同</div>
                    <div class="_img" :style="{'background-image': 'url('+info.contractUrl[0]+')'}">
                      <b @click="previewImage(0, info.contractUrl)">点击查看大图({{info.contractUrl.length}}张)</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="l-panel-item l-margin-b">
              <div class="_hd l-fs-xl"><b>销售商（4S店）信息</b></div>
              <div class="l-padding-x">
                <table class="l-table-02" style="width: 100%;">
                  <tr>
                    <td width="100" class="_tit">销售商名称</td>
                    <td>{{info.shopName}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">公司详细地址</td>
                    <td>{{info.orgAddress}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">公司联系人</td>
                    <td>{{info.orgLink}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">联系人手机</td>
                    <td>{{info.orgPhone}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">对公收款账号</td>
                    <td>{{info.account}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">收款账号开户支行</td>
                    <td>{{info.bankBranch}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="l-fl" style="width: 380px;" v-if="info.state >= 0 && info.status > 0">
            <div class="l-panel-item" style="width: 380px; margin: 0 15px 15px 0;">
              <div class="_hd l-fs-xl"><b>相关合同签署</b></div>
              <div class="l-padding-xl">
                <div class="l-contract-pre l-flex-vhc">
                  <div :class="'_tag' + info.contractList.B3.state" :title="info.contractList.B3.stateName"></div>
                  <div class="_inner">
                    <a class="_link" target="_blank" :href="info.contractList.B3.Template">{{info.contractList.B3.Title}}</a>
                  </div>
                </div>

                <div class="l-contract-pre l-flex-vhc l-margin-t">
                  <div :class="'_tag' + info.contractList.B4.state" :title="info.contractList.B4.stateName"></div>
                  <div class="_inner">
                    <a class="_link" target="_blank" :href="info.contractList.B4.Template">{{info.contractList.B4.Title}}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 支付保证金隐藏表单 -->
      <div class="l-hidden">
        <form ref="payForm" target="payWin" method="POST" :action="$api.payURL">
          <table>
            <tr v-for="(value, name) in payInfo.formData" :key="name">
              <td>{{name}}</td>
              <td><input  type="text" :name="name" :value="value">	</td>
            </tr>
            <tr>
              <td></td>
              <td><input type="submit" value="提交支付"></td>
            </tr>
          </table>
        </form>	
      </div>
      <!-- 支付窗口 -->
      <el-dialog :visible.sync="payInfo.visible" :close-on-press-escape="false" width="1100px" append-to-body :before-close="closePayWin">
        <div>
          <iframe seamless id="payWin" name="payWin" style="width: 100%; height: 700px; border: none;"></iframe>
        </div>
      </el-dialog>
      <!-- 允许提车并放款 -->
      <dialog-pickup :visible.sync="pickupVisible" :form-data="{ orderId: info.id }" @change="getInfo"></dialog-pickup>
      <!-- 结算申请 -->
      <dialog-settle :visible.sync="settleVisible" :form-data="{ orderId: info.id, deadline: info.deadline }" @change="getInfo"></dialog-settle>
      <!-- 验车申请 -->
      <dialog-checkcar :visible.sync="checkcarVisible" :form-data="{ orderId: info.id, deadline: info.deadline }" @change="getInfo"></dialog-checkcar>
      <!-- 预览图片 -->
      <image-previewer style="display:none;" ref="viewer" :file-list="images"></image-previewer>
    </el-main>
  </el-container>
</template>
<script>
import ImagePreviewer from '@/components/image-previewer'
import dialogPickup from './dialog-pickup'
import dialogSettle from './dialog-settle'
import dialogCheckcar from './dialog-checkcar2'
import dialogViewer from './dialog-viewer'

// 签署合同 签署状态-1：撤消 0：待签署（初始） 5：花生已签署 -5：花生签署失败 10：客户已签署 -10：客户签署失败
// 订单动态 0：验车(后台）  1：装车  2：允许物流提车并放款(汽贸店） 3：途中待入库  4：添加垫资单 5：录入物流信息 6：录入入库信息  7：提出结算申请 8：财务确认金额 9：总经理确认放款 10：财务已放款  11：总经理确认结算金额 12：订单审核  13：总经理签约订单 14：客户已签约，订单正式受理 15：汽贸店订单审核通过  16：汽贸店签署合同，订单签署完成  17：已交保证金（后台）  18：已交保证金（汽贸店）19：录入物流信息（汽贸店）20：验车（汽贸店）21：允许物流提车并放款（后台） 22：验车申请（汽贸店）
export default {
  name: 'order-info2',
  components: {
    ImagePreviewer,
    dialogPickup,
    dialogSettle,
    dialogCheckcar,
    dialogViewer,
  },
  data() {
    return {
      stateList: [
        { label: '全部', value: '',  css: '' },
        { label: '待受理', value: 0,  css: 'l-alert-warn', icon: 'el-icon-warning' },
        { label: '待付保证金', value: 2,  css: 'l-alert-warn', icon: 'el-icon-warning' },
        { label: '车辆运输中', value: 3, css: 'l-alert-warn', icon: 'el-icon-warning' },
        { label: '车辆等待入库', value: 4, css: 'l-alert-warn' },
        { label: '车辆已入库', value: 5, css: 'l-alert-warn' },
        { label: '已申请结算', value: 6, css: 'l-alert-warn' },
        { label: '待出票证', value: 7, css: 'l-alert-warn' },
        { label: '已逾期', value: 8, css: 'l-alert-error', },
        { label: '已完成', value: 9, css: 'l-alert-ok', icon: 'el-icon-success' },
        { label: '不受理', value: -2, css: 'l-alert-gray' },
        { label: '订单异常', value: -10, css: 'l-alert-error', hidden: true },
        { label: '已关闭', value: -11, css: 'l-alert-gray' },
      ],
      statusList: {
        '0': { label: '订单审核中' },        // 风控申请订单中（准备签署合同，调整金额及利率等）
        '1': { label: '待签署合同' },        // 等待徐总发起并签署合同
        '2': { label: '待录入物流信息' },
        '4': { label: '待录入验车信息' },
        '6': { label: '待确认提车' },        
        '8': { label: '待确认放款 ' },       // 待徐总确认放款
        '10': { label: '待确认放款' },       // 徐总确认授权，待财务打款给4S店
        '12': { label: '待录入装车信息' },
        '14': { label: '待录入入库信息' },
        '16': { label: '待结算申请' },       // 垫资车辆已到仓库，待汽贸店验车申请、结算申请
        '18': { label: '订单结算中' },       // 已申请结算，等待财务确认金额（利息及额外费用等）
        '20': { label: '订单结算中' },       // 财务已确认金额，待徐总确认
        '22': { label: '待提车' },           // 待汽贸店提车/付款
      },
      images: [],             // 图片预览
      payInfo: {              // 支付信息
        visible: false,
        formData: {}
      },
      pickupVisible: false,   // 允许提车
      settleVisible: false,   // 结算申请
      checkcarVisible: false, // 验车申请
      dialogViewer: {
        visible: false,
        type: '',
        info: {}
      },
      info: null              // 订单信息
    }
  },
  methods: {
    getState(state) {
      return this.stateList.filter(item => item.value === state)[0] || {}
    },
    previewImage(index = 0, images = []) {
      this.images = images
      setTimeout(() => {
        this.$refs.viewer.preview(index)
      }, 50)
    },
    getInfo() {
      let loading = this.$loading()
      this.$api.order.getInfo(this.$route.query.id).then(({data}) => {
        data.voucher = data.voucher ? data.voucher.split(',') : []
        data.contractUrl = data.contractUrl ? data.contractUrl.split(',') : []
        
        this.info = data
      }).finally(() => {
        loading.close()
      })
    },
    payAmount(type = 0) { // 网关支付
      const loading = this.$loading()
			this.$api.order.payAmount({
        type,
        orderId: this.info.orderId,
				pickupUrl: location.href
			}).then(({data}) => {
				this.payInfo.formData = data
        this.payInfo.visible = true
        setTimeout(() => {
          this.$$payWin = document.querySelector('#payWin')
          this.$$payWin.loadtimes = 0
          this.$$payWin.onload = () => {
            if(++this.$$payWin.loadtimes >= 2) {
              this.closePayWin()
            }
          }
          this.$refs.payForm.submit()
        }, 100)
			}).finally(() => {
				loading.close()
			})
    },
    closePayWin(done) {
			if(done) {
				done()
			}else {
				this.payInfo.innerVisible = false
				this.payInfo.visible = false

				const h = this.$createElement
        this.$msgbox({
          title: '支付提示',
          message: h('div', null, [
            h('p', null, '请您在新打开的页面上完成支付。'),
            h('p', { style: 'color: #ccc; font-size: 12px;' }, '支付完成后，根据您的情况点击下面按钮。')
          ]),
          showCancelButton: true,
          confirmButtonText: '支付成功',
          cancelButtonText: '支付失败',
          type: 'warning'
        }).then(() => {
          this.getInfo()
        })
			}
    },
    showViewer(item = {}) {
      console.log(item.type)
      switch(item.type) {
        case 5:
          this.dialogViewer.info = this.info.logistics
          break
        default:
          this.dialogViewer.info = item
      }
      this.dialogViewer.type = item.type
      this.dialogViewer.visible = true
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
.l-carsInfo{
  border: 3px solid #f3f1f2; padding: 15px; width: 771px; margin-right: 15px; min-height: 200px; box-sizing: border-box;
  ._tag{
    background-color: #5c7fc1; color: #fff; padding: 2px 5px; margin-right: 15px;
  }
  ._tag2{display: inline-block; margin-top: 5px; border: 1px solid #e9e9e9; padding: 5px 10px; color: #a1a6ba; background-color: #fdfcfa; white-space: nowrap;}
  ._item{display: inline-block; min-width: 200px; margin-right: 10px; color: #a1a6ba; }
}
.l-order-news{ background-color: #f9f7f8; width: 380px; height: 200px; overflow: auto; box-sizing: border-box; padding: 15px;}
</style>