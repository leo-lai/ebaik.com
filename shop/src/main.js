// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// require('es6-promise').polyfill()
const isProd = process.env.NODE_ENV === 'production'

import Vue from 'vue'
Vue.config.productionTip = false

// const FastClick = require('fastclick')
// FastClick.attach(document.body)

// 移动端调试
import VConsole from 'vconsole'
!isProd && new VConsole()


import { sync } from 'vuex-router-sync'
import { fetch, api } from '@/api'
import router from './router'
import store from './store'
import config from './config'

// 把路由信息映射到状态
sync(store, router)

import { 
  TransferDom, ConfigPlugin, BusPlugin, CellBox,
  DatetimePlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin,
  Icon, ViewBox, Group, GroupTitle, Cell, Sticky, XHeader, XInput, XButton, Divider
} from 'vux'

// plugins
Vue.directive('transfer-dom', TransferDom)
Vue.use(ConfigPlugin, { $layout: 'VIEW_BOX' }) // global config for VUX, since v2.5.12
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

// component
Vue.component('icon', Icon)
Vue.component('view-box', ViewBox)
Vue.component('cell-box', CellBox)
Vue.component('group', Group)
Vue.component('group-title', GroupTitle)
Vue.component('cell', Cell)
Vue.component('sticky', Sticky)
Vue.component('x-header', XHeader)
Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('divider', Divider)

import { device, toptip, utils, storage } from './assets/utils'
// 全局函数
let eventHub = new Vue()
// 工具插件
Vue.use({
  install: function (Vue) {
    // 注入组件
    Vue.mixin({
      created() {
        // 微信IOS6.7.4版本在输入框弹出键盘后，页面没恢复
        this.$bug = {
          fixWx674() {
            if (device.isIos && device.isWechat) {
              let ipts = document.querySelectorAll('input,textarea')
              Array.prototype.forEach.call(ipts, iptDom => {
                iptDom.onblur = function () {
                  document.activeElement.scrollIntoViewIfNeeded(true)
                }
              })
            }
          }
        }
      }
    })

    const href = function (url, action = 'push') {
      if (!url) return

      if (/^http(s?)/i.test(url)) {
        location[action === 'push' ? 'assign' : action](url)
      } else {
        router[action] && router[action](url)
      }
    }

    // 微信或支付宝JSBridge
    const onBridgeReady = function (callback) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        if (typeof WeixinJSBridge == 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', callback, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', callback);
            document.attachEvent('onWeixinJSBridgeReady', callback);
          }
        } else {
          callback();
        }
      } else if (ua.match(/Alipay/i) == 'alipay') {
        // 如果jsbridge已经注入则直接调用
        if (window.AlipayJSBridge) {
          callback();
        } else {
          // 如果没有注入则监听注入的事件
          document.addEventListener('AlipayJSBridgeReady', callback, false);
        }
      }
    }

    const closeWindow = function() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        WeixinJSBridge.call('closeWindow')
      } else if (ua.indexOf('alipay') != -1) {
        AlipayJSBridge.call('closeWebview')
      } else {
        history.back()
      }
      return false
    }

    // 添加实例方法
    Vue.prototype.$config = config      // 设备检测
    Vue.prototype.$device = device      // 设备检测
    Vue.prototype.$storage = storage    // 本地存储
    Vue.prototype.$utils = utils        // 工具函数
    Vue.prototype.$toptip = toptip      // 顶部提示

    Vue.prototype.$eventHub = eventHub
    Vue.prototype.$api = api
    Vue.prototype.$config = config
    Vue.prototype.$href = href
    Vue.prototype.$ajax = fetch
    Vue.prototype.$onBridgeReady = onBridgeReady
    Vue.prototype.$closeWindow = closeWindow

  }
})

// 过滤器
// 只显示年月日
Vue.filter('Ymd', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.split(' ')[0]
})
// 万元
Vue.filter('Wan', function (value) {
  if (!value) return ''
  return (value / 10000).toFixed(2)
})

/* eslint-disable no-new */
import App from './App'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
