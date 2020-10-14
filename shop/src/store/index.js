import Vue from 'vue'
import Vuex from 'vuex'
import { utils, storage } from '@/assets/utils'
import { fetch } from '@/api'

Vue.use(Vuex)

// 尝试获取本地是否存在localData变量，第一次启动APP时是不存在的
let localData = storage.local.get('localData') || {}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let stateLocalKeys = ['token', 'userInfo']
const store = new Vuex.Store({
  state: {
    loading: false,
    scrollTop: 0,
    direction: 'forward',
    // 如果上面从本地获取的localData对象下有对应的属性，就赋值给state中对应的变量
    token: localData.token || null,
    userInfo: localData.userInfo || null,
    openId: '',
    organId: ''
  },
  getters: {
    loading: state => state.loading,
    scrollTop: state => state.scrollTop,
    direction: state => state.direction
  },
  mutations: {
    setState(state, payload = { name: '', value: '' }) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split('.')
      let saveKey = ''
      let len = nameArr.length
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]]
        }
        obj[nameArr[len - 1]] = payload.value
        saveKey = nameArr[0]
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value
        saveKey = payload.name
      }

      // 判断变量名是否在需要存储的数组中
      if (stateLocalKeys.indexOf(saveKey) != -1) {
        // 获取本地存储的localData对象，将变量添加到对象中
        localData[saveKey] = state[saveKey]
        // 执行这一步后，所有需要存储的变量，都挂载在本地的localData对象中
        storage.local.set('localData', localData)
      }
    },
    updateLoading(state, payload) {
      state.loading = payload.loading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    },
    updateScrollTop(state, payload) {
      state.scrollTop = payload.top
    }
  },
  actions: {
    logout({ commit }, payload) {
      // 请求接口，使token失效
      commit('setState', { name: 'token', value: null })
      commit('setState', { name: 'userInfo', value: null })
      return Promise.resolve()
    },
    getUserInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let organId = storage.session.get('organId')
        let openId = storage.session.get('openId')
        let getInfo = function() {
          return fetch.json('/sys-authcenter/user/findCustomerInfo', { organId, openId }).then(({data}) => {
            if (data.customer) {
              data.customer.total = Number(data.customer.balance) + Number(data.customer.giveIntegral)
              data.customer.balance = Number((data.customer.balance / 100).toFixed(2))
              data.customer.giveIntegral = Number((data.customer.giveIntegral / 100).toFixed(2))
              if (data.customer.organName) {
                utils.setTitle(data.customer.organName)
              }
            }
            commit('setState', { name: 'userInfo', value: data.customer })
            return data.customer
          })
        }
        getInfo().then(userInfo => {
          if (userInfo) {
            resolve(userInfo)
          } else { // 如果没有查询到会员信息，那就新增会员
            fetch.json('/sys-authcenter/user/addStoredCustomer', { 
              organId, 
              wxopenId: openId 
            }).then(({ data }) => {
              if (data.customerId){ // 新增成功，重新获取会员信息
                resolve(getInfo())
              }else{
                reject({ message: '获取会员信息失败' })
              }
            }).catch(reject)
          }
        }).catch(reject)
      })
    },
  }
})

export default store
