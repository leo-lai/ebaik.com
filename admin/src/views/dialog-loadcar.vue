<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <div class="l-scroll" style="max-height: 400px;">
      <el-form class="l-margin-l l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
        <el-form-item prop="image" style="width: 515px;">
          <label slot="label">装车照片<span class="l-fs-xs l-txt-gray">（车辆装上板车后的合照）</span></label>
          <uploader :file-list.sync="images.image" :sample-pic="sample.image"></uploader>
        </el-form-item>
        <el-form-item label="《4S店提车交接表》" prop="handover">
          <uploader :file-list.sync="images.handover" :sample-pic="sample.handover"></uploader>
        </el-form-item>
        <el-form-item label="《4S店购车全款收据》" prop="voucher">
          <uploader :file-list.sync="images.voucher" :sample-pic="sample.voucher"></uploader>
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
  name: 'dialog-loadcar',
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
        image: ['http://qiniu.hsbro.cn/%E9%AA%8C%E8%BD%A6%E7%85%A7%E7%89%87.jpg'],
        handover: ['http://qiniu.hsbro.cn/%E8%A3%85%E8%BD%A6-%E6%8F%90%E8%BD%A6%E4%BA%A4%E6%8E%A5%E5%8D%95.jpg'],
        voucher: ['http://qiniu.hsbro.cn/%E8%A3%85%E8%BD%A6-%E8%B4%AD%E8%BD%A6%E5%85%A8%E6%AC%BE%E6%94%B6%E6%8D%AE.jpg'],
      },
      images: {
        image: [],
        handover: [],
        voucher: [],
      },
      dialog: {
        title: '录入装车信息',
        visible: false,
        loading: false,
        rules: {
          image: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          handover: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          voucher: [
            { required: true, message: '必选项', trigger: 'blur' }
          ]
        },
        data: {
          orderId: null,
          image: '',
          handover: '',
          voucher: '',
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
          this.$api.order.loadcar(formData).then(({data}) => {
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