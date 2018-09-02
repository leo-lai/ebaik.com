<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <div class="l-scroll" style="max-height: 400px;">
      <el-form class="l-margin-l l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
        <el-form-item label="物流公司名称" prop="name">
          <el-input v-model="dialog.data.name" :maxlength="50" placeholder="如中汽物流"></el-input>
        </el-form-item>
        <el-form-item label="物流板车车牌号" prop="plateNumber">
          <el-input v-model="dialog.data.plateNumber" :maxlength="50" placeholder="如粤B88888"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="提车人姓名" prop="pickUpName">
          <el-input v-model="dialog.data.pickUpName" :maxlength="50" placeholder="请输入物流提车人姓名" @blur="dialog.data.checkName = dialog.data.pickUpName"></el-input>
        </el-form-item>
        <el-form-item label="提车人身份证号" prop="idCard">
          <el-input v-model="dialog.data.idCard" :maxlength="18" placeholder="请输入提车人身份证号" @blur="dialog.data.checkIdCard = dialog.data.idCard"></el-input>
        </el-form-item>
        <el-form-item label="验车人姓名" prop="checkName">
          <el-input v-model="dialog.data.checkName" :maxlength="50" placeholder="请输入验车人姓名"></el-input>
        </el-form-item>
        <el-form-item label="验车人身份证号" prop="checkIdCard">
          <el-input v-model="dialog.data.checkIdCard" :maxlength="18" placeholder="请输入验车人身份证号"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark" style="width: 515px;">
          <el-input v-model="dialog.data.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="物流合同" prop="contract" style="width: 515px;">
          <uploader :file-list.sync="images.contract" :sample-pic="sample.contract"></uploader>
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
  name: 'dialog-wuliu',
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
    return {
      sample: {
        contract: ['http://pck87tzij.bkt.clouddn.com/%E8%B4%AD%E8%BD%A6%E5%90%88%E5%90%8C.jpg'],
      },
      images: {
        contract: [],
      },
      dialog: {
        title: '录入物流信息',
        visible: false,
        loading: false,
        rules: {
          name: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          plateNumber: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          pickUpName: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          checkName: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          checkIdCard: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
        },
        data: {
          orderId: null,
          name: '',
          plateNumber: '',
          pickUpName: '',
          idCard: '',
          checkName: '',
          checkIdCard: '',
          contract: '',
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
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.dialog.data)
          formData.contract = this.images.contract.join(',')
          this.dialog.loading = true
          this.$api.order.uploadWuliu(formData).then(({data}) => {
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