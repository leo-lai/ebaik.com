import home from '../pages/home'
import shopcar from '../pages/shopcar'
// const OrderPayRecord = () => import('../pages/order-pay-record').then(m => m.default)

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
  }
]

export default routes