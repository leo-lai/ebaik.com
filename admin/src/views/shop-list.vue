<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li v-for="item in tabList" :key="item.label" :class="{'_active1': tabActive === item.value}" @click="tabClick(item.value)">{{item.label}}</li>
        </ul>
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" :rules="list.rules" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="注册时间" prop="dateRange" style="width:420px;">
            <el-date-picker type="daterange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="list.dateRange" :picker-options="$config.dateOptions" @change="dateChange"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 320px;" placeholder="请输入门店名称/手机号码" v-model="list.filter.keywords">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="success">导出报表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="name" label="门店名称" width="280"></el-table-column>
        <el-table-column prop="corporation" align="center" label="法人姓名" width="120"></el-table-column>
        <el-table-column prop="account" align="center" label="注册账号" width="120"></el-table-column>
        <el-table-column prop="createTime" align="center" label="注册时间" width="170"></el-table-column>
        <el-table-column prop="loanCount" align="center" label="垫资单数量" width="120" fixed="right"></el-table-column>
        <el-table-column prop="loanTotal" align="center" label="待还总额(元)" width="120" fixed="right"></el-table-column>
        <el-table-column prop="status" align="center" label="框架协议" width="120" fixed="right">
          <template slot-scope="scope">
            <span class="l-txt-ok" v-if="scope.row.status === 10">{{scope.row.statusName}}</span>
            <span class="l-txt-warn" v-else-if="scope.row.status === 0"><i class="el-icon-warning"></i> 待签署</span>
            <span class="l-txt-gray" v-else-if="scope.row.status > 0">等待乙方签署</span>
            <span class="l-txt-gray" v-else>未签署</span>
          </template>
        </el-table-column>
        <el-table-column min-width="1"></el-table-column>
        <el-table-column prop="stateName" align="center" label="门店状态" width="120" fixed="right">
          <template slot-scope="scope">
            <span :class="getState(scope.row.state).css">
              <i :class="getState(scope.row.state).icon"></i>
              {{getState(scope.row.state).label}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button white size="mini" @click.native="viewInfo(scope.row.id)">查看详情</el-button>
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
  name: 'shop-list',
  data() {
    return {
      exceling: false,
      tabActive: '',
      stateList: [
        { label: '全部', value: '',  css: ''},
        { label: '待审核', value: 0,  css: 'l-txt-warn', icon: 'el-icon-warning'},
        { label: '待CA认证', hidden: true, value: 1, css: 'l-txt-error' },
        { label: '已认证', value: 2, css: 'l-txt-ok', icon: 'el-icon-success' },
        { label: '认证失败', value: -1, css: 'l-txt-gray' },
      ],
      list: {
        dateRange: [],
        filter: {
					startDate: '',
					endDate: '',
					keywords: '',
          state: '',
          status: '',
				},
				rules: {
					startDate: [],
					endDate: [],
					keywords: [],
					state: [],
					status: [],
				},
				loading: false,
				page: 1,
				rows: 10,
				total: 1,
				data: []
      },
      departmentList: [],
      positionList: [],
      roleList: [],
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
					id: '',
					userName: '',
					phone: '',
          email: '',
          departmentId: '',
					positionId: '', 
					roleCode: '',
				}
			}
    }
  },
  computed: {
    tabList() {
      return this.stateList.filter(item => !item.hidden)
    }
  },
  methods: {
    tabClick(value = '') {
      this.tabActive = value
      this.list.filter.state = value
      this.list.filter.status = ''
      this.getList(1)
    },
    getState(state) {
      return this.stateList.filter(item => item.value === state)[0] || {}
    },
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
			this.$api.shop.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list, data, { page, rows })
        this.list.data = data.list
			}).finally(() => {
				this.list.loading = false
			})
    },
    search() {
			this.getList()
		},
		clear() {
			this.$refs.listFilter && this.$refs.listFilter.resetFields()
			this.getList()
    },
    viewInfo(id = '') {
      this.$router.push('/shop/info?id=' + id)
    }
  },
  mounted() {
    let tabActive = Number(this.$route.query.tab)
    this.tabClick(isNaN(tabActive) ? '' : tabActive)
  }
}
</script>
<style scoped lang="less">

</style>