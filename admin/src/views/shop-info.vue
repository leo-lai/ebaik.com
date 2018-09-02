<template>
  <el-container v-if="info" class="l-h100">
    <el-header class="l-padding-0" height="auto">
      <div v-if="info.state === 2">
        <div class="l-alert-ok" v-if="info.status === 10"><i class="el-icon-success"></i>&ensp;门店资料已通过认证</div>
        <div class="l-alert-warn" v-else><i class="el-icon-warning"></i>&ensp;待签署框架合同</div>
      </div>
      <div v-else-if="info.state === 0" class="l-alert-warn">
        <span v-if="info.status === -2">&ensp;{{info.statusName}}（{{info.reason}}）</span>
        <span v-else><i class="el-icon-warning"></i>&ensp;请审核门店资料</span>
        <span class="l-margin-l-x2">
          <el-button white size="mini" @click.native="dialogReason.visible = true">拒绝通过</el-button>
          <el-button type="success" size="mini" @click.native="submitConfirm()">通过认证</el-button>
        </span>
      </div>
      <div v-else class="l-alert-error">
        <span><i class="el-icon-error"></i>&ensp;认证失败（{{info.reason}}）</span>
      </div>
    </el-header>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/shop/list">门店管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{info.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="l-margin-t l-zoom">
        <div class="l-fl" style="width: 920px; margin-right: 15px;">
          <div class="l-panel-item l-margin-b">
            <div class="_hd1 l-fs-xl">
              <span class="l-fr l-txt-nowrap" style="margin: -6px 0;" v-if="info.state === 0">
                门店额度：<el-input style="width: 220px;" placeholder="请输入门店垫资额度" v-model="formData.amount" maxlength="9">
                  <span slot="append">元</span>
                </el-input>
              </span>
              <b>汽贸店基本信息</b>
            </div>
            <div class="l-padding-xl">
              <table class="l-table-02" style="width: 845px;">
                <tr>
                  <td width="100" class="_tit">公司名称</td>
                  <td>{{info.name}}</td>
                </tr>
                <tr>
                  <td width="100" class="_tit">公司地址</td>
                  <td>{{info.address}}</td>
                </tr>
                <tr>
                  <td width="100" class="_tit">工商注册号</td>
                  <td>{{info.licenseCode}}</td>
                </tr>
                <template v-if="info.bankList[0]">
                  <tr>
                    <td width="100" class="_tit">对公银行账号</td>
                    <td>{{info.bankList[0].account}}</td>
                  </tr>
                  <tr>
                    <td width="100" class="_tit">开户支行</td>
                    <td>{{info.bankList[0].bankBranch}}</td>
                  </tr>
                </template>
              </table>
              <div class="l-margin-t">
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">营业执照</div>
                  <div class="_img" :style="{'background-image': 'url('+info.license[0]+')'}">
                    <b @click="previewImage(0, info.license)">点击查看大图({{info.license.length}}张)</b>
                  </div>
                </div>
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">场地租赁合同或产权证明</div>
                  <div class="_img" :style="{'background-image': 'url('+info.securities[0]+')'}">
                    <b @click="previewImage(0, info.securities)">点击查看大图({{info.securities.length}}张)</b>
                  </div>
                </div>
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">公司照片</div>
                  <div class="_img" :style="{'background-image': 'url('+info.image[0]+')'}">
                    <b @click="previewImage(0, info.image)">点击查看大图({{info.image.length}}张)</b>
                  </div>
                </div>
                <div class="l-image-preview l-margin-r">
                  <div class="_tit">企业认证申请书</div>
                  <div class="_img" :style="{'background-image': 'url('+info.certificate+')'}">
                    <b @click="previewImage(0, [info.certificate])">点击查看大图(1}张)</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="l-panel-item l-margin-b">
            <div class="_hd1 l-fs-xl"><b>法定代表人{{info.isShareHolder ? '/大股东' : ''}}{{info.hasAgent ? '/签署人' : ''}}信息</b></div>
            <div class="l-padding-xl l-zoom l-padding-b">
              <div class="l-fl l-flex-h l-margin-b l-margin-r">
                <div class="l-men-info l-flex-vc">
                  <b>法人姓名：{{info.corporation}}</b>
                  <p class="l-margin-t-s">手机号码：{{info.phone}}</p>
                  <p>电子邮箱：{{info.email}}</p>
                  <p>身份证号：{{info.idCard}}</p>
                </div>
                <div class="l-image-preview">
                  <div class="_tit">身份证正反面</div>
                  <div class="_img" :style="{'background-image': 'url('+info.idCardOn+')'}">
                    <b @click="previewImage(0, [info.idCardOn, info.idCardOff])">点击查看大图(2张)</b>
                  </div>
                </div>
              </div>
              <div v-if="info.isShareHolder" class="l-fl l-flex-h l-margin-b">
                <div class="l-men-info l-flex-vc">
                  <b>大股东姓名：{{info.shareHolder.name}}</b>
                  <p class="l-margin-t-s">手机号码：{{info.shareHolder.phone}}</p>
                  <p>电子邮箱：{{info.shareHolder.email}}</p>
                  <p>身份证号：{{info.shareHolder.idCard}}</p>
                </div>
                <div class="l-image-preview">
                  <div class="_tit">身份证正反面</div>
                  <div class="_img" :style="{'background-image': 'url('+info.shareHolder.idCardOn+')'}">
                    <b @click="previewImage(0, [info.shareHolder.idCardOn, info.shareHolder.idCardOff])">点击查看大图(2张)</b>
                  </div>
                </div>
              </div>
              <div v-if="info.hasAgent" class="l-fl l-flex-h l-margin-b">
                <div class="l-men-info l-flex-vc">
                  <b>签署人姓名：{{info.signName}}</b>
                  <p class="l-margin-t-s">手机号码：{{info.signPhone}}</p>
                  <p>电子邮箱：{{info.signEmail}}</p>
                  <p>身份证号：{{info.signIdCard}}</p>
                </div>
                <div class="l-image-preview">
                  <div class="_tit">身份证正反面</div>
                  <div class="_img" :style="{'background-image': 'url('+info.signIdCardOn+')'}">
                    <b @click="previewImage(0, [info.signIdCardOn, info.signIdCardOff])">点击查看大图(2张)</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.state === 0" class="l-fl" style="width: 380px;">
          <div class="l-panel-item l-fl" style="width: 380px; margin: 0 15px 15px 0;">
            <div class="_hd1 l-fs-xl">
              <span class="l-fr l-fs-xs l-margin-t-s">
                <el-upload style="display:inline-block;" ref="upload" :show-file-list="false" accept=".pdf" action="" :auto-upload="false" :on-change="uploadChange">
                  <a slot="trigger" class="l-txt-link">上传自定义合同</a>
                </el-upload>
                <a class="l-txt-link l-margin-l" @click="uploadType(0)">使用默认合同</a>
              </span>
              <b>框架合同签署</b>
            </div>
            <div class="l-padding-xl">
              <div class="l-contract-pre l-flex-vhc _1">
                <div v-if="formData.contractType === 1" class="_tag" title="自定义"></div>
                <div v-else class="_tag" title="默认"></div>
                <div class="_inner">
                  <a class="_link" target="_blank" :href="formData.contractUrl">{{info.contract.Title}}</a>
                </div>
                <!-- <a class="l-txt-link l-margin-t">下载</a> -->
                <div v-show="loading" class="l-flex-vhc _loading">
                  <i class="el-icon-loading" style="font-size: 20px; margin-bottom: 10px;"></i>
                  <p class="l-fs-s">合同上传中</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="info.state === 2" class="l-fl" style="width: 380px;">
          <div class="l-panel-item l-fl" style="width: 380px; margin: 0 15px 15px 0;">
            <div class="_hd1 l-fs-xl"><b>框架合同签署</b></div>
            <div class="l-padding-xl">
              <div class="l-contract-pre l-flex-vhc _1">
                <div v-if="info.status === 10" class="_tag" style="background-color: #39b94d;" title="已签署"></div>
                <div v-else class="_tag" title="待签署"></div>
                <div class="_inner">
                  <a class="_link" target="_blank" :href="info.contract.Template">{{info.contract.Title}}</a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="info.status === 10" class="l-panel-item l-fl" style="width: 380px; margin: 0 15px 15px 0;">
            <div class="_hd1 l-fs-xl">
              <b>门店额度使用情况</b>
              <span class="l-tag-rect1">剩余额度</span>
              <span class="l-tag-rect2">已用额度</span>
            </div>
            <div class="l-shop-amount">
              <doughnut-chart :chart-data="chart.data" :options="chart.options" :height="250"></doughnut-chart>
              <div class="_all">
                <p class="l-fs-xs">垫资总额度</p>
                <b class="l-rmb l-txt-theme l-fs-x2">{{info.amountInfo.amount}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 拒绝通过 -->
      <el-dialog :before-close="closeDialogReason" :title="dialogReason.title" :visible.sync="dialogReason.visible" width="400px">
        <el-input v-model="formData.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeDialogReason()">取消</el-button>
          <el-button type="primary" :loading="dialogReason.loading" @click="submitDialogReason">{{ dialogReason.loading ? '提交中...' : '确定提交'}}</el-button>
        </span>
      </el-dialog>
      
      <!-- 预览图片 -->
      <image-previewer style="display:none;" ref="viewer" :file-list="images"></image-previewer>
    </el-main>
  </el-container>
</template>
<script>
import DoughnutChart from '@/components/chartjs/doughnut'
import ImagePreviewer from '@/components/image-previewer'
import * as qiniu from 'qiniu-js'

export default {
  name: 'shop-info',
  components: {
    ImagePreviewer,
    DoughnutChart
  },
  data() {
    return {
      chart: {
        data: {
          labels: ['已用额度', '剩余额度'],
          datasets: [
            {
              backgroundColor: [ '#EAB024', '#39b94d'],
              data: [0, 0]
            }
          ]
        },
        options: {
          tooltips: {
            yPadding: 10,
            xPadding: 10,
            cornerRadius: 1,
          },
          legend: {
            display: false,
            reverse: true
          },
          cutoutPercentage: 70
        }
      },
      images: [],
      loading: false,
      formData: {
        orgId: '',
        state: '',    // 2通过 -1拒绝
        reason: '',   // 拒绝原因
        amount: '',
        contractType: 0,
        contractUrl: ''
      },
      dialogReason: {
        title: '拒绝原因',
        loading: false,
        visible: false,
      },
      info: null
    }
  },
  methods: {
    uploadType(contractType = 0) { // 默认合同
      this.formData.contractType = contractType
      if(contractType === 0) {
        this.formData.contractUrl = this.info.contract.Template
      }
    },
    uploadChange(file) { // 上传合同
      let that = this
      that.formData.contractType = 1

      that.$utils.fileToBlob(file.raw).then(blobData => {
        that.loading = true
        that.$api.getQiniuToken().then(data => {
          if(data.token) {
            qiniu.upload(blobData, Date.now() + '_' + file.name, data.token).subscribe({
              next(/* { total } */){
                // Math.ceil(total.percent)
              },
              error({ message }){
                that.$message.error(message)
              }, 
              complete(res){
                that.loading = false
                that.formData.contractUrl = that.$api.qiniuURL + res.key
              }
            })
          }else{
            that.$message.error('合同上传失败')
            that.loading = false
          }
        }).catch(() => {
          that.loading = false
        })
      }).catch(({ message }) => {
        that.$message.error(message)
      })
    },
    previewImage(index = 0, images = []) {
      this.images = images
      setTimeout(() => {
        this.$refs.viewer.preview(index)
      }, 50)
    },
    getInfo() {
      let loading = this.$loading()
      this.$api.shop.getInfo(this.$route.query.id).then(({data}) => {
        data.hasAgent = Number(!(data.signName === data.corporation && data.signPhone === data.phone && data.signIdCard === data.idCard))
        data.state = data.status === -2 ? 0 : data.state
        this.chart.data.datasets[0].data[0] = data.amountInfo.usedAmount
        this.chart.data.datasets[0].data[1] = data.amountInfo.unUsedAmount
        
        this.formData.contractUrl = data.contract.Template

        this.info = data
      }).finally(() => {
        loading.close()
      })
    },
    closeDialogReason(done) {
      if(done) {
				done()
			}else{
				this.dialogReason.visible = false	
      }
    },
    submitDialogReason() {
      this.submit(-1)
    },
    submitConfirm() { // 通过确认
      this.$confirm('是否确定门店资料通过认证，<br/>并向总经理发起签署框架协议请求？', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确认通过',
        cancelButtonText: '取消'
      }).then(() => {
        this.submit(2)
      })
    },
    submit(type = 2) {
      let formData = Object.assign({}, this.formData)
      if(type === 2) { // 通过审核
        if(!formData.amount) {
          return this.$message.error('请输入门店垫资额度')
        }
        if(formData.contractType === 1 && !formData.contractUrl) {
          return this.$message.error('请上传自定义合同')
        }
        formData.reason = null
      }else if(type === -1){ // 拒绝通过
        if(!formData.reason) {
          return this.$message.error('请输入拒绝原因')
        }
        this.dialogReason.visible = false
      }

      formData.orgId = this.$route.query.id
      formData.state = type
      let loading = this.$loading()
      this.$api.shop.auth(formData).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功',
          duration: 1000,
          onClose: () => {
            this.getInfo()
          }
        })
      }).finally(() => {
        loading.close()
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>
<style scoped lang="less">
.l-info-null{ height: 500px; text-align: center;}
.l-men-info{
  width: 220px; border: 1px solid #efeff4; box-sizing: border-box; margin-right: -1px; padding: 0 0 0 15px;
  p{font-size: 12px; color: #5b7fc1;}
}

.l-shop-amount{
  position: relative; padding: 30px 15px 29px; 
  ._all{position: absolute; text-align: center; top: 50%; left: 50%; margin: -25px 0 0 -75px; width: 150px; height: 51px;}
}

</style>