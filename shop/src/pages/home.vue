<template>
  <view-box class="l-bg-white">
    <div class="l-search-placeholder">
      <div class="_fixed">
        <div class="_tip">
          <icon type="search"></icon>
          <span>搜索商家、商品名称</span>
        </div>
      </div>
    </div>
    <div class="l-goods-class">
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-001.png" alt="">
        <p class="_txt">零食</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-002.png" alt="">
        <p class="_txt">饮料</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-003.png" alt="">
        <p class="_txt">酒类</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-004.png" alt="">
        <p class="_txt">香烟</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-005.png" alt="">
        <p class="_txt">办公</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-006.png" alt="">
        <p class="_txt">鲜食</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-007.png" alt="">
        <p class="_txt">水果</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-008.png" alt="">
        <p class="_txt">生活</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-009.png" alt="">
        <p class="_txt">肉类</p>
      </div>
      <div class="_item">
        <img class="_icon" src="../assets/images/icon-010.png" alt="">
        <p class="_txt">成人</p>
      </div>
    </div>
    <div class="l-margin-btn">
      <swiper auto :list="bannerSwiper.list" dots-position="center" :show-desc-mask="false"></swiper>
    </div>
    
    <div class="l-flex-hc l-row-title l-margin-t">
      <h4>店长推荐</h4>
      <div class="l-rest"></div>
      <div class="l-txt-gray l-baseline">
        <span>更多</span>
        <x-icon type="ios-arrow-right" size="20"></x-icon>
      </div>
    </div>
    <div class="l-goods-hot">
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>

    </div>

    <div class="l-flex-hc l-row-title l-margin-t">
      <h4>每天一瓶，有助消化</h4>
      <div class="l-rest"></div>
      <div class="l-txt-gray l-baseline">
        <span>更多</span>
        <x-icon type="ios-arrow-right" size="20"></x-icon>
      </div>
    </div>
    <div class="l-goods-hot">
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-fs-s l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>
      <div class="_item">
        <div class="_thumb" :style="{backgroundImage: 'url(' + require('../assets/images/temp-001.jpg') +')' }"></div>
        <div class="_txt l-txt-wrap1">韩国打的口袋空空</div>
        <div class="_price">
          <i class="_add"></i>
          <span class="l-rmb">8.00</span>
        </div>
      </div>

    </div>
  </view-box>
</template>

<script>
import { Swiper, Flexbox, FlexboxItem, Icon } from 'vux'
export default {
  name: 'home',
  components: {
    Swiper, Flexbox, FlexboxItem, Icon
  },
  data () {
    return {
      userInfo: null,
      bannerSwiper: {
        list: [
          { 
            url: 'javascript:', 
            img: require('../assets/images/20180531001.jpg'), 
            title: '' 
          }
        ]
      }
    }
  },
  methods: {
    
  },
  mounted() {
    
  },
  beforeDestroy() {
    // this.$api.abort()
  }
}
</script>

<style lang="less">
@theme-color: #af1459;
.l-row-title{padding: 0 15px;}
.l-search-placeholder{
  overflow: hidden;
  ._fixed{position: fixed; width: 100%; z-index: 10; background-color: @theme-color;}
  .weui-icon-search{vertical-align: -2px;}
  ._tip{text-align: center; line-height: 34px; background-color: #fff; color: #999; margin: 5px 10px; font-size: 14px;}
}
.vux-swiper{height: 140px !important;}
.l-goods-class{
  display: flex; flex-flow: row wrap; margin: 10px 0;
  ._item{text-align: center; width: 20%; margin: 5px 0;}
  ._icon{ display: block; margin: auto; width: 40px; height: 40px;}
  ._txt{font-size: 14px; margin-top: 3px;}
}
.l-goods-hot{
  display: flex; flex-flow: row wrap;
  ._item{width: 21%; margin: 5px 2%; font-size: 12px; margin-bottom: 10px;}
  ._thumb{ display: block; margin: auto; max-width: 100%; width: 100px; height: 80px; background: 50% 50% no-repeat; background-size: 80%;}
  ._txt{margin-top: 3px; color: #999;}
  ._price{color: @theme-color; margin-top: 5px;}
  ._add{float: right; width: 15px; height: 15px; margin-top: 2px; background: url('../assets/images/icon-011.png') 50% 50% no-repeat; background-size: contain;}
}
</style>

