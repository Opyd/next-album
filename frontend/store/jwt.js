import createPersistedState from 'vuex-persistedstate'

export const plugins = [
  createPersistedState({
    storage: window.sessionStorage,
  }),
]

export const state = () => ({
  token: '',
  login: '',
})

export const getters = {
  getToken(state) {
    return state.token
  },
  getLogin(state) {
    return state.login
  },
}

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setLogin(state, login) {
    state.login = login
  },
  logout(state) {
    state.login = null
    state.token = null
  },
}
