const pagination = {
	state: {
		paginationList:[]
	},
	mutations:{
		PAGINATION_ADD:(state,pagination)=>{
			if(state.paginationList.some(v => v.path === pagination.path)) return;
			state.paginationList.push(Object.assign({},pagination));
		},
		
	},
	actions:{
		paginationAdd({commit,state},pagination){
			commit('PAGINATION_ADD',pagination);
		},
	}
}

export default pagination