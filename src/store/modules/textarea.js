const textareaHtml = {
	state:{
		contentList:[]
	},
	mutations:{
		UPDATE_TEXTAREA_HTML:(state,contentObj)=>{
			for (const [i, v] of state.contentList.entries()) {//entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
		        if (v.path === contentObj.path) {
		          state.contentList.splice(i, 1)
		          break
		        }
		    }
			state.contentList.push(Object.assign({},contentObj));			
		}
	},
	actions:{
		updateTextareaHtml({commit,state},contentObj){
			commit('UPDATE_TEXTAREA_HTML',contentObj);
		},
	}	
}


export default textareaHtml