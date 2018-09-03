<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li @click="$router.push('/company/order')">订单</li>
          <li class="_active2" @click="$router.push('/company/customer')">客户档案</li>
          <li @click="$router.push('/company/user')">账号配置</li>
        </ul>

        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="业务员">
            <el-select v-model="list.filter.keyword1" placeholder="请选择">
              <el-option label="业务员1" value="1"></el-option>
              <el-option label="业务员2" value="2"></el-option>
              <el-option label="业务员3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户">
            <el-input placeholder="" v-model="list.filter.keyword2"></el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="primary" @click.native="getList()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table border stripe element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column align="center" prop="" label="客户姓名" width="120"></el-table-column>
        <el-table-column align="center" prop="" label="累计成交" width="120"></el-table-column>
        <el-table-column align="center" prop="" label="来源" width="120"></el-table-column>
        <el-table-column align="center" prop="" label="地区" width="120"></el-table-column>
        <el-table-column align="center" prop="" label="电话" width="120"></el-table-column>
        <el-table-column align="center" prop="" label="收货地址" width="200"></el-table-column>
        <el-table-column align="center" prop="" label="主要业务人员" width="200"></el-table-column>
        <el-table-column align="center" prop="" label="其他重要备注" width="200"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.native="dialogInfo.visible = true">修改</el-button>
            <el-button size="mini" @click.native="dialogInfo.visible = true">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      
      this.list.data = [{},{},{},{},{},{},{},{},{},{},{},{},{}]
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="less">

</style>