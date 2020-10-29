<template>
  <div id="app">
    <div id="app-body" :class="{'no-tabbar': !$route.meta.tabbar}">
      <transition :name="viewTransition" :css="!!direction || direction === 'fade'">
        <header id="app-header" v-show="$route.meta.topinfo">
          <div class="l-flex-hc _home">
            <div class="l-rest" @click="$router.push('/store/list')">
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
          <tabbar-item badge="99" :link="{path: '/tabbar/shopcar', replace: true}" :selected="$route.path === '/tabbar/shopcar'">
            <i slot="icon" class="l-icon">&#xe63f;</i>
            <span slot="label">购物车</span>
          </tabbar-item>
          <tabbar-item :link="{path: '/tabbar/me', replace: true}" :selected="$route.path === '/tabbar/me'">
            <i slot="icon" class="l-icon">&#xe60b;</i>
            <span slot="label">我的</span>
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

function isSupportSticky() {//判断是否支持sticky
  var prefixTestList = ['', '-webkit-'];
  var stickyText = '';
  for (var i = 0; i < prefixTestList.length; i++ ) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky;';
  }
  // 创建一个dom来检查
  var div = document.createElement('div');
  div.style.cssText = stickyText;
  document.body.appendChild(div);
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
  document.body.removeChild(div);
  div = null;
  return isSupport;
}
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
      // 是否阻止ios页面上下滚动反弹，如果页面有no-prevent-bounce元素，则不阻止
      isPreventBounce: true,
      scrollTarget: {
        scrollLeft: 0,
        scrollTop: 0,
        scrollWidth: 0,
        scrollHeight: 0,
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight,
      },
      leftOptions: {
        showBack: true,
        backText: '',
        preventGoBack: false
      },
      userInfo: {}
    }
  },
  methods: {
    pageInit() {
      this.$nextTick(() => {
        clearTimeout(this.pageInitTimeId)
        this.pageInitTimeId = setTimeout(() => {
          this.$bug.fixWx674()
          this.isPreventBounce = !document.querySelector('[no-prevent-bounce]')
          this.pageScroll = document.querySelector('.l-page-scroll')
        }, 1000)
      })
    },
    getScrollElement(elem) {
      if(elem && elem.classList) {
        let style = getComputedStyle(elem)
        // if(elem.classList.contains('el-table__body-wrapper') || elem.classList.contains('l-page-scroll') || elem.classList.contains('van-popup')) {
        if(style['overflow-y'] === 'auto' || style['overflow-y'] === 'scroll' || style['overflow-x'] === 'auto' || style['overflow-x'] === 'scroll') {
          return elem
        }else{
          return this.getScrollElement(elem.parentElement)
        }
      }else {
        return null
      }
    },
    preventBounce() { // 禁止ios 无滚动时页面反弹效果
      let scrollData = { posX: 0, posY: 0, maxScrollX: 0, maxScrollY: 0 }
      let appBody = document.querySelector('#app')
      let emitTop = this.$utils.debounce(this.emitTop, 500)
      let emitBottom = this.$utils.debounce(this.emitBottom, 500)
      appBody.addEventListener('touchstart', event => {
        let e = event.touches[0] || event
        // 触摸开始位置标记
        scrollData.posX = e.pageX
        scrollData.posY = e.pageY
        
        this.scrollTarget = this.getScrollElement(e.target)
        if(this.scrollTarget) {
          scrollData.maxScrollX = this.scrollTarget.scrollWidth - this.scrollTarget.clientWidth
          scrollData.maxScrollY = this.scrollTarget.scrollHeight - this.scrollTarget.clientHeight
        }else{
          scrollData.maxScrollX = 0
          scrollData.maxScrollY = 0
        }
      }, false)

      appBody.addEventListener('touchmove', event => {
        let e = event.touches[0] || event
        // 当前移动的水平方向，用来判断是往左移动还是往右
        let distanceX = e.pageX - scrollData.posX
        // 当前移动的垂直方向，用来判断是往上移动还是往下
        let distanceY = e.pageY - scrollData.posY

        let isToTop, isToBottom, isToLeft, isToRight
        if(this.scrollTarget) {
          isToTop = this.scrollTarget.scrollTop == 0
          isToBottom = this.scrollTarget.scrollTop + 1 >= scrollData.maxScrollY
          isToLeft = this.scrollTarget.scrollLeft == 0
          isToRight = this.scrollTarget.scrollLeft + 1 >= scrollData.maxScrollX
        }
        
        // 阻止ios页面上下滚动反弹，如果页面有no-prevent-bounce元素，则不阻止
        if(this.isPreventBounce) {
          // 禁止滚动情况
          // 1. 如果不足于滚动，则禁止触发整个窗体元素的滚动
          if (scrollData.maxScrollX <= 0 && scrollData.maxScrollY <= 0) {
            event.preventDefault()
            event.stopPropagation()
          }
          // 2. 如果页面往上滚动distanceY > 0（即手指往下滑），并且页面已经到顶
          // 3. 如果页面往下滚动distanceY < 0（即手指往上滑），并且页面已经到底
          else if((distanceY > 0 && isToTop) || (distanceY < 0 && isToBottom)) {
            // 如果左右不可滑动或已经滑到最左最右侧了
            if(scrollData.maxScrollX <= 0 || Math.abs(distanceX) < 5) { 
              event.preventDefault()
              event.stopPropagation()
            }
          }
        }

        if(distanceY > 0 && isToTop) {
          // 往上滑，并且到顶
          emitTop(distanceY)
        }else if(distanceY < 0 && isToBottom) {
          // 往下滑，并且到底
          emitBottom(distanceY)
        }

        this.$eventHub.$emit('scroll', { 
          ...scrollData, 
          target: this.scrollTarget,
          distanceX, distanceY
        })
      }, false)
      
      appBody.addEventListener('touchend', () => {
        // 记录当前页面最后的滚动位置，返回该页面可以恢复之前的滚动位置
        if(this.pageScroll) { 
          this.$router.savedScroll[this.$route.fullPath] = this.pageScroll.scrollTop
        }
      }, false)
    },
    emitTop(distanceY) { // 到达顶部事件
      console.log('top', distanceY)
      this.$eventHub.$emit('scroll:top', distanceY)
    },
    emitBottom(distanceY) { // 到达底部事件
      console.log('bottom', distanceY)
      this.$eventHub.$emit('scroll:bottom', distanceY)
    },
    gotoUserInfo() {
      if(this.userInfo) {
        this.$router.push('/me')
      }else{
        this.$router.push('/register1')
      }
    }
  },
  updated() {
    this.pageInit()
  },
  mounted() {
    this.preventBounce()
    this.pageInit()
    this.$eventHub.$on('pageInit', this.pageInit)

    // let hours = new Date().getHours()
    // if(hours < 8 || hours > 23){
    //   this.$vux.alert.show({
    //     title: '打样提醒',
    //     content: '不好意思，本店送货时间为：08:00 -24:00。现在不能为您提供送货服务，请选择自动售货或电商服务。或者看看宜百客其它店铺。'
    //   })  
    // }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './assets/base.less';
@theme-color: #af1459;
.weui-grid__label{ font-size: 13px !important; }
.weui-grid__icon{
  width: 20px !important;
  height: 20px !important;
  margin: 0 auto 10px !important;
}
.l-no-border .weui-cells{
  &::before{ visibility: hidden; }
  &::after{ visibility: hidden; }
}
.vux-x-dialog-absolute .weui-dialog{ position: fixed; }
.vux-divider{ color: #d4d4d4 !important; }
.l-rmb::before{ content: '￥'; font-size: 0.6em;}
.weui-dialog__bd{text-align: left; text-align: justify;}
.vux-x-icon{ fill: currentColor; }
.vux-header-right .vux-x-icon{ margin-top: -6px; }
.weui-tabbar__icon > i{display: block; margin-top: -4px;}
.weui-tabbar__icon > sup{top: -5px !important;}
.weui-btn_plain-default{border-color: rgba(0, 0, 0, 0.1) !important;}
._l-btn_mini{line-height: 2 ; padding: 0 15px; font-size: 12px;}
.weui-btn_mini{ ._l-btn_mini() !important;}
.weui-btn{ overflow: unset !important; }
.weui-btn[round]{border-radius: 99px !important;}
.weui-btn_plain-primary{
  color:  @theme-color !important;
  border: 1px solid @theme-color !important;
}
.weui-cells{ font-size: 16px !important; }
.weui-cell__icon{display: block; width: 20px; height: 20px; margin-right: 10px;}
.vux-swipeout-button{vertical-align: top;}
.l-baseline{
  span{display: inline-block; vertical-align: middle;}
  .vux-x-icon{vertical-align: middle; margin: 0 -6px;}
}
#app-header {
  ._home{padding: 0 10px; height: 100%;}
  ._loc {
    overflow: hidden; margin-top: -2px;
    i,span{float: left;}
    span{max-width: 70%; font-size: 13px; margin-top: 2px;}
    ._i1{font-size: 16px; margin-right: 5px; }
  }
  ._addr{margin-top: -1px; font-size: 11px;}
  ._avatar{
    width: 30px; height: 30px; border-radius: 50%; border: 1px solid #fff; margin-left: 15px;
    background: no-repeat 50% 50%; background-size: cover;
  }
}

.l-search-box{
  position: fixed; top: 46px; width: 100%; z-index: 10; background-color: @theme-color; color: #fff;
  box-sizing: border-box; height: 44px; padding: 0 15px;
  ._filter{margin-right: 10px;}
  ._ipt{ 
    background-color: #fff; border-radius: 100px; padding: 5px 10px 5px 35px;
    input{width: 100%; border: none; outline: 0;}
    ._icon{float: left; margin: 3px 0 0 -25px;}
  }
}

.l-checker-item { 
  min-width: 56px; height: 26px; line-height: 26px; text-align: center; border-radius: 3px;color: #999;
  border: 1px solid transparent; background-color: #f5f5f5; padding: 0 10px; margin: 10px 10px 0 0;
}
.l-checker-item-slted {
  background-color: #fff; border-color: @theme-color; color: @theme-color;
}
</style>
