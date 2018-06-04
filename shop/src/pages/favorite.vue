<template>
  <view-box>
    <header id="page-view-header">
      <x-header :left-options="{backText: ''}">
        <span>{{$route.meta.title}}</span>
      </x-header>
    </header>

    <div class="l-app-bg l-bg-white">
      <swipeout>
        <swipeout-item transition-mode="follow" v-for="item in goodsList" :key="item.id">
          <div slot="right-menu">
            <!-- <swipeout-button @click.native="delGoods(item)" background-color="#f09837">找相似</swipeout-button> -->
            <swipeout-button @click.native="delGoods(item)" background-color="#ed722f">
              加入<br>购物车
            </swipeout-button>
            <swipeout-button @click.native="delGoods(item)" background-color="#ea4d3c">删除</swipeout-button>
          </div>
          <div slot="content" class="l-flex-hc l-shopcar-item vux-1px-t">
            <div class="_thumb" :style="{backgroundImage: 'url(' + item.thumb +')' }"></div>
            <div class="l-rest">
              <h4 class="l-txt-wrap1">{{item.name}}</h4>
              <p class="l-txt-gray l-margin-t-s">1999人收藏</p>
              <div class="_price">
                <span class="l-rmb l-txt-theme l-fs-l">{{item.price}}</span>
              </div>
            </div>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
  </view-box>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, InlineXNumber, Icon } from "vux"
export default {
  name: 'favorite',
  components: {
    Swipeout, SwipeoutItem, SwipeoutButton, InlineXNumber, Icon
  },
  data () {
    return {
      goodsList: [],
    }
  },
  methods: {
    getList() {
      let tempArr = new Array(1,1,1,1,1,1,1,1,1,1)
      console.log(tempArr)
      this.goodsList = tempArr.map((item, index) => {
        console.log(item)
        return {
          id: index + 1,
          checked: false,
          thumb: require('../assets/images/temp-001.jpg'),
          name: '歌飞龙波尔多红葡萄酒歌飞龙波尔多红葡萄酒',
          num: index + 1,
          price: (150 + index).toFixed(2)
        }
      })
    }
  },
  mounted() {
    this.getList()
  },
  beforeDestroy() {
    this.$api.abort()
  }
}
</script>

<style lang="less" scoped>
.l-shopcar-item{
  padding: 5px 15px;
  ._check{margin-left: -5px;}
  ._thumb{width: 100px; height: 100px; background: 50% 50% no-repeat; background-size: 80%;}
  ._price{margin-top: 10px;}
  ._num{float: right; margin-top: -1px; transform: scale(0.8); transform-origin: 100% 50%;}
}
</style>

