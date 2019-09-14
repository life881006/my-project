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
		UPDATE_TAG:(state,visited)=>{
			Array.from(state.visitedTags).forEach((item,index)=>{
				if(item.path == visited.path){
					state.visitedTags[index] = Object.assign({},visited,{
						title: visited.meta.title || 'no-name'
					})
					//item.title = visited.meta.title;
				}
			})
		},
		DELETE_SINGLE_TAG:(state,path)=>{
			for (const [i, v] of state.visitedTags.entries()) {//entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
		        if (v.path === path) {
		          state.visitedTags.splice(i, 1)
		          break
		        }
		    }
		},
		DELETE_OTHERS_TAG:(state,path)=>{
			let index = 0;
			for (const [i, v] of state.visitedTags.entries()) {//entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
		        if (v.path === path) {
		          state.visitedTags = [state.visitedTags[i]];
		          break
		        }
		    }
		},
		DELETE_ALL_TAG:(state)=>{
			let flag = false;
			for (const [i, v] of state.visitedTags.entries()) {//entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
				if (v.path.indexOf("/home")>=0) {
					state.visitedTags = [v];
					flag = true;
					break;
				}else{
				}
			}
			if(!flag){
					state.visitedTags = [state.visitedTags[0]];
			}
		}
	},
	actions: {//用于异步变更state
		addVistedTags({commit,state},visited){
			if(visited.name==="404"){
				return false;
			}
			commit("ADD_VISITED_TAGS",visited);
		},
		updateRouter({commit,state},visited){
			return new Promise((resolve) => {//异步处理actions
				commit('UPDATE_TAG', visited);
				resolve([...state.visitedTags]);
			})
		},
		deleteSingleTag({commit,state},path){
			return new Promise((resolve) => {//异步处理actions
		       commit('DELETE_SINGLE_TAG', path);
		       resolve([...state.visitedTags]);
		    })
		},
		deleteOthersTag({commit,state},path){
			return new Promise((resolve) => {//异步处理actions
			   commit('DELETE_OTHERS_TAG',path);
		       resolve([...state.visitedTags]);
		    })
		},
		deleteAllTags({commit,state}){
			return new Promise((resolve) => {//异步处理actions
			   commit('DELETE_ALL_TAG');
		       resolve([...state.visitedTags]);
		   })
		}
	}
}

export default visitTagsList