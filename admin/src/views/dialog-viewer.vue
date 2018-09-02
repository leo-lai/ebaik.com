<template>
  <el-dialog :append-to-body="append" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <table v-if="formType === 5" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">物流公司名称</td>
        <td>{{formData.name}}</td>
        <td width="100" class="_tit">物流板车车牌号</td>
        <td>{{formData.plateNumber}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">提车人姓名</td>
        <td>{{formData.pickUpName}}</td>
        <td width="100" class="_tit">提车人身份证号</td>
        <td>{{formData.idCard}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">验车人姓名</td>
        <td>{{formData.checkName}}</td>
        <td width="100" class="_tit">验车人身份证号</td>
        <td>{{formData.checkIdCard}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">物流合同</td>
        <td colspan="3">
          <image-previewer :file-list="formData.contract ? formData.contract.split(',') : []"></image-previewer>
        </td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 1" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">装车照片</td>
        <td><image-previewer :file-list="formData.image"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">4S店提车交接表</td>
        <td><image-previewer :file-list="formData.handover"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">4S店购车全款收据</td>
        <td><image-previewer :file-list="formData.voucher"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 3" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">入库照片</td>
        <td><image-previewer :file-list="formData.image"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">入库指令单</td>
        <td><image-previewer :file-list="formData.stockSheet"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">入库地址</td>
        <td colspan="3">{{formData.stockAddress}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    <table v-else-if="formType === 7" class="l-table-02" style="width: 100%;">
      <tr>
        <td width="100" class="_tit">提车人姓名</td>
        <td>{{formData.userName}}</td>
        <td width="100" class="_tit">提车人手机号码</td>
        <td>{{formData.phone}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">提车人身份证号</td>
        <td>{{formData.idCard}}</td>
        <td width="100" class="_tit">提车时间</td>
        <td>{{formData.settleDate}}</td>
      </tr>
      <tr>
        <td width="100" class="_tit">身份证正反面</td>
        <td><image-previewer :file-list="[formData.idCardOn, formData.idCardOff]"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">提车申请书</td>
        <td colspan="3"><image-previewer :file-list="formData.applyLetter"></image-previewer></td>
      </tr>
      <tr>
        <td width="100" class="_tit">备注信息</td>
        <td colspan="3">{{formData.remark}}</td>
      </tr>
    </table>
    
    <!-- <span slot="footer" class="l-margin-r-m"></span> -->
  </el-dialog>
</template>
<script>
import Uploader from '@/components/uploader'
import ImagePreviewer from '@/components/image-previewer'

export default {
  name: 'dialog-viewer',
  components: {
    Uploader, ImagePreviewer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formType: [Number, String],
    formData: Object,
    append: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sample: {
        image: ['http://qiniu.hsbro.cn/%E9%AA%8C%E8%BD%A6%E7%85%A7%E7%89%87.jpg'],
        stockSheet: ['http://qiniu.hsbro.cn/%E5%85%A5%E5%BA%93-%E5%85%A5%E5%BA%93%E6%8C%87%E4%BB%A4%E5%8D%95.jpg'],
      },
      images: {
        image: [],
        stockSheet: [],
      },
      dialog: {
        title: '查看详情',
        visible: false,
        loading: false,
        rules: {
          image: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          stockSheet: [
            { required: true, message: '必选项', trigger: 'blur' }
          ]
        },
        data: {
          orderId: null,
          image: '',
          stockSheet: '',
          stockAddress: '',
          remark: '',
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if(val) {
          this.showDialog()
        }
      }
    }
  },
  methods: {
    getImages(formData = {}) {
      let images = Object.assign({}, this.images)
      Object.keys(images).forEach(key => {
        images[key] = images[key].join(',')
      })
      return this.$utils.copyObj(formData, images)
    },
    showDialog() {
      switch(this.formType) {
        case 5:
          this.dialog.title = '查看物流信息'
          break
        case 1:
          this.dialog.title = '查看装车信息'
          break
        case 3:
          this.dialog.title = '查看入库信息'
          break
        case 7:
          this.dialog.title = '查看结算申请信息'
          break
        default:
          this.dialog.title = '查看详情'
      }
      this.$utils.copyObj(this.dialog.data, this.formData)
      this.dialog.visible = true
    },
    closeDialog(done) {
      if(done) {
				done()
			}else{
				this.dialog.visible = false	
      }
      this.$emit('update:visible', this.dialog.visible)
    },
    submitDialog() {
      let formData = this.getImages(this.dialog.data)
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.dialog.loading = true
          this.$api.order.instock(formData).then(({data}) => {
            this.$message.success(this.dialog.title + '成功')
            this.$emit('change', data)
            this.closeDialog()
          }).finally(() => {
            this.dialog.loading = false
          })  
        }else {
          this.$message.error('请完善表单信息')
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.l-table-02 td{vertical-align: top;}
</style>