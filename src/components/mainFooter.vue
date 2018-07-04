<template>
	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="cPage"
      :page-sizes="pSizes"
      :page-size="ePage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tCount">
    </el-pagination>
</template>

<script>
	
	export default {
	methods: {
		handleSizeChange(val) {
			this.ePage = val;
			//子组件给父组件传值
			this.$emit('pSize',val);
		},
		handleCurrentChange(val) {
			this.cPage = val;
			//子组件给父组件传值
			this.$emit('cPage',val);
		}
	},
	data() {
		return {
			tCount:this.totalCount,
			ePage:this.everyPage,
			cPage:this.currentPage,
			pSizes:this.pageSizes
		};
	},
	props:['totalCount','everyPage','currentPage','pageSizes'],
	watch:{
		currentPage(val){
			this.cPage=val;
		},
		everyPage(val){
			this.ePage=val;
		},
		totalCount(val){
			this.tCount=val;
		},
		pageSizes(val){
			this.pSizes=val;
		}
	}
}
</script>

<style scoped="scoped">
	.el-pagination{text-align: right;padding:0px 5px;}
</style>