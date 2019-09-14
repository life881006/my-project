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
	},
	watch: {
		mainContentHeight: function (val) {
			this.treeHeight = val - 25 + "px";
		}
	}
}
