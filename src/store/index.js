import Vue from 'vue'
import Vuex from 'vuex'
import navStore from './nav/navStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navStore: navStore.nav
  }
})
