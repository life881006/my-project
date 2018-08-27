import Vue from 'vue'
import Vuex from 'vuex'
import visitTags from './modules/visitTags'
import pagination from './modules/pagination'
import search from './modules/search'
import textarea from './modules/textarea'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{//状态集合
    visitTags,
    pagination,
    search,
    textarea
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