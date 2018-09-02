<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li class="_active2">账号列表</li>
          <li @click="$router.push('/department/list')">部门岗位管理</li>
        </ul>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item>
            <el-input style="width: 320px;" placeholder="请输入姓名/手机号码/电子邮箱" v-model="list.filter.keywords">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="success" @click.native="showDialogInfo('new')">新增账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column prop="id" align="center" label="ID" width="80"></el-table-column>
        <el-table-column prop="userName" align="center" label="姓名" width="110"></el-table-column>
        <el-table-column prop="phone" align="center" label="手机号码" width="110"></el-table-column>
        <el-table-column prop="email" align="center" label="电子邮箱" width="200"></el-table-column>
        <el-table-column prop="name" align="center" label="部门-岗位" width="150">
          <template slot-scope="scope">
            {{scope.row.department}} - {{scope.row.position}}
          </template>
        </el-table-column>
        <el-table-column prop="role" align="center" label="账号角色" width="150"></el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="stateName" align="center" label="状态" width="110">
          <template slot-scope="scope">
            <span :class="scope.row.state === 1 ? 'l-txt-ok' : 'l-txt-error'">{{scope.row.stateName}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <span v-show="scope.row.doing" class="l-txt-gray"><i class="el-icon-loading"></i>&nbsp;操作中</span>
            <span v-show="!scope.row.doing">
              <el-button white size="mini" @click.native="showDialogInfo('edit', scope.row)">编辑</el-button>
              <el-button v-if="scope.row.state === 1" type="danger" size="mini" @click.native="enable(0, scope.row)">禁用</el-button>
              <el-button v-else type="success" size="mini" @click.native="enable(1, scope.row)">启用</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增/编辑账号 -->
      <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialogInfo" :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="600px">
        <el-form class="l-dialog-form" ref="infoForm" label-width="90px" inline :model="dialogInfo.data" :rules="dialogInfo.rules" @submit.native.prevent @keyup.enter.native="submitDialogInfo">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="dialogInfo.data.userName" :maxlength="50" ></el-input>
          </el-form-item>
          <br>
          <el-form-item label="手机号码" prop="phone" >
            <el-input v-model="dialogInfo.data.phone" placeholder="请输入手机号码" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item><span class="l-margin-l l-txt-gray l-fs-xs">作为系统登录账号</span></el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="dialogInfo.data.email" placeholder="请输入常用电子邮箱" :maxlength="100"></el-input>
          </el-form-item>
          <el-form-item><span class="l-margin-l l-txt-gray l-fs-xs">用于找回密码、接收文件或重要通知等</span></el-form-item>
          <el-form-item label="部门" prop="departmentId">
            <el-select v-model="dialogInfo.data.departmentId" placeholder="请选择部门" @change="departChange">
              <el-option v-for="item in department.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item><a class="l-txt-link l-margin-l" @click="department.visible = true">新增部门</a></el-form-item>
          <el-form-item label="岗位" prop="positionId">
            <el-select v-model="dialogInfo.data.positionId" placeholder="请选择岗位">
              <el-option v-for="item in position.list" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item><a class="l-txt-link l-margin-l" @click="position.visible = true">新增岗位</a></el-form-item>
          <el-form-item label="账号角色" prop="roleCode">
            <el-select v-model="dialogInfo.data.roleCode" multiple placeholder="请选择角色">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="l-margin-r-m">
          <el-button white @click="closeDialogInfo()">取消</el-button>
          <el-button type="primary" :loading="dialogInfo.loading" @click="submitDialogInfo">确定提交</el-button>
        </span>
      </el-dialog>
      <!-- 新增部门 -->
      <dialog-department append :visible.sync="department.visible" @change="departFormChange"></dialog-department>
      <!-- 新增岗位 -->
      <dialog-position append :visible.sync="position.visible" :parent-id="dialogInfo.data.departmentId" @change="positionFormChange"></dialog-position>
    </el-main>
    <el-footer class="l-flex-vhc" height="40px">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="sizeChange" @current-change="pageChange" :page-sizes="$api.pageSizes" :page-size="list.rows" :current-page="list.page" :total="list.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
import dialogDepartment from './dialog-department'
import dialogPosition from './dialog-position'
export default {
  name: 'user-list',
  components: {
    dialogDepartment,
    dialogPosition
  },
  data() {
    return {
      list: {
        filter: {
					keywords: '',
					state: ''
				},
				rules: {
					keywords: [],
					state: []
				},
				loading: false,
				page: 1,
				rows: 10,
				total: 1,
				data: []
      },
      
      roleList: [],
      department: {
        visible: false,
        list: [],
      },
      position: {
        visible: false,
        list: []
      },
      dialogInfo: {
				type: 'new',
				title: '新增账号',
				visible: false,
				loading: false,
				rules: {
          userName: [
						{ required: true, message: '必选项', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '必填项', trigger: 'blur' },
						{ pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          email: [
						{ required: true, message: '必选项', trigger: 'blur' }
					],
					departmentId: [
						{ required: true, message: '必选项', trigger: 'change' }
          ],
          positionId: [
						{ required: true, message: '必选项', trigger: 'change' }
					],
					roleCode: [
						{ required: true, message: '必填项', trigger: 'blur' }
					]
        },
				data: {
					id: null,
					userName: '',
					phone: '',
          email: '',
          departmentId: '',
          department: '',
          positionId: '', 
          position: '',
					roleCode: [],
				}
			}
    }
  },
  methods: {
    sizeChange(size = 50) {
			this.getList(1, size)
		},
		pageChange(page = 1) {
			this.getList(page)
		},
    getList(page = 1, rows) {
      rows = rows || this.list.rows
			this.list.loading = true
			this.$api.user.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list, data, { page, rows })
        this.list.data = data.list.map(item => {
          item.doing = false
          return item
        })
			}).finally(() => {
				this.list.loading = false
			})
    },
    getDepartmentList() { // 部门列表
      return this.$api.department.getDownList().then(({data}) => {
        this.department.list = data
        return data
      })
    },
    departChange(departId) {
      this.dialogInfo.data.positionId = ''
      return this.getPositionList(departId)
    },
    departFormChange() {
      this.getDepartmentList()
    },
    positionFormChange() {
      if(this.dialogInfo.data.departmentId) {
        this.getPositionList(this.dialogInfo.data.departmentId)
      }
    },
    getPositionList(departId) { // 岗位列表
      return this.$api.department.getPositionList(departId).then(({data}) => {
        this.position.list = data
        return data
      })
    },
    getRoleList() { // 角色列表
      return this.$api.role.getDownList().then(({data}) => {
        this.roleList = data
        return data
      })
    },
    refreshList() {
			this.getList(this.list.page)
		},
    search() {
			this.getList()
		},
		clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList()
		},
    showDialogInfo(type = 'new', row) {
      this.dialogInfo.type = type
      
      // 获取部门列表
      let pmDepart = this.getDepartmentList()
      // 角色列表
      let pmRole = this.getRoleList()

      let promises = [pmDepart, pmRole]

			if(type === 'edit') {
				this.dialogInfo.title = '编辑账号信息'

				let pmUserInfo = this.$api.user.getInfo(row.id).then(({data}) => {
          data.roleCode = data.roleCode ? data.roleCode.split(',') : []
          return this.departChange(data.departmentId).then(() => {
            this.$utils.copyObj(this.dialogInfo.data, data)
          })
        })
        
        promises.push(pmUserInfo)
			} else {
				this.dialogInfo.title = '新增账号'
      }
      
      const loading = this.$loading()
      Promise.all(promises).then(() => {
        this.dialogInfo.visible = true	
      }).finally(() => {
        loading.close()
      })
		},
		closeDialogInfo(done) {
			if(done) {
				done()
			}else{
				this.dialogInfo.visible = false	
			}
			this.resetDialogInfo()
		},
		resetDialogInfo() {
			this.$refs.infoForm && this.$refs.infoForm.resetFields()
			this.$utils.copyObj(this.dialogInfo.data, '')
		},
		submitDialogInfo() {
			this.$refs.infoForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.dialogInfo.data)
          formData.roleCode = formData.roleCode.join(',')
          formData.department = this.department.list.filter(item => item.id === formData.departmentId)[0].name
          formData.position = this.position.list.filter(item => item.id === formData.positionId)[0].name

          let promise = this.dialogInfo.type == 'edit' ? this.$api.user.edit(formData) : this.$api.user.add(formData)
          
          this.dialogInfo.loading = true
          promise.then(() => {
            this.$message.success((this.dialogInfo.type === 'edit' ? '修改' : '新增') + '账号成功')
            this.closeDialogInfo()
            this.refreshList()
          }).finally(() => {
            this.dialogInfo.loading = false
          })  
        }else {
          this.$message.error('请完善表单信息')
        }
      })
    },
    enable(isEnable = 1, row) {
      this.$confirm('是否确定'+ (isEnable === 1 ? '启用' : '禁用') +'该账号？').then(() => {
        row.doing = true
        this.$api.user.enable(row.id, isEnable).then(() => {
          row.state = isEnable
          this.$message.success('操作成功')
        }).finally(() => {
          row.doing = false
        })
      })
		}
  },
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="less">

</style>