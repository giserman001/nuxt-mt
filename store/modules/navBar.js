const state = {
  list: [],
}
const getters = {
  list: (state) => state.list,
}
const mutations = {
  add(state, text) {
    state.list.push(text)
  },
}

const actions = {
  add({ commit }, text) {
    commit('add', text)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
