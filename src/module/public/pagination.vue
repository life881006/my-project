<template>
	<el-col :xs="16" :sm="16" :md="16" :lg="16">
		<div class="paginationComponent">
			<span>总计 {{childTotalCount}} 条</span>
			<el-input id="everpageNumber" size="mini" :value="childEveryPage" maxlength="5" @blur="setEveryPage">
				<template slot="prepend">每页/条</template>
			</el-input>
			<el-pagination 
		      @current-change="handleCurrentChange"
		      :current-page="childCurrentPage"
		      :page-size="childEveryPage"
		      layout=" prev, pager, next, jumper"
		      :total="childTotalCount">
		   </el-pagination>
	    </div>
	</el-col>
</template>

<script>
	
	export default {
	data() {
		return {
			childCurrentPage:this.currentPage,
			childEveryPage:this.everyPage,
			childTotalCount:this.totalCount
		};
	},
	created(){
		
	},
	props:['totalCount','everyPage','currentPage'],
	methods: {
		handleCurrentChange(val) {
			this.$emit('setCurrentPage',val);//子组件给父组件传值
		},
		setEveryPage(){
			let inputEveryPage = Number(document.getElementById("everpageNumber").value);
			if(inputEveryPage===0){
				return false;
			}
			if(inputEveryPage>this.tCount){
				let h = this.$createElement;//elementUi创建html元素
				this.$message({
					//h:创建html元素，（）中第一个是html标签，第二个是样式模板，第三个是文本
					message:h('p',null,[
						//h('span',null,'出现错误：'),
						h('i',{style:'color:red;font-weight:bolder'},'您输入每页条数超过总条数,请重新输入')
					])
				});
				document.getElementById("everpageNumber").value="";
				return false;
			}
			
			this.$emit('setPageSize',inputEveryPage);//子组件给父组件传值
		}
	},
	watch:{
		currentPage(val){
			this.childCurrentPage = val;
		},
		everyPage(val){
			this.childEveryPage = val;
		},
		totalCount(val){
			this.childTotalCount = val;
		}
	}
}
</script>

<style scoped="scoped">
	>>>.el-pagination__jump{margin-left:10px;}
	>>>.el-input-group__prepend{padding:0px 5px;}
	>>>#everpageNumber{text-align: center;padding:0px 5px;}
	>>>.el-pager li{min-width: 30.5px;}
	.paginationComponent{padding-top:2px;display: inline-block;float:right}
	.el-pagination{width:auto;text-align: right;padding:0px 5px;float:left}
	.el-input{width:90px;float:left;}
	span{float:left;margin-right:5px;line-height: 2;font-weight:normal;font-size:14px;color:#888}
	@media only screen and (min-width: 100px) and (max-width: 1200px) {
		>>>.el-pager li {
			min-width: auto;
			padding:0px 5px;
		}
		>>>.el-pagination__jump{margin-left:5px}
	}
</style>