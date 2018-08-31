const pagination = {
	state: {
		currentPagination:{},
		paginationList:[],
	},
	mutations:{
		PAGINATION_ADD:(state,pagination)=>{
			if(state.paginationList.some(v => v.path === pagination.path)) return;
			state.paginationList.push(Object.assign({},pagination));
		},
		GET_PAGINATION:(state,path)=>{
			console.log(path);
			for(let item of state.paginationList){
				
				if(path == item.path){
					console.log(item);
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