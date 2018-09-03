<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li @click="$router.push('/company/order')">订单</li>
          <li @click="$router.push('/company/customer')">客户档案</li>
          <li class="_active2" @click="$router.push('/company/user')">账号配置</li>
        </ul>

        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item class="l-margin-l">
            <el-button type="primary" @click.native="dialogBumen.visible = true">新建部门</el-button>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="warning" @click.native="dialogUser.visible = true">新建账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table border stripe element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column align="center" prop="prop1" label="部门" width="150"></el-table-column>
        <el-table-column align="center" prop="prop2" label="职务" width="150"></el-table-column>
        <el-table-column align="center" prop="prop3" label="姓名" width="150"></el-table-column>
        <el-table-column align="center" prop="prop4" label="账号" width="150"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini">设置</el-button>
            <el-button size="mini">冻结</el-button>
            <el-button size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增部门 -->
      <el-dialog :visible.sync="dialogBumen.visible" center width="400px">
        <el-form inline>
          <el-form-item label="部门名称" prop="">
            <el-input v-model="dialogBumen.data.field1" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click.native="dialogBumen.visible = false">确认</el-button>
        </span>
      </el-dialog>

      <!-- 新增账号 -->
      <el-dialog center :visible.sync="dialogUser.visible" width="750px">
        <el-form class="l-form-1" inline ref="infoForm" label-width="100px" :model="dialogUser.data">
          <el-form-item label="选择部门" prop="">
            <el-select v-model="dialogUser.data.field1" placeholder="请选择">
              <el-option label="部门1" value="1"></el-option>
              <el-option label="部门2" value="2"></el-option>
              <el-option label="部门3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="职务" prop="">
            <el-input v-model="dialogUser.data.field2" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="">
            <el-input v-model="dialogUser.data.field3" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="">
            <el-input v-model="dialogUser.data.field4" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="">
            <el-input v-model="dialogUser.data.field5" placeholder=""></el-input>
          </el-form-item>
          <br>
          <el-form-item label="权限设置" prop="">
            <el-tree ref="tree" default-expand-all :data="permissions" node-key="id" :props="defaultProps" show-checkbox></el-tree>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click.native="submit()">确认</el-button>
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
export default {
  name: 'company-customer',
  components: {
  },
  data() {
    return {
      permissions: [
        {
          id: 1,
          label: '我的订单',
        }, 
        {
          id: 2,
          label: '客户档案',
        }, 
        {
          id: 3,
          label: '公司监管',
          children: [
            {
              id: 5,
              label: '订单'
            },
            {
              id: 6,
              label: '本部门'
            },
            {
              id: 7,
              label: '全部'
            },
            {
              id: 8,
              label: '客户档案'
            },
            {
              id: 9,
              label: '本部门'
            },
            {
              id: 10,
              label: '全部'
            },
            {
              id: 11,
              label: '账号设置'
            },
          ]
        }, 
        {
          id: 4,
          label: '订单核心内容',
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      list: {
        filter: {
					date: '',
					keyword1: '',
					keyword2: '',
				},
				loading: false,
				page: 1,
				rows: 10,
				total: 1,
				data: []
      },
      dialogBumen: { // 部门
        visible: false,
        data: {

        }
      },
      dialogUser: {
        visible: false,
        data: {

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
      // rows = rows || this.list.rows
			// this.list.loading = true
			// this.$api.order.getList(this.list.filter, page, rows).then(({data}) => {
      //   this.$utils.copyObj(this.list, data, { page, rows })
      //   this.list.data = data.list
			// }).finally(() => {
			// 	this.list.loading = false
      // })
      
      this.list.data = [
        {prop1: '业务一部', prop2: '经理', prop3: '李博洋', prop4: 'liboyang'},
        {prop1: '业务二部', prop2: '商务', prop3: '徐俊', prop4: 'xujun'},
      ]
    },
    submit() {
      // 已选择权限列表
      this.$alert('已选择权限：' + this.$refs.tree.getCheckedKeys())

      this.dialogUser.visible = false
    }

  },
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="less">

</style>