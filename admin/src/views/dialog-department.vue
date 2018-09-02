<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="400px">
    <el-form class="l-margin-r" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="dialog.data.name" :maxlength="50" ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dialog.data.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="l-margin-r-m">
      <el-button white @click="closeDialog()">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submitDialog">{{ dialog.loading ? '提交中...' : '确定提交'}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'dialog-department',
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
        title: '新增部门',
        visible: false,
        loading: false,
        rules: {
          name: [
            { required: true, message: '必选项', trigger: 'blur' }
          ]
        },
        data: {
          parentId: null,
          id: null,
          name: '',
          remark: ''
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
      if(this.formType === 'edit') {
        this.dialog.title = '修改部门'
        this.$utils.copyObj(this.dialog.data, this.formData)
      }else{
        this.dialog.title = '新增部门'
        this.$utils.copyObj(this.dialog.data, '')
      }
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

          let promise = this.formType == 'edit' ? this.$api.department.edit(formData) : this.$api.department.add(formData)
          this.dialog.loading = true
          promise.then(({data}) => {
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