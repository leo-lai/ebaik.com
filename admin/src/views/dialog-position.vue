<template>
  <el-dialog :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialog" :title="dialog.title" :visible.sync="dialog.visible" width="400px">
    <el-form class="l-dialog-form l-margin-r" ref="infoForm" label-width="90px" :model="dialog.data" :rules="dialog.rules" @submit.native.prevent @keyup.enter.native="submitDialog">
      <el-form-item label="所属部门" prop="parentId">
        <el-select style="width: 100%;" v-model="dialog.data.parentId" placeholder="请选择部门">
          <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位名称" prop="name">
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
  name: 'dialog-position',
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
    parentId: [String, Number],
    append: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      departmentList: [],
      dialog: {
        title: '新增岗位',
        visible: false,
        loading: false,
        rules: {
          parentId: [
            { required: true, message: '必选项', trigger: 'blur' }
          ],
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
    getDepartmentList() { // 部门列表
      return this.$api.department.getDownList().then(({data}) => {
        this.departmentList = data
        return Promise.resolve(data)
      })
    },
    showDialog() {
      this.getDepartmentList().finally(() => {
        if(this.formType === 'edit') {
          this.dialog.title = '修改岗位'
          this.$utils.copyObj(this.dialog.data, this.formData)
        }else{
          this.dialog.title = '新增岗位'
          this.$utils.copyObj(this.dialog.data, '')
          this.dialog.data.parentId = this.parentId
        }
        this.dialog.visible = true
      })
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
            this.$message({
							type: 'success',
							message: this.dialog.title + '成功'
            })
            this.$emit('change', data)
            this.closeDialog()
          }).finally(() => {
            this.dialog.loading = false
          })  
        }else {
          this.$message({
						type: 'error',
						message: '请完善表单信息'
					})
        }
      })
    }
  }
}
</script>
<style scoped lang="less">

</style>