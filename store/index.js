import Vue from 'vue'
import Vuex from 'vuex'

import city from './modules/city'
import navBar from './modules/navBar'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    modules: {
      city,
      navBar,
    },
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  })
