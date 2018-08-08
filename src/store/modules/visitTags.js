//保存点击记录状态
const visitTagsList = {
	state: {//store保存的状态，可以在不同组件之间调用
		visitedTags:[]
	},
	mutations: {//最终变更state
		ADD_VISITED_TAGS:(state,visited)=>{
			if(state.visitedTags.some(v => v.path===visited.path)) return;
			state.visitedTags.push(Object.assign({},visited,{
		      title: visited.meta.title || 'no-name'
		    }));
		},
		DELETE_SINGLE_TAG:(state,visited)=>{
			
			for (const [i, v] of state.visitedTags.entries()) {//entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
		        if (v.path === visited.path) {
		          state.visitedTags.splice(i, 1)
		          break
		        }
		    }
		}
	},
	actions: {//用于异步变更state
		addVistedTags({commit,state},visited){
			commit("ADD_VISITED_TAGS",visited);
		},
		deleteSingleTag({commit,state},visited){
			return new Promise((resolve) => {//异步处理actions
		       commit('DELETE_SINGLE_TAG', visited)
		       resolve([...state.visitedTags]);
		    })
		}
	}
}

export default visitTagsList