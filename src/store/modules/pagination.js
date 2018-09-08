const pagination = {
	state: {
		currentPagination:{},
		paginationList:[],
	},
	mutations:{
		PAGINATION_ADD:(state,pagination)=>{
			if(state.paginationList.some(v => v.path === pagination.path)){
				for (const [i, v] of state.paginationList.entries()) {
					if(v.path===pagination.path){
						state.paginationList.splice(i, 1);
						state.paginationList.push(pagination);
						return false;
					}
				}
			};
			state.paginationList.push(Object.assign({},pagination));
		},
		GET_PAGINATION:(state,path)=>{
			for(let item of state.paginationList){
				if(path == item.path){
					state.currentPagination = item;
					break;
				}
			}
		}
	},
	actions:{
		paginationAdd({commit,state},pagination){
			commit('PAGINATION_ADD',pagination);
		},
		getPagination({commit,state},path){
			return new Promise((resolve,reject)=>{
				commit('GET_PAGINATION', path)
				resolve(state.currentPagination);
			})
		}
	}
}

export default pagination