<template>
	<div id="paginationComponent">
		<span>总计 {{tCount}} 条</span>
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="cPage"
	      :page-size="ePage"
	      layout=" prev, pager, next, jumper"
	      :total="tCount">
	    </el-pagination>
	    <el-input id="everpageNumber" size="mini" :value="defaultEPage" maxlength="5" @blur="setEveryPage">
			<template slot="prepend">每页/条</template>
		</el-input>
		
    </div>
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
		},
		setEveryPage(){
			console.log(this.defaultEPage);
			let inputEveryPage = Number(document.getElementById("everpageNumber").value);
			if(inputEveryPage===0){
				return false;
			}
			if(inputEveryPage>this.tCount){
				let h = this.$createElement;//elementUi创建html元素
				this.$message({
					//h:创建html元素，（）中第一个是html标签，第二个是样式模板，第二个是文本
					message:h('p',null,[
						h('span',null,'出现错误：'),
						h('i',{style:'color:red;font-weight:bolder'},'您输入每页条数超过总条数')
					])
				});
				document.getElementById("everpageNumber").value="";
				return false;
			}
			this.ePage = inputEveryPage;
			this.handleSizeChange(this.ePage);
		}
	},
	data() {
		return {
			tCount:this.totalCount,
			ePage:this.everyPage,
			cPage:this.currentPage,
			defaultEPage:this.everyPage,
		};
	},
	props:['totalCount','everyPage','currentPage'],
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
	}
}
</script>

<style scoped="scoped">
	.el-pagination{width:auto;text-align: right;padding:0px 5px;float:right}
	.el-input{width:140px;float:right}
	span{float:right;margin-right:5px;line-height: 2;font-weight:normal;font-size:14px;color:ddd}
</style>