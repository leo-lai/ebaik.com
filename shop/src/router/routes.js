import home from '../pages/home'
import machine from '../pages/machine'
import shopcar from '../pages/shopcar'
import me from '../pages/me'
const demo = () => import('../pages/demo').then(m => m.default)
const storeList = () => import('../pages/store-list').then(m => m.default)
const classGoods = () => import('../pages/class-goods').then(m => m.default)
const goodsSearch = () => import('../pages/goods-search').then(m => m.default)
const goodsInfo = () => import('../pages/goods-info').then(m => m.default)
const meInfo = () => import('../pages/me-info').then(m => m.default)
const orderPre = () => import('../pages/order-pre').then(m => m.default)
const orderPay = () => import('../pages/order-pay').then(m => m.default)
const orderResult = () => import('../pages/order-result').then(m => m.default)
const orderList = () => import('../pages/order-list').then(m => m.default)
const register1 = () => import('../pages/register1').then(m => m.default)
const register2 = () => import('../pages/register2').then(m => m.default)
const login = () => import('../pages/login').then(m => m.default)
const join = () => import('../pages/join').then(m => m.default)
const grade = () => import('../pages/grade').then(m => m.default)
const redpack = () => import('../pages/redpack').then(m => m.default)
const wallet = () => import('../pages/wallet').then(m => m.default)
const walletBill = () => import('../pages/wallet-bill').then(m => m.default)
const walletCash = () => import('../pages/wallet-cash').then(m => m.default)
const walletRecharge = () => import('../pages/wallet-recharge').then(m => m.default)
const walletRecharge2 = () => import('../pages/wallet-recharge2').then(m => m.default)
const favorite = () => import('../pages/favorite').then(m => m.default)
const feedback = () => import('../pages/feedback').then(m => m.default)
const address = () => import('../pages/address').then(m => m.default)
const addressAdd = () => import('../pages/address-add').then(m => m.default)
const addressSlter = () => import('../pages/address-slter').then(m => m.default)
const setting = () => import('../pages/setting').then(m => m.default)
const pay = () => import('../pages/pay').then(m => m.default)
const payResult = () => import('../pages/pay-result').then(m => m.default)
const page404 = () => import('../pages/404').then(m => m.default)


const routes = [
  {
    path: '/',
    redirect: '/me',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
      tabbar: true,
      topinfo: true
    }
  },
  {
    path: '/machine',
    name: 'machine',
    component: machine,
    meta: {
      title: '附近的售货机',
      tabbar: true
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: home,
    meta: {
      title: '电商',
      tabbar: true,
      topinfo: true
    }
  },
  {
    path: '/tabbar/shopcar',
    name: 'tabbar-shopcar',
    component: shopcar,
    meta: {
      title: '购物车',
      tabbar: true,
      topinfo: true
    }
  },
  {
    path: '/shop/car',
    name: 'shop-car',
    component: shopcar,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/store/list',
    name: 'store-list',
    component: storeList,
    meta: {
      title: '选择店铺'
    }
  },
  {
    path: '/class/goods',
    name: 'class-goods',
    component: classGoods,
    meta: {
      title: '类别商品'
    }
  },
  {
    path: '/goods/search',
    name: 'goods-search',
    component: goodsSearch,
    meta: {
      title: '搜索商品'
    }
  },
  {
    path: '/goods/info',
    name: 'goods-info',
    component: goodsInfo,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay,
    meta: {
      title: '支付'
    }
  },
  {
    path: '/pay/result',
    name: 'pay-result',
    component: payResult,
    meta: {
      title: '支付结果'
    }
  },
  {
    path: '/tabbar/me',
    name: 'tabbar-me',
    component: me,
    meta: {
      title: '个人中心',
      tabbar: true
    }
  },
  {
    path: '/me',
    name: 'me',
    component: me,
    meta: {
      title: '个人中心',
      home: true
    }
  },
  {
    path: '/me/info',
    name: 'me-info',
    component: meInfo,
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/order/pre',
    name: 'order-pre',
    component: orderPre,
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/order/pay',
    name: 'order-pay',
    component: orderPay,
    meta: {
      title: '支付订单'
    }
  },
  {
    path: '/order/result',
    name: 'order-rsult',
    component: orderResult,
    meta: {
      title: '下单成功'
    }
  },
  {
    path: '/order/list',
    name: 'order-list',
    component: orderList,
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/address',
    name: 'address',
    component: address,
    meta: {
      title: '地址管理'
    }
  },
  {
    path: '/address/add',
    name: 'address-add',
    component: addressAdd,
    meta: {
      title: '添加新地址'
    }
  },
  {
    path: '/address/slter',
    name: 'address-slter',
    component: addressSlter,
    meta: {
      title: '选择收货地址'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: join,
    meta: {
      title: '招商加盟'
    }
  },
  {
    path: '/grade',
    name: 'grade',
    component: grade,
    meta: {
      title: '会员等级'
    }
  },
  {
    path: '/redpack',
    name: 'redpack',
    component: redpack,
    meta: {
      title: '我的红包'
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: favorite,
    meta: {
      title: '我的收藏'
    }
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: wallet,
    meta: {
      title: '我的钱包'
    }
  },
  {
    path: '/wallet/bill',
    name: 'wallet-bill',
    component: walletBill,
    meta: {
      title: '钱包明细'
    }
  },
  {
    path: '/wallet/cash',
    name: 'wallet-cash',
    component: walletCash,
    meta: {
      title: '提现'
    }
  },
  {
    path: '/wallet/recharge',
    name: 'wallet-recharge',
    component: walletRecharge,
    meta: {
      title: '充值'
    }
  },
  {
    path: '/wallet/recharge2',
    name: 'wallet-recharge2',
    component: walletRecharge2,
    meta: {
      title: '充值'
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: feedback,
    meta: {
      title: '意见反馈'
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
    meta: {
      title: '系统设置'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
      regbtn: true
    }
  },
  {
    path: '/register1',
    name: 'register1',
    component: register1,
    meta: {
      title: ''
    }
  },
  {
    path: '/register2',
    name: 'register2',
    component: register2,
    meta: {
      title: '快速注册'
    }
  },
  {
    path: '*',
    name: '404',
    component: page404,
    meta: {
      title: '404'
    }
  }
]

export default routes