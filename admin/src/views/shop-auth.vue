<template>
  <el-container class="l-h100">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="l-tab l-margin-t">
        <ul class="l-tab-tit">
          <li @click="$router.replace('/me')">账号基本信息</li>
          <li class="_active0">门店认证资料</li>
        </ul>
      </div>

      <el-form class="l-bg-white l-zoom l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="form.data" :rules="form.rules">
        <div class="l-panel-item l-margin-t">
          <div class="_hd l-fs-xl"><b>汽贸店基本信息</b></div>
          <div class="_bd">
            <div class="l-margin">
              <el-form-item label="公司全称" prop="name">
                <el-input v-model="form.data.name" placeholder="请输入工商注册公司名称" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" prop="address" style="width: 515px;">
                <el-input v-model="form.data.address" placeholder="请输入工商注册公司地址" :maxlength="100"></el-input>
              </el-form-item><br>
              <el-form-item label="工商注册号/统一信用代码" prop="licenseCode">
                <el-input v-model="form.data.licenseCode" placeholder="如：91440113660820218D" :maxlength="18"></el-input>
              </el-form-item>
              <el-form-item label="对公银行账号" prop="account">
                <el-input v-model="form.data.account" placeholder="请输入公司对公银行账号" :maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="开户支行" prop="bankBranch">
                <el-input v-model="form.data.bankBranch" placeholder="请输入对公账号银行支行" :maxlength="100"></el-input>
              </el-form-item><br>
              <el-form-item label="营业执照" prop="license">
                <uploader :file-list.sync="images.license" :sample-pic="sample.license" :limit="1"></uploader>
              </el-form-item>
              <el-form-item label="场地租赁合同或产权证明" prop="securities">
                <uploader :file-list.sync="images.securities" :sample-pic="sample.securities"></uploader>
              </el-form-item>
              <el-form-item label="公司照片（门店、展厅、办公室，财务室等）" prop="image">
                <uploader :file-list.sync="images.image" :sample-pic="sample.image"></uploader>
              </el-form-item><br>
            </div>
          </div>
        </div>

        <div class="l-panel-item">
          <div class="_hd l-fs-xl">
            <b>法定代表人/大股东信息</b>
            <el-radio-group style="margin-left: 112px;" v-model="form.data.isShareHolder">
              <el-radio border :label="0">法人是大股东</el-radio>
              <el-radio border :label="1">法人不是大股东</el-radio>
            </el-radio-group>
          </div>
          <div class="_bd l-flex-h">
            <div class="l-margin">
              <el-form-item label="法人姓名" prop="corporation">
                <el-input v-model="form.data.corporation" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="法人手机号码" prop="phone">
                <el-input v-model="form.data.phone" placeholder="请输入" :maxlength="11"></el-input>
              </el-form-item><br>
              <el-form-item label="法人身份证号" prop="idCard">
                <el-input v-model="form.data.idCard" placeholder="请输入" :maxlength="18"></el-input>
              </el-form-item>
              <el-form-item label="法人电子邮箱" prop="email">
                <el-input v-model="form.data.email" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item><br>
              <el-form-item label="法人身份证正反面" prop="idCardOn">
                <uploader class="l-margin-r" :file-list.sync="images.idCardOn" :sample-pic="sample.idCardOn" :limit="1" tip="身份证正面"></uploader>
                <uploader :file-list.sync="images.idCardOff" :sample-pic="sample.idCardOff" :limit="1" tip="身份证反面"></uploader>
              </el-form-item>
            </div>
            <div v-show="form.data.isShareHolder" class="l-margin">
              <el-form-item label="大股东姓名" prop="shareHolder">
                <el-input v-model="form.data.shareHolder" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="大股东手机号码" prop="shareHolderPhone">
                <el-input v-model="form.data.shareHolderPhone" placeholder="请输入" :maxlength="11"></el-input>
              </el-form-item><br>
              <el-form-item label="大股东身份证号" prop="shareHolderIdCard">
                <el-input v-model="form.data.shareHolderIdCard" placeholder="请输入" :maxlength="18"></el-input>
              </el-form-item>
              <el-form-item label="大股东电子邮箱" prop="shareHolderEmail">
                <el-input v-model="form.data.shareHolderEmail" placeholder="请输入" :maxlength="100"></el-input>
              </el-form-item><br>
              <el-form-item label="大股东身份证正反面" prop="shareHolderIdCardOn">
                <uploader class="l-margin-r" :file-list.sync="images.shareHolderIdCardOn" :sample-pic="sample.shareHolderIdCardOn" :limit="1" tip="身份证正面"></uploader>
                <uploader :file-list.sync="images.shareHolderIdCardOff" :sample-pic="sample.shareHolderIdCardOff" :limit="1" tip="身份证反面"></uploader>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="l-panel-item">
          <div class="_hd l-fs-xl">
            <b>设置合同签署人</b>
            <el-radio-group style="margin-left: 112px;" v-model="form.data.hasAgent">
              <el-radio border :label="0">法人签署</el-radio>
              <el-radio border :label="1">代理人签署</el-radio>
            </el-radio-group>
            <span v-show="form.data.hasAgent" class="l-margin-l l-fs-s l-txt-error">* 授权代理人接收并签署电子合同</span>
          </div>
          <div class="_bd l-flex-h">
            <div class="l-margin">
              <div v-show="form.data.hasAgent === 1">
                <el-form-item label="签署人姓名" prop="signName">
                  <el-input v-model="form.data.signName" placeholder="请输入" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="签署人手机号码" prop="signPhone">
                  <el-input v-model="form.data.signPhone" placeholder="请输入" :maxlength="11"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="签署人身份证号" prop="signIdCard">
                  <el-input v-model="form.data.signIdCard" placeholder="请输入" :maxlength="18"></el-input>
                </el-form-item>
                <el-form-item label="签署人电子邮箱" prop="signEmail">
                  <el-input v-model="form.data.signEmail" placeholder="请输入" :maxlength="100"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="电子合同CA申请书" prop="certificate">
                <uploader class="l-margin-r" :file-list.sync="images.certificate" :sample-pic="sample.certificate" :limit="1">
                  <p>示例图</p>
                  <p><a class="l-txt-link" href="http://qiniu4.xfnauto.com/%E4%BC%81%E4%B8%9A%E6%95%B0%E5%AD%97%E8%AF%81%E4%B9%A6%E7%94%B3%E8%AF%B7%E8%A1%A8.docx">下载模板</a></p>
                </uploader>
              </el-form-item>
            </div>
            <div class="l-margin" v-show="form.data.hasAgent === 1">
              <el-form-item label="签署人身份证正反面" prop="signIdCardOn">
                <uploader class="l-margin-r" :file-list.sync="images.signIdCardOn" :sample-pic="sample.signIdCardOn" :limit="1" tip="身份证正面"></uploader>
                <uploader :file-list.sync="images.signIdCardOff" :sample-pic="sample.signIdCardOff" :limit="1" tip="身份证反面"></uploader>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="l-txt-center" style="width: 980px; max-width: 100%;">
          <p class="l-txt-error">* 请如实填写以上资料，否则将认证失败</p>
          <p class="l-margin-t"><el-button type="success" @click.native="submit()">提交认证资料</el-button></p>
          <br>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import Uploader from '@/components/uploader'
export default {
  name: 'shop-auth',
  components: { Uploader },
  data() {
    var validate1 = (rule, value, callback) => {
      if (this.form.data.isShareHolder === 1 && !value) {
        callback(new Error('必填项'))
      } else {
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
      if (this.form.data.hasAgent === 1 && !value) {
        callback(new Error('必填项'))
      } else {
        callback()
      }
    }
    return {
      sample: {
        license: ['http://pck87tzij.bkt.clouddn.com/%E8%90%A5%E4%B8%9A%E6%89%A7%E7%85%A7.jpg'],
        securities: ['http://pck87tzij.bkt.clouddn.com/%E6%88%BF%E4%BA%A7%E7%A7%9F%E8%B5%81%E8%AF%81%E6%98%8E.jpg'],
        image: ['http://pck87tzij.bkt.clouddn.com/%E9%97%A8%E5%BA%97%E7%85%A7%E7%89%87.jpg'],
        idCardOn: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg'],
        idCardOff: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%8D%E9%9D%A2.jpg'],
        shareHolderIdCardOn: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg'],
        shareHolderIdCardOff: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%8D%E9%9D%A2.jpg'],
        signIdCardOn: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg'],
        signIdCardOff: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%8D%E9%9D%A2.jpg'],
        certificate: ['http://pck87tzij.bkt.clouddn.com/%E4%BC%81%E4%B8%9A%E8%AE%A4%E8%AF%81%E7%94%B3%E8%AF%B7%E4%B9%A6.jpg'],
      },
      images: {
        license: [],
        securities: [],
        image: [],
        idCardOn: [],
        idCardOff: [],
        shareHolderIdCardOn: [],
        shareHolderIdCardOff: [],
        signIdCardOn: [],
        signIdCardOff: [],
        certificate: [],
      },
      form: {
        rules: {
          name: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          bankBranch: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          licenseCode: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          license: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          securities: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          image: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          corporation: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCardOn: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          idCardOff: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          shareHolder: [
            { validator: validate1, trigger: 'blur' }
          ],
          shareHolderPhone: [
            { validator: validate1, trigger: 'blur' }
          ],
          shareHolderEmail: [
            { validator: validate1, trigger: 'blur' }
          ],
          shareHolderIdCard: [
            { validator: validate1, trigger: 'blur' }
          ],
          shareHolderIdCardOn: [
            { validator: validate1, trigger: 'change' }
          ],
          shareHolderIdCardOff: [
            { validator: validate1, trigger: 'change' }
          ],
          signName: [
            { validator: validate2, trigger: 'blur' }
          ],
          signPhone: [
            { validator: validate2, trigger: 'blur' }
          ],
          signEmail: [
            { validator: validate2, trigger: 'blur' }
          ],
          signIdCard: [
            { validator: validate2, trigger: 'blur' }
          ],
          signIdCardOn: [
            { validator: validate2, trigger: 'change' }
          ],
          signIdCardOff: [
            { validator: validate2, trigger: 'change' }
          ],
          certificate: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
        },
        data: {
          // 工商注册信息
          name: '',
          address: '',
          bankId: null,
          account: '',
          bankBranch: '',
          licenseCode: '',
          license: '',
          securities: '',
          image: '',
          // 法人
          corporation: '',
          phone: '',
          email: '',
          idCard: '',
          idCardOn: '',
          idCardOff: '',
          // 大股东
          isShareHolder: 0,
          shareHolderId: null,
          shareHolder: null,
          shareHolderPhone: null,
          shareHolderEmail: null,
          shareHolderIdCard: null,
          shareHolderIdCardOn: null,
          shareHolderIdCardOff: null,
          // 签署人
          hasAgent: 0,
          signName: '',
          signPhone: '',
          signEmail: '',
          signIdCard: '',
          signIdCardOn: '',
          signIdCardOff: '',
          // 企业认证申请书
          certificate: ''
        }
      }
    }
  },
  methods: {
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
    getInfo() {
      this.loading = true
      this.$store.dispatch('getShopInfo').then(shopInfo => {
        if(shopInfo) {
          shopInfo.hasAgent = Number(!(shopInfo.signName === shopInfo.corporation && shopInfo.signPhone === shopInfo.phone && shopInfo.signIdCard === shopInfo.idCard))
          this.$utils.copyObj(this.form.data, shopInfo)
        
          // 对公银行账户信息
          this.form.data.bankId = shopInfo.bankList[0].id
          this.form.data.account = shopInfo.bankList[0].account
          this.form.data.bankBranch = shopInfo.bankList[0].bankBranch

          // 大股东信息
          if(shopInfo.isShareHolder) {
            this.form.data.shareHolderId = shopInfo.shareHolder.id
            this.form.data.shareHolder = shopInfo.shareHolder.name
            this.form.data.shareHolderPhone = shopInfo.shareHolder.phone
            this.form.data.shareHolderEmail = shopInfo.shareHolder.email
            this.form.data.shareHolderIdCard = shopInfo.shareHolder.idCard
            this.form.data.shareHolderIdCardOn = shopInfo.shareHolder.idCardOn
            this.form.data.shareHolderIdCardOff = shopInfo.shareHolder.idCardOff
          }

          // 签署人信息
          if(!shopInfo.hasAgent) {
            this.$utils.copyObj(this.form.data, {
              signName: '',
              signPhone: '',
              signEmail: '',
              signIdCard: '',
              signIdCardOn: '',
              signIdCardOff: '',
            })
          }
          this.setImages(this.form.data)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    submit() {
      let formData = this.getImages(this.form.data)
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          if(formData.hasAgent === '') {
            this.$message.error('请设置合同签署人')
            return
          }else if(formData.hasAgent === 0) { // 法人是签署人
            formData.signName = formData.corporation
            formData.signPhone = formData.phone
            formData.signEmail = formData.email
            formData.signIdCard = formData.idCard
            formData.signIdCardOn = formData.idCardOn
            formData.signIdCardOff = formData.idCardOff
          }

          let promise = this.$route.query.id ? this.$api.shop.reauth(formData) : this.$api.shop.auth(formData)

					let loading =  this.$loading()
          promise.then(() => {
            this.$message({
							type: 'success',
              message: '认证资料提交成功',
              duration: 1000,
              onClose: () => {
                this.$router.replace('/shop/auth/info')
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
    this.$route.query.id && this.getInfo()
  }
}
</script>
<style scoped lang="less">

</style>