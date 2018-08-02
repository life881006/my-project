import Vue from 'vue'
import Vuex from 'vuex'
import visitTags from './modules/visitTags'
import pagination from './modules/pagination'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{//状态集合
    visitTags,
    pagination
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