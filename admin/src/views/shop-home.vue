<template>
  <div class="l-padding">
    <div class="l-panel-item ">
      <div class="_hd1 l-fs-xl">
        <b class="l-margin-r-x2">待结算垫资本金：<i class="l-rmb l-txt-theme">{{info.loanAmount}}</i></b>
        <b>待结算利息：<i class="l-rmb l-txt-theme">{{info.loanInterest}}</i></b>
      </div>
      <div class="_bd">
        <ul class="l-order-count">
          <li class="_item" @click="$router.replace('/order/list?tab=0')">
            <b :class="{'l-txt-theme': loanInfo.unSigned > 0}">{{loanInfo.unSigned}}</b>
            <p>
              <img src="../assets/images/icon-009.jpg" alt="">
              <span>待签垫资服务合同</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=2')">
            <b :class="{'l-txt-theme': loanInfo.unPayDeposit > 0}">{{loanInfo.unPayDeposit}}</b>
            <p>
              <img src="../assets/images/icon-010.jpg" alt="">
              <span>待付保证金</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=3')">
            <b :class="{'l-txt-theme': loanInfo.logisticsPickUp > 0}">{{loanInfo.logisticsPickUp}}</b>
            <p>
              <img src="../assets/images/icon-011.jpg" alt="">
              <span>待允许物流提车</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=6')">
            <b :class="{'l-txt-theme': loanInfo.paymentApply > 0}">{{loanInfo.paymentApply}}</b>
            <p>
              <img src="../assets/images/icon-012.jpg" alt="">
              <span>已结算申请</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=6')">
            <b :class="{'l-txt-theme': loanInfo.beOverdue > 0}">{{loanInfo.beOverdue}}</b>
            <p>
              <img src="../assets/images/icon-013.jpg" alt="">
              <span>将逾期</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=8')">
            <b :class="{'l-txt-theme': loanInfo.overdue > 0}">{{loanInfo.overdue}}</b>
            <p>
              <img src="../assets/images/icon-007.jpg" alt="">
              <span>已逾期</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="l-zoom">
      <div class="l-panel-item l-margin-t l-margin-r l-fl" style="width: 900px;">
        <div class="_hd1 l-fs-xl">
          <b class="l-margin-r-x2">垫资通过情况</b>
          <span class="l-tag-rect1">通过审核</span>
          <span class="l-tag-rect3">申请总数</span>
        </div>
        <div class="_bd l-zoom">
          <bar-chart :chart-data="bar.data" :options="bar.options" :height="220"></bar-chart>
        </div>
      </div>
      <div class="l-panel-item l-margin-t l-fl" v-if="shopAuth && amountInfo">
        <div class="_hd1 l-fs-xl">
          <b>门店额度使用情况</b>
          <span class="l-tag-rect1">剩余额度</span>
          <span class="l-tag-rect2">已用额度</span>
        </div>
        <div class="l-doughnut">
          <doughnut-chart :chart-data="doughunt.data" :options="doughunt.options" :height="430"></doughnut-chart>
          <div class="_all">
            <p>垫资总额度</p>
            <b class="l-rmb l-txt-theme">{{amountInfo.amount}}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/chartjs/bar'
import DoughnutChart from '@/components/chartjs/doughnut'

export default {
  name: 'shop-home',
  components: {
    BarChart,
    DoughnutChart
  },
  data() {
    return {
      info: {},
      loanInfo: {},
      amountInfo: null,
      bar: {
        data: {},
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: '日期 / 天',
                  fontColor: '#e9b023'
                },
              }
            ],
            yAxes: [
              {
                display: true,
                minInterval : 1,
                gridLines: {
                  display: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: '订单数量 / 个',
                  fontColor: '#e9b023'
                },
                ticks: {
                  beginAtZero:true
                }
              }
            ]
          }
        }
      },
      doughunt: {
        data: {
          labels: ['已用额度', '剩余额度'],
          datasets: [
            {
              backgroundColor: [ '#EAB024', '#39b94d'],
              data: [0, 0]
            }
          ]
        },
        options: {
          tooltips: {
            yPadding: 10,
            xPadding: 10,
            cornerRadius: 1,
          },
          legend: {
            display: false,
            reverse: true
          },
          cutoutPercentage: 75
        }
      },
    }
  },
  computed: {
    ...mapGetters([
      'shopAuth',
    ]),
  },
  methods: {
    getData() {
      this.$api.index.getData().then(({data}) => {
        if(data) {
          this.info = data
          this.loanInfo = data.loanInfo
          let chartData = {
            labels: [],
            datasets: [
              {
                label: '通过审核',
                backgroundColor: '#39b94d',
                data: []
              },
              {
                label: '申请总数',
                backgroundColor: '#5c7fc1',
                data: []
              }
            ]
          }
          Object.keys(data.loanCount).forEach(key => {
            chartData.labels.push(key)
            chartData.datasets[0].data.push(data.loanCount[key].pass)
            chartData.datasets[1].data.push(data.loanCount[key].all)
          })
          this.bar.data = chartData
        }
      })
    }
  },
  mounted() {
    this.getData()

    this.amountInfo = this.$storage.session.get('shopAmount')
    this.doughunt.data.datasets[0].data[0] = this.amountInfo.usedAmount
    this.doughunt.data.datasets[0].data[1] = this.amountInfo.unUsedAmount
  }
}
</script>
<style lang="less" scoped>
.l-order-count{
  list-style: none; padding:0; display: flex; flex-wrap: wrap;
  ._item{
    margin: 15px 0; text-align: center; width: 171px; border-right: 1px solid #efeff4; cursor: pointer;
    &:last-of-type{border-right: none;}
    p{margin-top: 10px; font-size: 13px; white-space: nowrap;}
    b{font-size: 40px; line-height: 1; font-weight: 500;}
    img{width: 16px; height: 16px; line-height: 1.6; vertical-align: -3px; margin-right: 5px;}
    span{margin-right: 2px;}
  }
}
.l-doughnut{
  padding: 10%; 
  ._all{margin-top: -30px;}
  p{font-size: 20px;}
  b{font-size: 30px;}
}
</style>

