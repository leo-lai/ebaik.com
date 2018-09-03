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
          path: '/audit/list',
          meta: { menu: 'audit', title: '确认审核', icon: 'l-icon-03' },
          component: resolve => require(['../views/audit-list'], resolve)
        },
        {
          path: '/customer/list',
          meta: { menu: 'customer', title: '客户档案', icon: 'l-icon-04', },
          component: resolve => require(['../views/customer-list'], resolve)
        },
        {
          path: '/company/order',
          meta: { menu: 'company', title: '公司监管', icon: 'l-icon-07',},
          component: resolve => require(['../views/company-order'], resolve)
        },
        {
          path: '/company/customer',
          hidden: true,  // 不显示在左边菜单
          meta: { menu: 'company', title: '客户档案'},
          component: resolve => require(['../views/company-customer'], resolve)
        },
        {
          path: '/company/user',
          hidden: true,  // 不显示在左边菜单
          meta: { menu: 'company', title: '账号配置'},
          component: resolve => require(['../views/company-user'], resolve)
        },
        {
          path: '/user/pwd',
          meta: { menu: 'user', title: '账号管理', icon: 'l-icon-08',},
          component: resolve => require(['../views/user-pwd'], resolve)
        },
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

