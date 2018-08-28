const textarea = {
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
		},
		DROP_TEXTAREA:(state,path)=>{
			console.log(state.contentList);
			for (const [i, v] of state.contentList.entries()) {//entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
		        if (v.path === path) {
		          state.contentList.splice(i, 1)
		          break
		        }
		   }
		}
	},
	actions:{
		updateTextareaHtml({commit,state},contentObj){
			commit('UPDATE_TEXTAREA_HTML',contentObj);
		},
		dropTextarea({commit,state},path){
			commit('DROP_TEXTAREA',path);
		},
	}	
}


export default textarea