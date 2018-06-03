import home from '../pages/home'
import shopcar from '../pages/shopcar'
import me from '../pages/me'
const register1 = () => import('../pages/register1').then(m => m.default)
const register2 = () => import('../pages/register2').then(m => m.default)
const login = () => import('../pages/login').then(m => m.default)
const join = () => import('../pages/join').then(m => m.default)
const meInfo = () => import('../pages/me-info').then(m => m.default)

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
    path: '/join',
    name: 'join',
    component: join,
    meta: {
      title: '招商加盟'
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