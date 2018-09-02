<template>
  <el-container class="l-h100">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>垫资申请</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form class="l-bg-white l-zoom l-margin-t l-form-1" inline label-position="top" ref="infoForm" :model="form.data" :rules="form.rules" @submit.native.prevent>
        <div class="l-panel-item l-margin-t">
          <div class="_hd l-fs-xl l-flex-hc">
            <b class="l-margin-r-x2">垫资车辆信息</b>
            <p style="font-size: 14px;">
              <span>融资期限：{{form.data.period}}天</span>
              <span class="l-liney"></span>
              <span>
                <i title="以实际放款日为准，乙方按照合同约定无条件溢价回购已转让债权，并向甲方按照合同之约定支付回购价款的行为" class="el-icon-question l-txt-theme"></i>
                预计溢价回购期限：{{periodDate}}（可提前还款）
              </span>
              <span class="l-liney"></span>
              <span class="l-txt-error">应收保证金：<i class="l-rmb">{{form.data.bond}}</i></span>
            </p>
          </div>
          <div class="_bd">
            <div class="l-margin">
              <el-form-item label="车架号" prop="carsInfo.frameNumber">
                <el-input v-model="form.data.carsInfo.frameNumber" placeholder="请输入车辆车架号" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="车辆品牌车系" prop="carsInfo.carName">
                <el-input v-model="form.data.carsInfo.carName" placeholder="请输入车辆品牌，车系信息" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="型号" prop="carsInfo.style">
                <el-input v-model="form.data.carsInfo.style" placeholder="请输入车辆型号" :maxlength="100"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="变速箱" prop="carsInfo.gearbox">
                <el-select style="width: 100%;" v-model="form.data.carsInfo.gearbox" filterable allow-create placeholder="请选择车辆变速箱类型">
                  <el-option label="手动" value="手动"></el-option>
                  <el-option label="自动" value="自动"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车身颜色" prop="carsInfo.color">
                <el-input v-model="form.data.carsInfo.color" placeholder="请输入车身颜色" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="内饰颜色" prop="carsInfo.interiorColor">
                <el-input v-model="form.data.carsInfo.interiorColor" placeholder="请输入内饰颜色" :maxlength="100"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="" prop="carsInfo.type" style="width: 780px;">
                <label slot="label">
                  车辆配置：
                  <el-radio-group v-model="form.data.carsInfo.type">
                    <el-radio label="标配">标配</el-radio>
                    <el-radio label="选配">选配</el-radio>
                  </el-radio-group>
                </label>
                <el-input :disabled="form.data.carsInfo.type === '标配'" style="vertical-align: top;" type="textarea" v-model="form.data.carsInfo.remark" placeholder="请输入选配详情信息" :autosize="{ minRows: 2, maxRows: 5}"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="4S店采购价" prop="carsInfo.purchasePrice">
                <el-input v-model="form.data.carsInfo.purchasePrice" @input="formatNumber('carsInfo.purchasePrice')" placeholder="请输入与4S店的采购价" :maxlength="10"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="买方实际成交价" prop="carsInfo.price">
                <el-input v-model="form.data.carsInfo.price" @input="formatNumber('carsInfo.price')" placeholder="请输入与买方的实际成交价" :maxlength="10"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="车辆官方指导价" prop="carsInfo.guidePrice">
                <el-input v-model="form.data.carsInfo.guidePrice" @input="formatNumber('carsInfo.guidePrice')"  placeholder="请输入车辆官方指导价" :maxlength="10"><template slot="append">元</template></el-input>
              </el-form-item>
              <br>
              <el-form-item label="已付款4S店定金" prop="paidDeposit">
                <el-input v-model="form.data.paidDeposit" @input="formatNumber('paidDeposit')" placeholder="请输入已付给4S店金额" :maxlength="10"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="买方已交定金" prop="deposit">
                <el-input v-model="form.data.deposit" @input="formatNumber('deposit')" placeholder="请输入买方已交金额" :maxlength="10"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label="预计提车时间" prop="pickUpTime">
                <el-date-picker style="width: 100%;" v-model="form.data.pickUpTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <br>
              <el-form-item label="" prop="carsInfo.amount">
                <label slot="label"><b>需要垫资金额</b><i class="l-fs-xs"></i></label>
                <el-input v-model="form.data.carsInfo.amount" @input="formatNumber('carsInfo.amount')" placeholder="请输入需要垫资的金额" :maxlength="10"><template slot="append">元</template></el-input>
              </el-form-item>
              <el-form-item label=" ">
                <div class="l-fs-xs l-txt-error" style="line-height: 1.6;">
                  <!-- <p>当前可用额度：￥{{amountInfo.unUsedAmount}}</p> -->
                  <p>垫资金额不能超过4S店采购价（减去定金）的80%<br>且不能超过80万</p>
                </div>
              </el-form-item>
              <br>
              <el-form-item label="定金凭证" prop="voucher">
                <uploader :file-list.sync="images.voucher" :sample-pic="sample.voucher"></uploader>
              </el-form-item>
              <el-form-item label="购车合同" prop="contractUrl">
                <uploader :file-list.sync="images.contractUrl" :sample-pic="sample.contractUrl"></uploader>
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- 买方信息 -->
        <div class="l-panel-item l-margin-t">
          <div class="_hd l-fs-xl"><b class="l-margin-r-x2">买方（车主）信息</b></div>
          <div class="_bd">
            <div class="l-margin">
              <el-form-item label="买方姓名" prop="userName">
                <el-input v-model="form.data.userName" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.data.phone" placeholder="请输入" :maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="居住地址" prop="address">
                <el-input v-model="form.data.address" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="form.data.idCard" placeholder="请输入" :maxlength="18"></el-input>
              </el-form-item>
              <el-form-item label="身份证正反面" prop="idCardOn">
                <uploader class="l-margin-r" :file-list.sync="images.idCardOn" :sample-pic="sample.idCardOn" :limit="1" tip="身份证正面"></uploader>
                <uploader :file-list.sync="images.idCardOff" :sample-pic="sample.idCardOff" :limit="1" tip="身份证反面"></uploader>
              </el-form-item>
            </div>
          </div>
        </div>
        <!-- 销售商信息 -->
        <div class="l-panel-item l-margin-t">
          <div class="_hd l-fs-xl"><b class="l-margin-r-x2">销售商（4S店）信息</b></div>
          <div class="_bd">
            <div class="l-margin">
              <el-form-item label="销售商名称" prop="shopName">
                <el-input v-model="form.data.shopName" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="公司详细地址" prop="orgAddress">
                <el-input v-model="form.data.orgAddress" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="公司对公收款账户" prop="account">
                <el-input v-model="form.data.account" placeholder="请输入" :maxlength="20"></el-input>
              </el-form-item>
              <br>
              <el-form-item label="联系人姓名" prop="orgLink">
                <el-input v-model="form.data.orgLink" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号码" prop="orgPhone">
                <el-input v-model="form.data.orgPhone" placeholder="请输入" :maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="收款账户开户支行" prop="bankBranch">
                <el-input v-model="form.data.bankBranch" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="l-txt-center" style="width: 980px; max-width: 100%;">
          <p class="l-txt-error">* 请如实填写以上资料，否则将申请不通过</p>
          <p class="l-margin-t"><el-button type="success" @click.native="submit()">提交垫资申请</el-button></p>
          <br>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import Uploader from '@/components/uploader'
let formatNumber = function(numStr = '') {
  numStr = numStr.toString()
  //先把非数字的都替换掉，除了数字和.  
  numStr = numStr.replace(/[^\d.]/g, '')
  //必须保证第一个为数字而不是.  
  numStr = numStr.replace(/^\./g, '')  
  //保证只有出现一个.而没有多个.  
  numStr = numStr.replace(/\.{2,}/g,'.')  
  //保证.只出现一次，而不能出现两次以上  
  numStr = numStr.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  return numStr
}
export default {
  name: 'order-add',
  components: { Uploader },
  data() {
    return {
      amountInfo: {},
      sample: {
        voucher: ['http://pck87tzij.bkt.clouddn.com/%E5%AE%9A%E9%87%91%E5%87%AD%E8%AF%81.jpg'],
        contractUrl: ['http://pck87tzij.bkt.clouddn.com/%E8%B4%AD%E8%BD%A6%E5%90%88%E5%90%8C.jpg'],
        idCardOn: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg'],
        idCardOff: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%8D%E9%9D%A2.jpg'],
      },
      images: {
        voucher: [],
        contractUrl: [],
        idCardOn: [],
        idCardOff: [],
      },
      form: {
        rules: {
          paidDeposit: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          deposit: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          voucher: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          contractUrl: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          pickUpTime: [
            { required: true, message: '必选项', trigger: 'change' }
          ],

          'carsInfo.amount': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.frameNumber': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.carName': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.style': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.gearbox': [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          'carsInfo.color': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.interiorColor': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.type': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.guidePrice': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.purchasePrice': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          'carsInfo.price': [
            { required: true, message: '必选项', trigger: 'blur' }
          ],

          userName: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCardOn: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          idCardOff: [
            { required: true, message: '必选项', trigger: 'change' }
          ],

          shopName: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          orgAddress: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],        
          orgLink: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],          
          orgPhone: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],         
          account: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],           
          bankBranch: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
        },
        data: {
          // 订单信息
          paidDeposit: '',      // 已付4S定金
          deposit: '',          // 客户已付定金
          voucher: '',          // 定金支付凭证
          contractUrl: '',      // 购车合同
          period: 30,           // 垫资期限
          bond: 0,              // 保证金 = 实际销售价-定金-垫资本金
          pickUpTime: '',       // 提车时间
          // 车辆信息
          carsInfo: {
            amount: '',          // 计息融资金额
            frameNumber: '',     // 车架号
            carName: '',         // 车型
            // brand: '',           // 车品牌
            // family: '',          // 车系
            style: '',           // 车辆版本
            gearbox: '',         // 变速箱
            color: '',           // 车身颜色
            interiorColor: '',   // 内饰颜色
            type: '标配',        // 标配选配
            remark: '',          // 选配备注
            number: 1,
            guidePrice: '',      // 官方指导价
            purchasePrice: '',   // 4s采购价
            price: '',           // 实际销售价
            
          },
          // 买家信息
          userName: '',
          phone: '',
          address: '',
          idCard: '',
          idCardOn: '',
          idCardOff: '',
          // 4S店信息
          shopName: '',
          orgAddress: '',        // 4s店地址
          orgLink: '',           // 联系人
          orgPhone: '',          // 联系人电话
          account: '',           
          bankBranch: '',
        }
      }
    }
  },
  computed: {
    periodDate() {
      let pickUpTime = this.form.data.pickUpTime
      return pickUpTime ? 
        new Date(Date.parse(pickUpTime.replace(/-/gi, '/')) + 1000 * 60 * 60 * 24 * 30).format('yyyy-MM-dd') :
        '--'
    }
  },
  methods: {
    formatNumber(name) {
      let parseFloat = Number.parseFloat || window.parseFloat
      let { deposit, paidDeposit, carsInfo } = this.form.data
      let { guidePrice, purchasePrice, price, amount } = carsInfo
      let max1 = 0
      let max2 = 800000

      clearTimeout(this.timeid)
      this.timeid = setTimeout(() => {
        switch(name) { // 限制输入金额
          case 'carsInfo.guidePrice':
            guidePrice = formatNumber(guidePrice)
            this.form.data.carsInfo.guidePrice = guidePrice
            break
          case 'carsInfo.price':
            price = formatNumber(price)
            this.form.data.carsInfo.price = price
            break
          case 'deposit':
            deposit = formatNumber(deposit)
            this.form.data.deposit = (price && parseFloat(deposit) > parseFloat(price)) ? price : deposit
            break
          case 'carsInfo.purchasePrice':
            purchasePrice = formatNumber(purchasePrice)
            this.form.data.carsInfo.purchasePrice = purchasePrice
            break
          case 'paidDeposit':
            paidDeposit = formatNumber(paidDeposit)
            this.form.data.paidDeposit = (purchasePrice && parseFloat(paidDeposit) > parseFloat(purchasePrice)) ? purchasePrice : paidDeposit
            break
          case 'carsInfo.amount':
            amount = formatNumber(amount)
            break
        }
        switch(name) { // 自动计算金额
          case 'carsInfo.purchasePrice':
          case 'paidDeposit':
          case 'carsInfo.amount':
            if(amount && purchasePrice) {
              amount = parseFloat(amount)
              max1 = parseFloat((Math.max(purchasePrice - paidDeposit, 0) * 0.8).toFixed(2))
              amount = Math.min(amount, max1, max2)
              this.form.data.carsInfo.amount = amount
            }else{
              this.form.data.carsInfo.amount = amount
            }
            this.form.data.bond = Math.max(purchasePrice - paidDeposit - amount, 0)
            break
        }
      }, 500)      
    },
    setImages(formData = {}) {
      let images = Object.assign({}, this.images)
      this.$utils.copyObj(images, formData)
      Object.keys(images).forEach(key => {
        if(!this.$utils.isArray(images[key])) {
          images[key]  = (images[key] && this.$utils.isString(images[key])) ? images[key].split(',') : []
        }
      })
      return this.$utils.copyObj(this.images, images)
    },
    getImages(formData = {}) {
      let images = Object.assign({}, this.images)
      Object.keys(images).forEach(key => {
        images[key] = images[key].join(',')
      })
      return this.$utils.copyObj(formData, images)
    },
    submit() {
      this.form.data = this.getImages(this.form.data)
      let formData = Object.assign({}, this.form.data)
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if(formData.carsInfo.type === '选配' && !formData.carsInfo.remark) {
            this.$message.error('请输入选配详情信息')
            return
          }

          formData.carsInfo = JSON.stringify(formData.carsInfo)

          let promise = this.$route.query.id ? this.$api.order.edit(formData) : this.$api.order.add(formData)
					let loading =  this.$loading()
          promise.then(({data}) => {
            this.$message({
							type: 'success',
              message: '垫资申请提交成功',
              duration: 1000,
              onClose: () => {
                this.$router.replace('/order/info?id=' + data.orderId)
              }
            })
          }).finally(() => {
            loading.close()
          })  
        }else {
          this.$message.error('请完善表单信息')
        }
      })
    }
  },
  mounted() {
    this.amountInfo = this.$storage.session.get('shopAmount')
  }
}
</script>
<style scoped lang="less">

</style>