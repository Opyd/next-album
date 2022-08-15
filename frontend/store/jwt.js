export const plugins = []

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
  isLogged(state) {
    return !!state.token
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
