<template>
  <el-container class="l-h100">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="l-bg-white l-margin-t">
        <div class="l-tab">
          <ul class="l-tab-tit">
            <li @click="$router.replace('/me')">账号基本信息</li>
            <li class="_active0">门店认证资料</li>
            <!-- <li @click="$router.replace('/shop/amount')">额度管理</li> -->
          </ul>
        </div>

        <div class="l-zoom" v-if="info">
          <div v-if="info.state === 2">
            <div class="l-alert-ok" v-if="info.status === 10"><i class="el-icon-success"></i>&ensp;门店资料已通过认证</div>
            <div class="l-alert-warn" v-else><i class="el-icon-warning"></i>&ensp;待签署框架合同</div>
          </div>
          <div v-else-if="info.state === 0" class="l-alert-warn"><span><i class="el-icon-warning"></i>&ensp;认证中，请耐心等待审核</span></div>
          <div v-else class="l-alert-error">
            <span><i class="el-icon-error"></i>&ensp;认证失败（原因：{{info.reason || '无'}}）</span>
            <el-button class="l-margin-l" type="success" size="mini" @click.native="$router.push('/shop/auth?id=' + info.id)">重新申请</el-button>
          </div>
          <div class="l-fl" style="width: 920px; margin-right: 15px;">
            <div class="l-panel-item l-margin-b">
              <div class="_hd l-fs-xl"><b>汽贸店基本信息</b></div>
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
                    <td width="100" class="_tit l-fs-xs">工商注册号</td>
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
              <div class="_hd l-fs-xl"><b>法定代表人{{info.isShareHolder ? '/大股东' : ''}}{{info.hasAgent ? '/签署人' : ''}}信息</b></div>
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
                <div v-if="info.isShareHolder && info.shareHolder" class="l-fl l-flex-h l-margin-b">
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
          <div v-if="info.state === 2" class="l-fl" style="width: 380px;">
            <div class="l-panel-item l-fl" style="width: 380px; margin: 0 15px 15px 0;">
              <div class="_hd l-fs-xl"><b>框架合同签署</b></div>
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
              <div class="_hd l-fs-xl">
                <b>门店额度使用情况</b>
                <span class="l-tag-rect1">剩余额度</span>
                <span class="l-tag-rect2">已用额度</span>
              </div>
              <div class="l-doughnut">
                <doughnut-chart :chart-data="chart.data" :options="chart.options" :height="250"></doughnut-chart>
                <div class="_all">
                  <p class="l-fs-xs">垫资总额度</p>
                  <b class="l-rmb l-txt-theme l-fs-x2">{{info.amountInfo.amount}}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="l-info-null l-flex-vhc">
          <div class="l-txt-gray" v-if="loading">
            <span class="el-icon-loading" style="font-size: 20px;"></span>
            <p class="l-margin-t-s">加载中...</p>
          </div>
          <div v-else>
            <img src="../assets/images/20180814001.jpg" alt="">
            <p class="l-txt-gray l-margin-tb">门店尚未认证</p>
            <el-button style="width: 200px;" type="success" @click.native="$router.push('/shop/auth')">去认证</el-button>
          </div>
        </div>
      </div>

      <image-previewer style="display:none;" ref="viewer" :file-list="images"></image-previewer>
    </el-main>
  </el-container>
</template>
<script>
import DoughnutChart from '@/components/chartjs/doughnut'
import ImagePreviewer from '@/components/image-previewer'
export default {
  name: 'shop-auth-info',
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
      info: null
    }
  },
  methods: {
    previewImage(index = 0, images = []) {
      this.images = images
      setTimeout(() => {
        this.$refs.viewer.preview(index)
      }, 50)
    },
    getInfo() {
      this.loading = true
      this.$api.shop.getInfo().then(({data}) => {
        data.hasAgent = data.signName && data.signName !== data.corporation
        this.info = data
        this.chart.data.datasets[0].data[0] = data.amountInfo.usedAmount
        this.chart.data.datasets[0].data[1] = data.amountInfo.unUsedAmount
      }).finally(() => {
        this.loading = false
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
.l-contract-pre{
  background-color: #f9f8f8; position: relative; padding: 40px 15px 30px; 
  ._inner{ 
    width: 160px; height: 217px; background: #fff url('../assets/images/20180816001.jpg') no-repeat 50% 50%; border: 1px solid #dbdbdb; position: relative; 
    a{background-color: rgba(0, 0, 0, 0.6); color: #fff; text-decoration: underline; position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 5px; text-align: center; font-size: 12px;}
  }
  ._tag{  background-color: #EAB024; color: #fff; position: absolute; top:0; left: 0; width: 60px; height: 60px; clip-path: polygon(0 0, 0 100%, 100% 0);}
  ._tag::before{
    content: attr(title); display: block; transform: rotate(-45deg); font-size: 12px;
    margin: 8px 0 0 -3px; text-align: center; width: 42px;
  }
  ._loading{
    position: absolute; top:0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.6); color: #fff;
  }
}
</style>