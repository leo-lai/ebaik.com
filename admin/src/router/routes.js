import defaultLayout from '@/layout/default'
import topLayout from '@/layout/top'

// 左边菜单
export const menus = {
  admin: [
    {
      path: '/',
      component: defaultLayout,
      children: [
        {
          path: '',
          hidden: true,
          meta: { title: '首页' },
          redirect: '/order/list'
        },
        {
          path: '/order/list',
          meta: { menu: 'order', title: '我的订单', icon: 'l-icon-03' },
          component: resolve => require(['../views/order-list'], resolve)
        },
        {
          path: '/shop/list',
          meta: { menu: 'shop', title: '确认审核', icon: 'l-icon-02' },
          component: resolve => require(['../views/shop-list'], resolve)
        },
        {
          path: '/user/list',
          meta: { menu: 'user', title: '客户档案', icon: 'l-icon-04', },
          component: resolve => require(['../views/user-list'], resolve)
        },
        {
          path: '/finance',
          meta: { menu: 'finance', title: '公司监管', icon: 'l-icon-06',},
          component: resolve => require(['../views/pay-list'], resolve)
        },
        {
          path: '/finance1',
          meta: { menu: 'finance', title: '账号管理', icon: 'l-icon-06',},
          component: resolve => require(['../views/pay-list'], resolve)
        },
      ]
    },
    {
      path: '/',
      component: defaultLayout,
      children: [
        {
          path: '/me',
          meta: { title: '个人中心' },
          component: resolve => require(['../views/me'], resolve)
        }
      ]
    },
  ],
}

export const routes = [
  {
    path: '/',
    component: topLayout,
    children: [
      {
        path: '/login',
        meta: { title: '登录', auth: false },
        component: resolve => require(['../views/login'], resolve)
      },
      {
        path: '/forgot',
        meta: { title: '重置密码', auth: false },
        component: resolve => require(['../views/forgot'], resolve)
      },
      {
        path: '/register',
        meta: { title: '注册', auth: false },
        component: resolve => require(['../views/register'], resolve)
      },
      {
        path: '/403',
        meta: { title: '无权限访问', auth: false },
        component: resolve => require(['../views/403'], resolve)
      },
      {
        path: '/404',
        meta: { title: '找不到页面', auth: false },
        component: resolve => require(['../views/404'], resolve)
      },
    ]
  },
  { path: '*', redirect: '/404', auth: false }
]

