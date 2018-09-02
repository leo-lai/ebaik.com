<template>
  <el-container class="l-h100">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="l-bg-white l-margin-t">
        <div class="l-tab">
          <i v-show="loading" class="el-icon-loading l-fs-x2 l-fr l-padding"></i>
          <ul class="l-tab-tit">
            <li  @click="$router.replace('/me')">账号基本信息</li>
            <li @click="$router.replace('/shop/auth/info')">门店基本资料</li>
            <li class="_active0">额度管理</li>
          </ul>
        </div>
        <div class="l-padding-xl l-zoom">
          <div class="l-margin-t l-fl" style="width: 400px;">
            <div class="l-fs-xl l-txt-center">
              <span class="l-tag-rect1">剩余额度</span>
              <span class="l-tag-rect2">已用额度</span>
            </div>
            <div class="l-doughnut">
              <doughnut-chart :chart-data="doughunt.data" :options="doughunt.options" :height="414"></doughnut-chart>
              <div class="_all">
                <p>垫资总额度</p>
                <b class="l-rmb l-txt-theme">200000</b>
              </div>
            </div>
          </div>
          <div class="l-fl" style="width: 800px;">
            
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import DoughnutChart from '@/components/chartjs/doughnut'
export default {
  name: 'shop-amount',
  components: {
    DoughnutChart
  },
  data() {
    return {
      loading: false,
      doughunt: {
        data: {
          labels: ['已用额度', '剩余额度'],
          datasets: [
            {
              backgroundColor: [ '#EAB024', '#39b94d'],
              data: [50000, 150000]
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    
  },
  mounted() {
  }
}
</script>
<style scoped lang="less">
.l-doughnut{
  padding: 10%; 
  ._all{margin-top: -30px;}
  p{font-size: 20px;}
  b{font-size: 30px;}
}
</style>