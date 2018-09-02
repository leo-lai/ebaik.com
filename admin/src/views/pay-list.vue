<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <div></div>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="操作日期" prop="dateRange" style="width:420px;">
            <el-date-picker type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="list.filter.dateRange" :picker-options="$config.dateOptions" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="success">导出报表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>

    <el-main>
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
        <el-table-column prop="transactionId" align="center" label="交易号" width="200"></el-table-column>
        <el-table-column prop="payTypeName" label="来源/去向" width="300"></el-table-column>
        <el-table-column prop="amount" align="center" label="收入/支出(元)" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1" class="l-txt-ok">{{scope.row.amount}}</span>
            <span v-else class="l-txt-error">-{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="操作时间" width="150"></el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <!-- <el-table-column align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button white size="mini">查看凭证</el-button>
          </template>
        </el-table-column> -->
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
  name: 'pay-list',
  components: {
  },
  data() {
    return {
      list: {
        filter: {
					dateRange: [],
					startDate: '',
					endDate: '',
					keywords: '',
				},
				rules: {
					dateRange: [],
					startDate: [],
					endDate: [],
					keywords: [],
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
    dateChange(value) {
			if(value && value.length > 0) {
				this.list.filter.startDate = value[0]
				this.list.filter.endDate = value[1] || ''
			}else{
        this.list.filter.startDate = ''
				this.list.filter.endDate = ''
      }
      this.search()	
		},
    sizeChange(size = 50) {
			this.getList(1, size)
		},
		pageChange(page = 1) {
			this.getList(page)
		},
    getList(page = 1, rows) {
      rows = rows || this.list.rows
			this.list.loading = true
			this.$api.finance.getPayList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list, data, { page, rows })
        this.list.data = data.list.map(item => {
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
		clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList()
		}
  },
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="less">

</style>