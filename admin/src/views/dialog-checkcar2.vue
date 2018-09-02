<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <div class="l-scroll" style="max-height: 400px;">
      <el-form class="l-margin-l l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
        <el-form-item label="验车人姓名" prop="userName">
          <el-input v-model="dialog.data.userName" placeholder="请输入" :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="验车人手机号码" prop="phone">
          <el-input v-model="dialog.data.phone" placeholder="请输入" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验车人身份证号" prop="idCard">
          <el-input v-model="dialog.data.idCard" placeholder="请输入" :maxlength="18"></el-input>
        </el-form-item>
        <el-form-item label="验车时间" prop="settleDate">
          <el-date-picker style="width: 100%;" :picker-options="dateOptions" v-model="dialog.data.settleDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证正反面" prop="idCardOn">
          <uploader class="l-margin-r" :file-list.sync="images.idCardOn" :sample-pic="sample.idCardOn" :limit="1" tip="身份证正面"></uploader>
          <uploader :file-list.sync="images.idCardOff" :sample-pic="sample.idCardOff" :limit="1" tip="身份证反面"></uploader>
        </el-form-item>
        <el-form-item prop="applyLetter">
          <label slot="label">
            <span>《验车申请书》</span>
            <span class="l-fs-xs l-txt-gray l-margin-l-s">请下载《验车申请书》，签字盖章并把原件邮寄至花生兄弟总部</span>
          </label>
          <uploader :file-list.sync="images.applyLetter" :sample-pic="sample.applyLetter" :limit="1">
            <p>示例图</p>
            <p><a class="l-txt-link" href="http://qiniu.hsbro.cn/B7%E9%AA%8C%E8%BD%A6%E7%94%B3%E8%AF%B7%E5%8D%95%EF%BC%88V1.0%EF%BC%8920180817.docx">下载模板</a></p>
          </uploader>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark" style="width: 515px;">
          <el-input v-model="dialog.data.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="l-margin-r-m">
      <el-button white @click="closeDialog()">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submitDialog">{{ dialog.loading ? '提交中...' : '确定提交'}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Uploader from '@/components/uploader'
export default {
  name: 'dialog-checkcar2',
  components: {
    Uploader
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formType: {
      type: String,
      default: 'new'
    },
    formData: Object,
    append: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let that = this
    return {
      dateOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now() || time.getTime() > that.$utils.str2date(that.formData.deadline)
        }
      },
      sample: {
        idCardOn: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%AD%A3%E9%9D%A2.jpg'],
        idCardOff: ['http://pck87tzij.bkt.clouddn.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E5%8F%8D%E9%9D%A2.jpg'],
        applyLetter: ['http://pck87tzij.bkt.clouddn.com/%E4%BC%81%E4%B8%9A%E8%AE%A4%E8%AF%81%E7%94%B3%E8%AF%B7%E4%B9%A6.jpg'],
      },
      images: {
        idCardOn: [],
        idCardOff: [],
        applyLetter: [],
      },
      dialog: {
        title: '验车申请',
        visible: false,
        loading: false,
        rules: {
          userName: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          settleDate: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCardOn: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          idCardOff: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
          applyLetter: [
            { required: true, message: '必选项', trigger: 'change' }
          ],
        },
        data: {
          orderId: null,
          userName: '',
          phone: '',
          idCard: '',
          settleDate: '',
          idCardOn: '',
          idCardOff: '',
          applyLetter: '',
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
          this.$api.order.checkcar(formData).then(({data}) => {
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

</style>