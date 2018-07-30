import Vue from 'vue'
import Vuex from 'vuex'
import visitTags from './modules/visitTags'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    visitTags,
  },
  getters/*,
  mutations:{
    
  },
  actions:{
    increment({commit}){
      commit("INCREMENT")
    }
  }*/
})

export default store