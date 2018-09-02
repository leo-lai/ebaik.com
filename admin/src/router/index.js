import { utils, storage } from '@/assets/js/utils'
import Vue from 'vue'
import { Message } from 'element-ui'
import Router from 'vue-router'
import NProgress from 'nprogress'

import store from '../store/index'
import { menus, routes } from './routes'

// 当前系统平台：后台端admin、渠道商端agent、门店端shop
let urlArgs = utils.url.getArgs()
let platform = ''
if(urlArgs._plat) {
  storage.local.set('platform', urlArgs._plat)
  platform = urlArgs._plat
}else{
  platform = storage.local.get('platform') || 'admin'
}
// 当前平台本地存储前缀
storage.setPrefix(platform)


Vue.use(Router)
const router = new Router({
  base: '/',
  mode: 'history',
  routes: [...menus[platform], ...routes]
})

router.platform = platform
router.hostURL = location.origin + (router.options.base || '')

// 路由控制
router.beforeEach((to, from, next) => {
  if(!platform) {
    return next(false)
  }

  // 路径地址必须带上_plat参数
  if(!to.query._plat) {
    to.query._plat = platform
    return next({
      path: to.path,
      query: to.query,
    })
  }

  if(to.meta.auth !== false) { // 需要验证登录
    return store.dispatch('checkLogin').then(() => { // 已登录
      if(platform === 'shop' && to.meta.shopAuth && store.state.user.shopAuth === false) {
        Message({
          type: 'error',
          message: '请先完成门店认证'
        })
        return next('/shop/auth/info')
      }else if(platform === 'admin' && to.meta.role && 
        !utils.strcpr(to.meta.role, store.state.user.info.roleCode)){
        // 无权限访问
        return next('/403')
      }else {
        next()
      }
    }).catch(() => {
      next('/login?to=' + location.href)
    })
  }

  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
