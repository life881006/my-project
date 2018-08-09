export default {
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
			
			this.everyPage=pageSize;
		},
		getCurrentPage(cPage){
			this.currentPage = cPage;
		},
		
	},
	watch:{
		mainContentHeight(val){
			this.mainTableHeight = val+"px";
			this.treeHeight = val+50+"px"
		},		
	}
	
}
