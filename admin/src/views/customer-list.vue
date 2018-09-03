<template>
  <el-container class="l-h100">
    <el-header class="l-padding-0 l-bg-white" height="auto">
      <div class="l-filter-top">
        <el-form class="l-filter-form" inline ref="listFilter" :model="list.filter" @submit.native.prevent @keyup.enter.native="search">
          <el-form-item label="姓名" prop="">
            <el-input v-model="dialogInfo.data.keyword1" placeholder=""></el-input>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="primary" @click.native="getList()">查询</el-button>
          </el-form-item>
          <el-form-item class="l-margin-l">
            <el-button type="warning" @click.native="dialogInfo.visible = true">新增客户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-header>
    <el-main>
      <el-table border stripe element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" :data="list.data" v-loading="list.loading">
        <el-table-column align="center" prop="prop1" label="客户姓名" width="120"></el-table-column>
        <el-table-column align="center" prop="prop2" label="累计成交" width="120"></el-table-column>
        <el-table-column align="center" prop="prop3" label="来源" width="120"></el-table-column>
        <el-table-column align="center" prop="prop4" label="地区" width="120"></el-table-column>
        <el-table-column align="center" prop="prop5" label="电话" width="120"></el-table-column>
        <el-table-column align="center" prop="prop6" label="收货地址" width="200"></el-table-column>
        <el-table-column align="center" prop="prop7" label="主要业务人员" width="200"></el-table-column>
        <el-table-column align="center" prop="prop8" label="其他重要备注" width="200"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.native="dialogInfo.visible = true">修改</el-button>
            <el-button size="mini" @click.native="dialogInfo.visible = true">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增客户 -->
      <el-dialog center :visible.sync="dialogInfo.visible" width="500px">
        <el-form class="l-form-1" inline ref="infoForm" label-width="100px" :model="dialogInfo.data">
          <el-form-item label="客户姓名" prop="">
            <el-input v-model="dialogInfo.data.field1" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="累计成交" prop="">
            <el-input v-model="dialogInfo.data.field2" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="来源" prop="">
            <el-input v-model="dialogInfo.data.field3" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="">
            <el-input style="width: 80px; margin: 0 5px;" v-model="dialogInfo.data.field4" placeholder=""></el-input>省
            <el-input style="width: 80px; margin: 0 5px;" v-model="dialogInfo.data.field5" placeholder=""></el-input>市
            <el-input style="width: 80px; margin: 0 5px;" v-model="dialogInfo.data.field6" placeholder=""></el-input>区
          </el-form-item>
          <el-form-item label="电话" prop="">
            <el-input v-model="dialogInfo.data.field7" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="">
            <el-input style="width: 300px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field18"> </el-input>
          </el-form-item>
          <el-form-item label="主要业务人员" prop="">
            <el-input style="width: 300px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field19"> </el-input>
          </el-form-item>
          <el-form-item label="其他重要备注" prop="">
            <el-input style="width: 300px;" type="textarea" :rows="2" placeholder="" v-model="dialogInfo.data.field10"> </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="primary" @click.native="dialogInfo.visible = false">确认</el-button>
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
  name: 'audit-list',
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
      
      this.list.data = [
        {
          prop1: '2018/03/03',
          prop2: '阿里巴巴',
          prop3: '陈伟',
          prop4: '20180808',
          prop5: '标准',
          prop6: '售卖',
          prop7: '返单',
          prop8: 'WM10台；WM05台',
          prop9: '完成'
        },
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},
      ]
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="less">

</style>