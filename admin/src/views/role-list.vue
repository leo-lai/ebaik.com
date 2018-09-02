<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li @click="$router.push('/menu/list')">菜单列表</li>
          <li class="_active2">角色列表</li>
        </ul>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item>
            <el-input style="width: 320px;" placeholder="请输入角色名称" v-model="list.filter.keywords">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="success" @click.native="showDialogInfo('new')">新增角色</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column label="角色名称" prop="name" width="150px"></el-table-column>
        <el-table-column label="备注" prop="remark" min-width="150px"></el-table-column>
        <el-table-column label="操作" align="center" width="200px" fixed="right">
          <template slot-scope="scope">
            <span v-show="scope.row.doing" class="l-txt-gray"><i class="el-icon-loading"></i>&nbsp;操作中</span>
            <span v-show="!scope.row.doing">
              <el-button class="l-txt-link" type="text" size="small" @click="showDialogInfo('edit', scope.row)">编辑</el-button>
              <el-button class="l-txt-warn" type="text" size="small" @click="showDialogMenu(scope.row)">配置权限</el-button>
              <el-button class="l-txt-error" type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增/编辑角色 -->
      <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialogInfo" :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="480px">
        <el-form ref="infoForm" label-width="90px" style="width: 432px;" :model="dialogInfo.data" :rules="dialogInfo.rules" @keyup.enter.native="submitDialogInfo">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="dialogInfo.data.roleName" placeholder="请填写" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="角色Code" prop="roleCode">
            <el-input v-model="dialogInfo.data.roleCode" placeholder="请填写" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="备注信息" prop="remark">
            <el-input type="textarea" v-model="dialogInfo.data.remark" :maxlength="500"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="l-margin-r-m">
          <el-button @click="closeDialogInfo()">取消</el-button>
          <el-button type="primary" :loading="dialogInfo.loading" @click="submitDialogInfo">确定提交</el-button>
        </span>
      </el-dialog>

      <!-- 配置权限菜单 -->
      <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialogMenu" :title="dialogMenu.title" :visible.sync="dialogMenu.visible" width="600px">
        <div class="l-scroll" style="max-height: 400px; margin: -20px 0;">
          <el-tree ref="menuTree" show-checkbox  default-expand-all highlight-current node-key="id" :data="dialogMenu.menuList" :props="dialogMenu.props">
          </el-tree>	
        </div>
        <span slot="footer" class="l-margin-r-m">
          <el-button @click="closeDialogMenu()">取消</el-button>
          <el-button type="primary" :loading="dialogMenu.loading" @click="submitDialogMenu">确定提交</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer class="l-flex-vhc" height="40px">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="sizeChange" @current-change="pageChange" :page-sizes="$api.pageSizes" :page-size="list.rows" :current-page="list.page" :total="list.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
function getCheckedKeys(nodeArray = []) {
	let keys = []
	nodeArray.forEach(node => {
		if(node.checked || node.indeterminate) {
			keys.push(node.data.id)
		}

		if(node.childNodes && node.childNodes.length > 0) {
			keys = keys.concat(getCheckedKeys(node.childNodes))
		}
	})
	return keys
}

function getLeafMenuIds(nodeArray = []) {
	let menuIds = []
	nodeArray && nodeArray.forEach(node => {
		if(node.children && node.children.length > 0) {
			menuIds = menuIds.concat(getLeafMenuIds(node.children))
		} else {
			menuIds.push(node.id)
		}
	})
	return menuIds
}
export default {
	name: 'role-list',
	data() {
		return {
			list: {
				filter: {
					keywords: '',
				},
				rules: {
					keywords: [],
				},
				loading: false,
				page: 1,
				rows: 10,
				total: 0,
				data: []
			},
			dialogInfo: {
				type: 'new',
				title: '新增角色',
				visible: false,
				loading: false,
				rules: {
					roleName: [
						{ required: true, message: '必填项', trigger: 'blur' }
          ],
          roleCode: [
						{ required: true, message: '必填项', trigger: 'blur' }
					],
					remark: []
				},
				data: {
					id: null,
					roleName: '',
					roleCode: '',
					remark: ''
				}
			},
			dialogMenu: {
				title: '配置权限',
				visible: false,
				loading: false,
				props: {
          children: 'children',
          label: 'name'
        },
				menuList: [],
				checkedList: [],
				data: {
					roleId: '',
					lists: ''
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
			this.$api.role.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list, data, { page, rows })
        this.list.data = data.list.map(item => {
          item.roleName = item.name
          item.roleCode = item.code
          item.doing = false
          return item
        })
			}).finally(() => {
				this.list.loading = false
			})
		},
		refreshList() {
			this.getList(this.list.page)
		},
		search() {
			this.getList()
		},
		showDialogInfo(type = 'new', row) { // 新增/修改角色
			this.dialogInfo.type = type
			if(type === 'edit') {
				this.dialogInfo.title = '修改角色'
				this.$utils.copyObj(this.dialogInfo.data, row)
			} else {
				this.dialogInfo.title = '新增角色'
				this.resetDialogInfo()
			}
			this.dialogInfo.visible = true	
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
		submitDialogInfo() { // 提交角色信息
			this.$refs.infoForm.validate(valid => {
        if (valid) {
					this.dialogInfo.loading = true
					let promise = this.dialogInfo.type === 'edit' ? this.$api.role.edit(this.dialogInfo.data) : this.$api.role.add(this.dialogInfo.data)
          promise.then(() => {
            this.$message.success((this.dialogInfo.type === 'edit' ? '修改' : '新增') + '角色成功')
            this.closeDialogInfo()
            this.refreshList()
          }).finally(()=>{
            this.dialogInfo.loading = false
          })  
        }
      })
		},
		getMenuList(roleId) {
			return new Promise((resolve, reject) => {
				if(!roleId) {
					if(this.dialogMenu.menuList.length === 0) {
						this.$api.role.getMenuList().then(({data}) => {
							this.dialogMenu.menuList = data || []
							resolve(this.dialogMenu.menuList)
						}, reject)
					}else {
						resolve(this.dialogMenu.menuList)
					}
				} else {
					this.$api.role.getMenuList(roleId).then(({data}) => {
						resolve(getLeafMenuIds(data))
					}, reject)
				}
			})
		},
		showDialogMenu(row) {
      const loading = this.$loading()
			this.dialogMenu.data.roleId = row.id
			this.getMenuList(row.id).then(data => {
				loading.close()
				this.dialogMenu.visible = true
				setTimeout(() => {
					this.dialogMenu.title = '配置权限：' + row.roleName
					this.$refs.menuTree.setCheckedKeys(data)	
				}, 50)
			}).catch(() => {
				loading.close()
			})
		},
		closeDialogMenu(done) {
			if(done) {
				done()
			} else {
				this.dialogMenu.visible = false	
			}
			this.$refs.menuTree.setCheckedKeys([])
		},
		submitDialogMenu() {
			this.dialogMenu.data.lists = getCheckedKeys(this.$refs.menuTree.root.childNodes).join(',')
			if(!this.dialogMenu.data.lists) {
				this.$message.error('请配置权限')
				return
			}
			this.dialogMenu.loading = true
			this.$api.role.setMenuList(this.dialogMenu.data).then(() => {
				this.closeDialogMenu()
        this.$message.success('配置权限成功')
        this.refreshList()
			}).finally(() => {
				this.dialogMenu.loading = false
			})
		},
		deleteInfo(row) { // 删除角色
			this.$confirm('是否确定删除该角色？').then(() => {
        row.doing = true
				this.$api.role.del(row.id).then(() => {
					this.$message.success('删除角色成功')
					this.refreshList()
				}).finally(() => {
					row.doing = false
				})
      })
		},
	},
	mounted() {
		this.getMenuList()
		this.getList()
	}
}
</script>