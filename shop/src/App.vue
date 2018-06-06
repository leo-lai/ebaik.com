<template>
  <div id="app-content">
    <div id="app-body" :class="{'no-tabbar': !$route.meta.tabbar}">
      <transition :name="viewTransition" :css="!!direction || direction === 'fade'">
        <header id="app-header" v-show="$route.meta.tabbar">
          <div class="l-flex-hc _home">
            <div class="l-rest">
              <div class="_loc">
                <i class="l-icon _i1">&#xe634;</i>
                <span class="l-txt-wrap1">请选择店铺</span>
                <i class="l-icon">&#xe6ac;</i>
              </div>
              <div class="_addr l-txt-wrap1">送货时间/范围：08:00-24:00/科学城天泰一路一号微米物联大厦</div>
            </div>
            <div @click="gotoUserInfo" class="_avatar" :style="{'background-image': 'url(' + $config.avatar +')'}"></div>          
          </div>
        </header>
      </transition>

      <transition @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="viewTransition" :css="!!direction">
        <router-view id="page-view"></router-view>
      </transition>

      <transition :name="viewTransition" :css="!!direction || direction === 'fade'">
        <tabbar id="app-footer" v-show="$route.meta.tabbar">
          <tabbar-item :link="{path: '/', replace: true}" :selected="$route.path === '/'">
            <i slot="icon" class="l-icon">&#xe667;</i>
            <span slot="label">立即送</span>
          </tabbar-item>
          <tabbar-item :link="{path: '/machine', replace: true}" :selected="$route.path === '/machine'">
            <i slot="icon" class="l-icon">&#xe63b;</i>
            <span slot="label">售货机</span>
          </tabbar-item>
          <tabbar-item :link="{path: '/shop', replace: true}" :selected="$route.path === '/shop'">
            <i slot="icon" class="l-icon">&#xe60b;</i>
            <span slot="label">电商</span>
          </tabbar-item>
          <tabbar-item badge="99" :link="{path: '/shopcar', replace: true}" :selected="$route.path === '/shopcar'">
            <i slot="icon" class="l-icon">&#xe63f;</i>
            <span slot="label">购物车</span>
          </tabbar-item>
        </tabbar>
      </transition>
    </div>

    <loading v-model="loading"></loading>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Loading, throttle } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
   Tabbar, TabbarItem, Loading
  },
  computed: {
    ...mapGetters(['loading', 'scrollTop', 'direction']),
    viewTransition() {
      if (!this.direction) return ''
      return 'vux-pop-' + this.direction
    }
  },
  data() {
    return {
      leftOptions: {
        showBack: true,
        backText: '',
        preventGoBack: false
      },
      scrollElem: {
        scrollTop: 0,
        scrollHeight: 0,
        clientHeight: window.innerHeight
      },
      userInfo: {}
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      deep: true,
      handler() {
        this.onScroll()
      }
    }
  },
  methods: {
    scrollHandler(event) {
      this.$router.savedScroll[this.$route.fullPath] = event.target.scrollTop
    },
    onScroll() {
      this.noPreventBounce = !!document.querySelector('[no-prevent-bounce]')
      this.$nextTick(_ => {
        let viewBoxs = document.querySelectorAll('#vux_view_box_body')
        let scrollElem = viewBoxs[1] || viewBoxs[0]
        if (scrollElem) {
          setTimeout(_ => scrollElem.scrollTop = this.scrollTop)
          scrollElem.addEventListener('scroll', throttle(this.scrollHandler, 500), false)
          this.scrollElem = scrollElem
        }
      })
    },
    preventBounce() { // 禁止ios 无滚动时页面反弹效果
      let scrollData = { posY: 0, maxScroll: 0 }
      let appBody = document.querySelector('#app-body')
      appBody.addEventListener('touchstart', event => {
        let e = event.touches[0] || event
        // 垂直位置标记
        scrollData.posY = e.pageY
        // 是否可以滚动
        if(this.scrollElem) {
          scrollData.maxScroll = this.scrollElem.scrollHeight - this.scrollElem.clientHeight
        }
      }, false)

      appBody.addEventListener('touchmove', event => {
        if(this.noPreventBounce) return

        let e = event.touches[0] || event
        // 如果不足于滚动，则禁止触发整个窗体元素的滚动
        if (scrollData.maxScroll <= 0) {
          // 禁止滚动
          return event.preventDefault()
        }

        // 当前移动的垂直位置，用来判断是往上移动还是往下
        let distanceY = e.pageY - scrollData.posY
        // 上下边缘检测
        if (distanceY > 0 && this.scrollElem.scrollTop == 0) {
          // 往上滑，并且到头
          // 禁止滚动的默认行为
          return event.preventDefault()
        }

        // 下边缘检测
        if (distanceY < 0 && this.scrollElem.scrollTop + 1 >= scrollData.maxScroll) {
          // 往下滑，并且到头
          // 禁止滚动的默认行为
          return event.preventDefault()
        }
      }, false)
      
      appBody.addEventListener('touchend', event => {
        scrollData.maxScroll = 0
      }, false)
    },
    gotoUserInfo() {
      if(this.userInfo) {
        this.$router.push('/me')
      }else{
        this.$router.push('/register1')
      }
    }
  },
  mounted() {
    this.preventBounce()
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "./assets/base.less";
@theme-color: #af1459;
.l-rmb::before{ content: '￥'; font-size: 0.6em;}

.weui-tabbar__icon > i{display: block; margin-top: -4px;}
.weui-tabbar__icon > sup{top: -5px !important;}
.weui-btn_plain-default{border-color: rgba(0, 0, 0, 0.1) !important;}
._l-btn_mini{line-height: 2 ; padding: 0 15px; font-size: 12px;}
.weui-btn_mini{ ._l-btn_mini() !important;}

.weui-btn[round]{border-radius: 99px !important;}
.weui-btn_plain-primary{
  color:  @theme-color !important;
  border: 1px solid @theme-color !important;
}
.weui-cell__icon{display: block; width: 25px; height: 25px; margin-right: 10px;}
.vux-swipeout-button{vertical-align: top;}
.l-baseline{
  span{display: inline-block; vertical-align: middle;}
  .vux-x-icon{vertical-align: middle; margin: 0 -6px; fill: currentColor;}
}
#app-header {
  ._home{padding: 0 10px; height: 100%;}
  ._loc {
    overflow: hidden; margin-top: -2px;
    i,span{float: left;}
    span{max-width: 70%; font-size: 13px; margin-top: 2px;}
    ._i1{font-size: 16px; margin-right: 5px; }
  }
  ._addr{margin-top: -3px; font-size: 11px;}
  ._avatar{
    width: 30px; height: 30px; border-radius: 50%; border: 1px solid #fff; margin-left: 15px;
    background: no-repeat 50% 50%; background-size: cover;
  }
}
</style>
