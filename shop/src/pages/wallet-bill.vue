<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-bg-white">
      <x-table>
        <thead>
          <tr>
            <th class="l-padding-lr-s" width="140">时间</th>
            <th class="l-padding-lr-s">商品</th>
            <th class="l-padding-lr-s">价格</th>
            <th class="l-padding-lr-s">实付</th>
          </tr>
        </thead>
        <tbody class="l-fs-xs">
          <tr v-for="item in list.data" :key="item.orderId">
            <td class="l-fs-xs">{{item.createTime}}</td>
            <td>{{item.goodsInfo[0]}}</td>
            <td><i class="l-rmb">{{item.goodsInfo[1]}}</i></td>
            <td><i class="l-rmb">{{item.actualPayment}}</i></td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <div class="l-fixed-bottom">
      <div class="_placeholder"></div>
      <div class="_inner" style="background: #f7f8fa;">
        <van-pagination mode="simple" @change="getList" v-model="list.pager.page" :total-items="list.pager.total" :items-per-page="list.pager.rows" />
      </div>
    </div>
  </view-box>
</template>

<script>

import 'vant/lib/pagination/style/less'
import Pagination from 'vant/lib/pagination'
import { XTable } from 'vux'
export default {
  name: 'wallet-bill',
  components: {
    XTable,
    'van-pagination': Pagination
  },
  data () {
    return {
      list: {
        filter: {
          beginTime: '',
          endTime: '',
          deliverStatus: '',
          logisticsId: '',
          logisticsName: '',
        },
        loading: false,
        slted: [],
        data: [],
        pager: {
          page: 1,
          rows: 50,
          total: 0,
        }
      },
    }
  },
  methods: {
    getList(pageNum = this.list.pager.page, pageSize = this.list.pager.rows) {
      let formData = Object.assign({
        organId: this.organId,
        id: this.userInfo.id,
        infoid: this.userInfo.infoid,
        pageNum, pageSize,
      }, this.list.filter)

      this.$api.loading.show()
      this.list.loading = true
      this.$ajax.json('/sys-statementcenter/orderCenter/findCustomerOrder', formData).then(({ data }) => {
        this.list.data = data.list.map(item => {
          item.goodsInfo = item.goodsNamePriceNumber.split(':')
          return item
        })
        this.list.pager.total = data.total
      }).finally(() => {
        this.list.loading = false
        this.$api.loading.hide()
      })
    },
  },
  mounted() {
    this.organId = this.$storage.session.get('organId')
    this.$store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo = userInfo
      this.getList()
    })
  }
}
</script>

<style lang="less">

</style>

