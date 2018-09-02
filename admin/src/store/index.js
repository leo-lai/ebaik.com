import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import app from './app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app
  },
  getters: {
    userInfo: state => state.user.info,
    shopAuth: state => state.user.shopAuth,
    fullscreen: state => state.app.fullscreen,
    collapse: state => state.app.collapse
  }
})

export default store
