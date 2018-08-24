export default {//主表公共函数，mixins到module各组件中
	methods: {
		toggleSelection(rows) {
			if(rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {//获取多选条数
			this.multipleSelection = val;
		},
		deleteThis(index,row){//删除主表记录
			this.tableData3.splice(index,1);
		},
		getPageSize(pageSize){
			this.ePage=pageSize;
		},
		getCurrentPage(cPage){
			this.cPage = cPage;
		},
		getPageData(pageObj,transmitObj){
			let page = pageObj;
			let api = transmitObj.api;
			let handler = transmitObj.handler;
			return new Promise((resolve,reject)=>{//加载分页信息
				this.axios({
		            method: 'post',
		            url: transmitObj.url,
		            data: this.getData(api,handler,page),
		            dataType: 'JSON',
		            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
		        }).then((result)=> {
		        	resolve(result.data.data);
		        }).catch((error)=> {
		        	console.log(error);
		        });
			});
		}
	},
	watch:{		
		mainContentHeight:function(val){
				this.treeHeight = val - 25 + "px";
		}
	}
	
}
