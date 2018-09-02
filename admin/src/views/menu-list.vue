<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li class="_active2">菜单列表</li>
          <li @click="$router.push('/role/list')">角色列表</li>
        </ul>
      </div>
    </el-header>
    <el-main>
      <div class="l-menu-box l-bg-white">
        <div class="l-flex-hc _tit">
          <b>菜单名称</b>
          <div class="l-rest l-txt-center">
            <span v-if="loading" class="l-txt-warn"><i class="el-icon-loading"></i>&nbsp;加载中...</span>
          </div>
          <el-button :disabled="loading" type="text" @click="showDialogInfo('new')">添加一级菜单</el-button>
        </div>
        <el-tree v-if="menuList" ref="menuTree" class="l-menu-list" highlight-current node-key="id" :default-expanded-keys="[1]" :data="menuList" :props="menuProps" :render-content="renderContent">
        </el-tree>

        <!-- 新增/编辑菜单 -->
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :before-close="closeDialogInfo" :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="480px">
          <el-form ref="infoForm" label-width="90px" style="width: 432px;" :model="dialogInfo.data" :rules="dialogInfo.rules" @keyup.enter.native="submitDialogInfo">
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="dialogInfo.data.name" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="菜单URL" prop="src">
              <el-input v-model="dialogInfo.data.src" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="菜单Code" prop="code">
              <el-input v-model="dialogInfo.data.code" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="dialogInfo.data.remark" :maxlength="50"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="l-margin-r-m">
            <el-button @click="closeDialogInfo()">取消</el-button>
            <el-button type="primary" :loading="dialogInfo.loading" @click="submitDialogInfo">确定提交</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>
<script>
function preventClick(e) {
	e.stopPropagation()
	return false
}
export default {
  name: 'menu-list',
  data() {
    return {
      loading: false,
      menuList: [],
      menuProps: {
        children: 'children',
        label: 'name'
      },
			dialogInfo: {
				type: 'new',
				title: '新增菜单',
				visible: false,
				loading: false,
				rules: {
					name: [
						{ required: true, message: '必填项', trigger: 'blur' }
          ]
				},
				data: {
					parentId: 0,
					id: '',
					name: '',
          src: '',
          code: '',
					remark: ''
				}
			}
    }
  },
  methods: {
    getList() {
      this.loading = true
      this.$api.menu.getList().then(({data}) => {
        this.menuList = data || []
      }).finally(() => {
        this.loading = false
      })
    },
		showDialogInfo(type = 'new', data) { // 新增/修改菜单
			this.dialogInfo.type = type
			if(type === 'edit') {
        this.dialogInfo.title = '修改菜单'
        this.dialogInfo.currentNodeData = data
				this.$utils.copyObj(this.dialogInfo.data, data)
			} else {
				this.dialogInfo.title = '新增菜单'
				this.resetDialogInfo()
				this.dialogInfo.data.parentId = data ? data.id : 0
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
		submitDialogInfo() { // 提交菜单信息
			this.$refs.infoForm.validate(valid => {
        if (valid) {
					this.dialogInfo.loading = true
					let promise = this.dialogInfo.type == 'edit' ? this.$api.menu.edit(this.dialogInfo.data) : this.$api.menu.add(this.dialogInfo.data)
          promise.then(({data}, message) => {
						if(this.dialogInfo.type == 'edit') {
              message = '修改菜单成功'
              this.$utils.copyObj(this.dialogInfo.currentNodeData, this.dialogInfo.data)
							this.$refs.menuTree.setCurrentKey(this.dialogInfo.data.id)
						}else {
              message = '新增菜单成功'
							let newChild = Object.assign({}, this.dialogInfo.data, { id: data.id, children: [] })
              this.menuList.unshift(newChild)
							this.$refs.menuTree.setCurrentKey(newChild.id)
						}
						this.$message.success(message)
						this.closeDialogInfo()
						
          }).finally(()=>{
            this.dialogInfo.loading = false
          })  
        }
      })
		},
		deleteInfo(node, data) { // 删除菜单
			this.$confirm('是否确定删除该菜单？').then(() => {
				this.$api.menu.del(data.id).then(() => {
          this.$message.success('删除菜单成功')
          
					const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(menu => menu.id === data.id)
          children.splice(index, 1)
				})
      })
		},
    renderContent(h, { node, data, store }) {
      return (
        <div style="flex:1;" class="l-flex-hc">
          <span class="l-rest">
            <span id={data.id}>{data.name}</span>
          </span>
          <span class="l-padding-r" onClick={ preventClick }>
            <el-button class="l-txt-error" type="text" onClick={ () => this.deleteInfo(node, data) }>删除</el-button>
            <el-button class="l-txt-link" type="text" onClick={ () => this.showDialogInfo('edit', data) }>编辑</el-button>
            <el-button class="l-txt-link" type="text" onClick={ () => this.showDialogInfo('new', data) }>添加子菜单</el-button>
          </span>
        </div>
      )
    }
  },
  mounted() {
		this.getList()
  }
}
</script>
<style scoped lang="less">
.l-menu-box{
	width: 800px;
	._tit{ padding: 0.25rem 0.75rem; }
}
</style>