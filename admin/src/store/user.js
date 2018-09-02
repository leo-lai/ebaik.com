import { storage } from '@/assets/js/utils'
import api from '@/api/index'

const user = {
  state: {
    fetching: false,
    info: null,
    shopAuth: null,
  },
  mutations: {
    USER_INFO: (state, info = {}) => {
      storage.local.set('userInfo', info)
      state.info = info
    },
    SHOP_AUTH: (state, data = '') => {
      storage.local.set('shopState', data)
      state.shopAuth = data
    }
  },
  actions: {
    checkLogin ({ commit }) {
      return new Promise((resolve, reject) => {
        api.auth.checkLogin().then(isLogin => {
          if (isLogin) {
            let userInfo = storage.local.get('userInfo')
            commit('USER_INFO', userInfo)
            resolve(userInfo)
          } else {
            commit('USER_INFO', '')
            reject(new Error('未登录或登录失效'))
          }
        })
      })
    },
    login ({ commit }, formData) {
      return api.auth.login(formData).then(({ data }) => {
        storage.local.set('token', data.token)
        commit('USER_INFO', data)
        return data
      })
    },
    logout ({ commit }) {
      return api.auth.logout().then(() => {
        commit('USER_INFO', '')
      })
    },
    getUserInfo({ commit }) {
      return api.auth.getInfo().then(({data}) => {
        commit('USER_INFO', data)
      })
    },
    getShopInfo({ commit }) {
      return api.shop.getInfo().then(({data}) => {
        commit('SHOP_AUTH', data.state === 2 && data.status === 10)
        return data
      })
    }
  }
}

export default user
