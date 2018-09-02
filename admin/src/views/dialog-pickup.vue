<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <div class="l-scroll" style="max-height: 400px; margin-top: -20px;">
      <p class="l-txt-gray l-fs-xs" style="margin: 0 15px 15px 15px;">客户须知：<br>4S店收款放车后，您需要在10天内把车辆票证寄给花生兄弟总部，否则将会产生一定的票证滞纳费用。票证滞纳费一直计算至花生兄弟收齐车辆票证或客户提车。</p>
      <el-form class="l-margin-l l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
        <el-form-item label="请选择票证处理方案" prop="scheme" style="width: 515px;">
          <el-radio-group v-model="dialog.data.scheme">
            <p class="l-margin-t-m"><el-radio :label="1">每滞纳3天收取本金5%滞纳金</el-radio></p>
            <p class="l-margin-t-m"><el-radio :label="2">每滞纳1天收取300元滞纳金</el-radio></p>
          </el-radio-group>
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
export default {
  name: 'dialog-pickup',
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
      dialog: {
        title: '允许物流提车并放款',
        visible: false,
        loading: false,
        rules: {
          scheme: [
            { required: true, message: '必选项', trigger: 'blur' }
          ]
        },
        data: {
          orderId: null,
          scheme: 1
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
      let formData = Object.assign({}, this.dialog.data)
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          this.dialog.loading = true
          this.$api.order.allowPickUp(formData).then(({data}) => {
            this.$message.success('操作成功')
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