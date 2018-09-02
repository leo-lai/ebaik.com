<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="600px">
    <div class="l-scroll" style="max-height: 400px;">
      <el-form class="l-margin-l l-form-1" inline label-position="top" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
        <el-form-item prop="image" style="width: 515px;">
          <label slot="label">
            验车照片<span class="l-fs-xs l-txt-gray">（左前方45度、右后方45度、中控外观照片、发动机、车顶随车物品、仪表盘(含公里)、内饰、铭牌）</span>
          </label>
          <uploader :file-list.sync="images.image" :sample-pic="sample.image"></uploader>
        </el-form-item>
        <el-form-item label="购车合同" prop="contract">
          <uploader :file-list.sync="images.contract" :sample-pic="sample.contract"></uploader>
        </el-form-item>
        <el-form-item label="运输乘用车运输单" prop="transportList">
          <uploader :file-list.sync="images.transportList" :sample-pic="sample.transportList"></uploader>
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
  name: 'dialog-checkcar',
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
        contract: ['http://pck87tzij.bkt.clouddn.com/%E8%B4%AD%E8%BD%A6%E5%90%88%E5%90%8C.jpg'],
        transportList: ['http://qiniu.hsbro.cn/%E9%AA%8C%E8%BD%A6-%E8%BF%90%E8%BE%93%E5%8D%95.jpg'],
      },
      images: {
        image: [],
        contract: [],
        transportList: [],
      },
      dialog: {
        title: '录入验车信息',
        visible: false,
        loading: false,
        rules: {
          image: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          contract: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
          transportList: [
            { required: true, message: '必选项', trigger: 'blur' }
          ]
        },
        data: {
          orderId: null,
          image: '',
          contract: '',
          transportList: '',
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