<template>
  <div class="l-padding">
    <div class="l-panel-item ">
      <div class="_hd1 l-fs-xl">
        <b class="l-margin-r-x2">待结算垫资本金：<i class="l-rmb l-txt-theme">{{info.loanAmount}}</i></b>
        <b>待结算利息：<i class="l-rmb l-txt-theme">{{info.loanInterest}}</i></b>
      </div>
      <div class="_bd">
        <ul class="l-order-count">
          <li class="_item" @click="$router.replace('/shop/list?tab=0')">
            <b :class="{'l-txt-theme': info.orgVerify > 0}">{{info.orgVerify}}</b>
            <p>
              <img src="../assets/images/icon-001.jpg" alt="">
              <span>待审核门店</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=0')">
            <b :class="{'l-txt-theme': loanInfo.unVerify > 0}">{{loanInfo.unVerify}}</b>
            <p>
              <img src="../assets/images/icon-002.jpg" alt="">
              <span>待审核垫资申请</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=3')">
            <b :class="{'l-txt-theme': loanInfo.logisticsOrder > 0}">{{loanInfo.logisticsOrder}}</b>
            <p>
              <img src="../assets/images/icon-003.jpg" alt="">
              <span>待物流下单</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=3')">
            <b :class="{'l-txt-theme': loanInfo.logisticsInspect > 0}">{{loanInfo.logisticsInspect}}</b>
            <p>
              <img src="../assets/images/icon-004.jpg" alt="">
              <span>待物流验车</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=3')">
            <b :class="{'l-txt-theme': loanInfo.logisticsLoading > 0}">{{loanInfo.logisticsLoading}}</b>
            <p>
              <img src="../assets/images/icon-005.jpg" alt="">
              <span>待物流装车</span>
              <i class="el-icon-arrow-right"></i>
            </p>
          </li>
          <li class="_item" @click="$router.replace('/order/list?tab=3')">
            <b :class="{'l-txt-theme': loanInfo.payment > 0}">{{loanInfo.payment}}</b>
            <p>
              <img src="../assets/images/icon-006.jpg" alt="">
              <span>待支付车款</span>
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
    <div class="l-panel-item l-margin-t">
      <div class="_hd1 l-fs-xl">
        <b class="l-margin-r-x2">垫资通过情况</b>
        <span class="_rect1">通过审核</span>
        <span class="_rect2">申请总数</span>
      </div>
      <div class="_bd l-zoom" >
        <bar-chart :chart-data="chartData" :options="chartOpts" :height="130"></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/chartjs/bar'
export default {
  name: 'home',
  components: {
    BarChart
  },
  data() {
    return {
      info: {},
      loanInfo: {},
      chartData: {},
      chartOpts: {
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
              allowDecimals: false,
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
    }
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
          this.chartData = chartData
        }
      })
    }
  },
  mounted() {
    this.getData()
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

._rect1{
  margin-right: 15px; font-size: 12px;
  &::before{
    content: '......'; display: inline-block; line-height: 1;
    background-color: #39b94d; color:  #39b94d; margin:0 10px 0 0;
  }
}
._rect2{
  margin-right: 15px; font-size: 12px;
  &::before{
    content: '......'; display: inline-block; line-height: 1;
    background-color: #5c7fc1; color:  #5c7fc1; margin:0 10px 0 0;
  }
}
</style>

