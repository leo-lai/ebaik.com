<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item>
            <el-input placeholder="客户名称" v-model="list.filter.keyword1"></el-input>
          </el-form-item>
          <el-form-item label="订单日期">
            <el-date-picker v-model="list.filter.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="合同编号" v-model="list.filter.keyword2"></el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="primary" @click.native="getList()">查询</el-button>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="warning" @click.native="dialogInfo.visible = true">新增订单</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table class="l-table-01" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="" label="业务员" width="120"></el-table-column>
        <el-table-column prop="" label="生成日期" width="120"></el-table-column>
        <el-table-column prop="" label="订单日期" width="120"></el-table-column>
        <el-table-column prop="" label="交货日期" width="120"></el-table-column>
        <el-table-column prop="" label="来源" width="120"></el-table-column>
        <el-table-column prop="" label="客户名称" width="120"></el-table-column>
        <el-table-column prop="" label="合同编号" width="120"></el-table-column>
        <el-table-column prop="" label="订单性质" width="120"></el-table-column>
        <el-table-column prop="" label="销售类型" width="120"></el-table-column>
        <el-table-column prop="" label="返单性质" width="120"></el-table-column>
        <el-table-column prop="" label="订单内容" width="120"></el-table-column>
        <el-table-column prop="" label="合同总金额" width="120"></el-table-column>
        <el-table-column prop="" label="付款方式" width="120"></el-table-column>
        <el-table-column prop="" label="服务费" width="120"></el-table-column>
        <el-table-column prop="" label="其他重要条款" width="120"></el-table-column>
        <el-table-column prop="" label="订单备注" width="120"></el-table-column>
        <el-table-column align="center" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-button white size="mini" @click.native="dialogInfo.visible = true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增/查看订单 -->
      <el-dialog center :visible.sync="dialogInfo.visible" width="750px">
        <el-form class="l-form-1" inline ref="infoForm" label-width="100px" :model="dialogInfo.data">
          <el-form-item label="生成日期" prop="">
            <el-date-picker v-model="dialogInfo.data.field1" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <br>
          <el-form-item label="订单日期" prop="">
            <el-date-picker v-model="dialogInfo.data.field2" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="交货日期" prop="">
            <el-date-picker v-model="dialogInfo.data.field3" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="来源" prop="">
            <el-input v-model="dialogInfo.data.field4" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="客户名称" prop="">
            <el-select v-model="dialogInfo.data.field5" placeholder="请选择">
              <el-option label="客户名称1" value="1"></el-option>
              <el-option label="客户名称2" value="2"></el-option>
              <el-option label="客户名称3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同编号" prop="">
            <el-input v-model="dialogInfo.data.field6" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="订单性质" prop="">
            <el-radio-group v-model="dialogInfo.data.field7" size="medium">
              <el-radio label="标准"></el-radio>
              <el-radio label="定制"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="返单性质" prop="">
            <el-radio-group v-model="dialogInfo.data.field8" size="medium">
              <el-radio label="首次"></el-radio>
              <el-radio label="返单"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="销售类型" prop="">
            <el-radio-group v-model="dialogInfo.data.field9" size="medium">
              <el-radio label="售卖"></el-radio>
              <el-radio label="租赁"></el-radio>
              <el-radio label="分期"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单内容" prop="">
            <el-input style="width: 540px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field10"> </el-input>
          </el-form-item>
          <el-form-item label="合同金额" prop="">
            <el-input v-model="dialogInfo.data.field11" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="">
            <el-input v-model="dialogInfo.data.field12" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="其他费用" prop="">
            <el-input v-model="dialogInfo.data.field13" placeholder=""></el-input>
          </el-form-item>
          <br>
          <el-form-item label="合同原件" prop="">
          </el-form-item>
          <el-form-item label="其他重要条款" prop="">
            <el-input style="width: 540px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field15"> </el-input>
          </el-form-item>
          <el-form-item label="软件需求" prop="">
            <el-input style="width: 540px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field16"> </el-input>
          </el-form-item>
          <el-form-item label="硬件需求" prop="">
            <el-input style="width: 540px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field17"> </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="l-margin-r-m">
          <!-- <el-button white @click="dialogInfo.visible = false">取消</el-button> -->
          <el-button type="primary">提交确定/审核</el-button>
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
  name: 'order-list',
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
      },
      dialogInfo: {
				visible: false,
				loading: false,
				rules: {
          
        },
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