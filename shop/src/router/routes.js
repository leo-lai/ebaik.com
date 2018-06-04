import home from '../pages/home'
import shopcar from '../pages/shopcar'
import me from '../pages/me'
const meInfo = () => import('../pages/me-info').then(m => m.default)
const orderList = () => import('../pages/order-list').then(m => m.default)
const register1 = () => import('../pages/register1').then(m => m.default)
const register2 = () => import('../pages/register2').then(m => m.default)
const login = () => import('../pages/login').then(m => m.default)
const join = () => import('../pages/join').then(m => m.default)
const grade = () => import('../pages/grade').then(m => m.default)
const wallet = () => import('../pages/wallet').then(m => m.default)
const walletBill = () => import('../pages/wallet-bill').then(m => m.default)
const walletCash = () => import('../pages/wallet-cash').then(m => m.default)
const walletRecharge = () => import('../pages/wallet-recharge').then(m => m.default)
const favorite = () => import('../pages/favorite').then(m => m.default)
const feedback = () => import('../pages/feedback').then(m => m.default)
const address = () => import('../pages/address').then(m => m.default)
const setting = () => import('../pages/setting').then(m => m.default)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '首页',
      tabbar: true
    }
  },
  {
    path: '/shopcar',
    name: 'shopcar',
    component: shopcar,
    meta: {
      title: '购物车',
      tabbar: true
    }
  },
  {
    path: '/me',
    name: 'me',
    component: me,
    meta: {
      title: ''
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
    path: '/order/list',
    name: 'orderList',
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
  }
]

export default routes