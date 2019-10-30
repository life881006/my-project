const search = {
  state: {
    currentSearch: {},
    searchList: []
  },
  mutations: {
    SEARCH_ADD: (state, searchObj) => {
      for (const [i, v] of state.searchList.entries()) { // entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
        if (v.path === searchObj.path) {
          state.searchList.splice(i, 1)
          break
        }
      }
      state.searchList.push(Object.assign({}, searchObj))
    },
    GET_CURRENT_SEARCH: (state, path) => {
      for (let item of state.searchList) {
        if (path === item.path) {
          state.currentSearch = item
          break
        }
      }
    }
  },
  actions: {
    searchAdd ({ commit, state }, searchObj) {
      commit('SEARCH_ADD', searchObj)
    },
    getCurrentSearch ({ commit, state }, path) {
      return new Promise((resolve, reject) => {
        commit('GET_CURRENT_SEARCH', path)
        resolve(state.currentSearch)
      })
    }
  }
}

export default search
