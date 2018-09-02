import { storage } from '@/assets/js/utils'

const app = {
  state: {
    fullscreen: !!storage.local.get('fullscreen'),
    collapse: !!storage.local.get('collapse')
  },
  mutations: {
    TOGGLE_FULLSCREEN: (state, status) => {
      state.fullscreen = status === undefined ? !state.fullscreen : status
      storage.local.set('fullscreen', state.fullscreen)
    },
    TOGGLE_COLLAPSE: (state, status) => {
      state.collapse = status === undefined ? !state.collapse : status
      storage.local.set('collapse', state.collapse)
    }
  },
  actions: {
    toggleFullscreen ({ commit }, status) {
      commit('TOGGLE_FULLSCREEN', status)
    },
    toggleCollapse ({ commit }, status) {
      commit('TOGGLE_COLLAPSE', status)
    }
  }
}

export default app
