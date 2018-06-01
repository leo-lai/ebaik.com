<template>
  <view-box>
    <swipeout>
      <swipeout-item transition-mode="follow" v-for="item in goodsList" :key="item.id">
        <div slot="right-menu">
          <swipeout-button @click.native="delGoods(item)" background-color="rgb(247, 76, 49)">删除</swipeout-button>
        </div>
        <div slot="content" class="l-flex-hc l-shopcar-item vux-1px-t">
          <icon type="circle" class="_check"></icon>
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
  </view-box>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, InlineXNumber, Icon } from "vux";
export default {
  name: "shopcar",
  components: {
    Swipeout, SwipeoutItem, SwipeoutButton, InlineXNumber, Icon
  },
  data() {
    return {
      goodsList: [
        {
          id: 1,
          checked: false,
          thumb: require('../assets/images/temp-001.jpg'),
          name: '歌飞龙波尔多红葡萄酒歌飞龙波尔多红葡萄酒',
          num: 1,
          price: '150.00'
        },
        {
          id: 2,
          checked: false,
          thumb: require('../assets/images/temp-001.jpg'),
          name: '歌飞龙波尔多红葡萄酒歌飞龙波尔多红葡萄酒',
          num: 1,
          price: '150.00'
        }
      ],
      number: 1,
    }
  },
  methods: {
    delGoods() {

    }
  },
  mounted() {},
  beforeDestroy() {
    // this.$api.abort()
  }
};
</script>

<style lang="less">
@theme-color: #af1459;
.l-shopcar-item{
  padding: 5px 15px;
  ._check{margin-left: -5px;}
  ._thumb{width: 100px; height: 100px; background: 50% 50% no-repeat; background-size: 80%;}
  ._price{margin-top: 10px;}
  ._num{float: right; margin-top: -1px; transform: scale(0.8); transform-origin: 100% 50%;}
}
</style>

