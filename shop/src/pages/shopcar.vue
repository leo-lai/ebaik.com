<template>
  <view-box>
    <swipeout>
      <swipeout-item transition-mode="follow" v-for="item in list.data" :key="item.id">
        <div slot="right-menu">
          <swipeout-button @click.native="delGoods(item)" background-color="#ed722f">
            移入<br>收藏夹
          </swipeout-button>
          <swipeout-button @click.native="delGoods(item)" background-color="rgb(247, 76, 49)">删除</swipeout-button>
        </div>
        <div slot="content" class="l-flex-hc l-shopcar-item vux-1px-t">
          <div class="_check">
            <check-icon :value.sync="item.checked"></check-icon>
          </div>
          <div class="_thumb" :style="{backgroundImage: 'url(' + item.thumb +')' }"></div>
          <div class="l-rest">
            <h4 class="l-txt-wrap1">{{item.name}}</h4>
            <p class="l-txt-gray l-margin-t-s">
              <span>单位：包</span>
              <span>规格：5g</span>
            </p>
            <div class="_price">
              <inline-x-number class="_num" :min="1" v-model="item.num" width="40px" button-style="round"></inline-x-number>
              <span class="l-rmb l-txt-theme l-fs-l">{{item.price}}</span>
            </div>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
    <div class="l-shopcar-bottom l-margin-t">
      <div class="_inner">
        <div class="_tip">
          温馨提示：<br>
          1、选择商品后10分钟内未付款，系统将自动清空购物车。<br>
          2、本店送货地址为：天泰一路1号范围。
        </div>
        <div class="l-flex-hc">
          <div class="_check">
            <check-icon :value.sync="checkAll"></check-icon>
            <span>全选(0)</span>
          </div>
          <div class="l-rest"></div>
          <div class="_price">
            合计：
            <span class="l-rmb l-fs-l l-txt-theme">0.00</span>  
          </div>
          <x-button class="_primary" type="primary" @click.native="gotoOrder()">去结算</x-button>
        </div>
      </div>
      <div class="_placeholder"></div>
    </div>
  </view-box>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, InlineXNumber, CheckIcon } from "vux"
export default {
  name: "shopcar",
  components: {
    Swipeout, SwipeoutItem, SwipeoutButton, InlineXNumber, CheckIcon
  },
  data() {
    return {
      checkAll: false,
      list: {
        filter: {},
        rows: 50,
        page: 1,
        data: []
      },
    }
  },
  methods: {
    
    getList() {
      let tempArr = new Array(1,1,1,1,1,1,1,1,1,1)
      this.list.data = tempArr.map((item, index) => {
        return {
          id: index + 1,
          checked: false,
          thumb: require('../assets/images/temp-001.jpg'),
          name: '歌飞龙波尔多红葡萄酒歌飞龙波尔多红葡萄酒',
          num: index + 1,
          price: (150 + index).toFixed(2)
        }
      })
    },
    delGoods() {

    },
    gotoOrder() {
      this.$router.push('/order/pre')
    }
  },
  mounted() {
    this.getList()
  },
  beforeDestroy() {
    this.$api.abort()
  }
};
</script>

<style lang="less" scoped>
.l-shopcar-bottom{
  ._tip{background-color: #fff; padding: 5px 15px; font-size: 12px;}
  ._inner{position: fixed; bottom: 48px; left: 0; right: 0;  background-color: #eee;}
  ._check{margin-left: 10px;}
  ._price{margin: 0 10px;}
  ._primary{width: 100px; font-size: 14px; padding: 7px 20px;}
  ._placeholder{height: 48px;}
}
.l-shopcar-item{
  padding: 5px 15px;
  ._check{margin-left: -5px;}
  ._thumb{width: 100px; height: 100px; background: 50% 50% no-repeat; background-size: 80%;}
  ._price{margin-top: 10px;}
  ._num{float: right; margin-top: -1px; transform: scale(0.8); transform-origin: 100% 50%;}
}
</style>

