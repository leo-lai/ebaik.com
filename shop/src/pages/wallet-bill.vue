<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-bg-white">
      <x-table class="l-fs-xs">
        <thead>
          <tr>
            <th class="l-padding-lr-s" width="80">时间</th>
            <th class="l-padding-lr-s">商品信息</th>
            <th class="l-padding-lr-s">支付类型</th>
            <th class="l-padding-lr-s">实付</th>
          </tr>
        </thead>
        <tbody class="l-fs-xs">
          <tr v-for="item in list.data" :key="item.orderId">
            <td class="l-word">{{item.createTime}}</td>
            <td>
              <p v-for="goods in item.goodsList" :key="goods.id">
                <span class="l-margin-r-s">{{goods.name}}</span>
                <span class="l-margin-r-s">{{goods.price}}</span>
                <span> x{{goods.number}}</span>
              </p>
            </td>
            <td>{{paymentType[item.paymentType]}}</td>
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
      paymentType: {
        '-1': '其它支付',
        '0': '微信支付',
        '1': '支付宝支付',
        '2': '储值支付',
        '3': '扫呗微信',
        '4': '扫呗支付宝',
        '24': '礼券支付',
        '25': '储存金支付',
      },
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
          item.goodsList = item.goodsNamePriceNumber.split(',').map(goodsInfo => {
            goodsInfo = goodsInfo.split(':')
            let goods = {}
            goods.name = goodsInfo[0]
            goods.price = goodsInfo[1]
            goods.number = goodsInfo[2]
            goods.id = goodsInfo[3]
            return goods
          })
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
.l-word{ line-height: 1.2; word-break: break-word; white-space: inherit; }
</style>

