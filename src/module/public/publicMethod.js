export default {//主表公共函数，mixins到module各组件中
	methods: {
		toggleSelection(rows) {
			if (rows) {
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
		deleteThis(index, row) {//删除主表记录
			this.tableData3.splice(index, 1);
		},
		getPageSize(pageSize) {//获取每页条数
			this.ePage = pageSize;
		},
		getCurrentPage(cPage) {//获取当前页码
			this.cPage = cPage;
		},
		getPageData(pageObj, transmitObj) {
			let page = pageObj;
			let api = transmitObj.api;
			let handler = transmitObj.handler;
			return new Promise((resolve, reject) => {//加载分页信息
				this.axios._get({
					url: transmitObj.url,
					api: api,
					handler: handler
				}, page).then(data => {
					resolve(data);
				})
			});
		}
	},
	watch: {
		mainContentHeight: function (val) {
			this.treeHeight = val - 25 + "px";
		}
	}

}
