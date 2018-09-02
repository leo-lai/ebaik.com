<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <ul class="l-tab-tit">
          <li v-for="item in tabList" :key="item.label" :class="{_active1: tabActive === item.value}" @click="tabClick(item.value)">{{item.label}}</li>
        </ul>
      </div>
    </el-header>
    <el-main>
      <div class="l-margin-t">
        <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="事项明细">
            <template slot-scope="scope">
              <div @click="viewInfo(scope.row)">
                <el-badge v-if="scope.row.isRead === 0" is-dot style="margin: 0 5px 0 -10px;"></el-badge>{{scope.row.title}}
                <!-- <a class="l-txt-link l-margin-l" @click="viewInfo(scope.row)">查看</a> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="时间" width="180" align="center"> </el-table-column>
          <el-table-column width="45"></el-table-column>
        </el-table>
      </div>

    </el-main>
    <el-footer class="l-txt-center" height="40px">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="sizeChange" @current-change="pageChange" :page-sizes="$api.pageSizes" :page-size="list.rows" :current-page="list.page" :total="list.total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  name: 'notice',
  data() {
    return {
      tabActive: '',
      tabList: [
        { label: '未读', value: 0},
        { label: '已读', value: 1},
        { label: '全部', value: ''},
      ],
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
      }
    }
  },
  methods: {
    tabClick(value = 0) {
      this.tabActive = value
      this.list.filter.state = value
      this.getList(1)
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
			this.$api.notice.getList(this.list.filter, page, rows).then(({data}) => {
        this.$utils.copyObj(this.list, data, { page, rows })
        this.list.data = data.list
			}).finally(() => {
				this.list.loading = false
			})
    },
    viewInfo(row) {
      this.$api.notice.setRead(row.id).then(() => {
        row.isRead = 1
      })
    }
  },
  mounted() {
    this.tabClick()
  }
}
</script>
<style scoped lang="less">

</style>