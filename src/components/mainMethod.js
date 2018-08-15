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
			return new Promise((resolve,reject)=>{//加载分页信息
				this.axios({
		            method: 'post',
		            url: transmitObj.url,
		            data: this.getData(transmitObj.api,transmitObj.handler,pageObj),
		            dataType: 'JSON'						 
		        }).then((result)=> {
		        	let paginationInfo = result.data.data;
		        	resolve(paginationInfo);
		        }).catch((error)=> {
		        	console.log(error);
		        });
			});
		}
	},
	watch:{
		mainContentHeight(val){
			this.mainTableHeight = val+"px";
			this.treeHeight = val+50+"px"
		},		
	}
	
}
