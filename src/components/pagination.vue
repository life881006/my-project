<template>
	<div class="paginationComponent">
		<span>总计 {{tCount}} 条</span>
		<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="cPage"
	      :page-size="ePage"
	      layout=" prev, pager, next, jumper"
	      :total="tCount">
	    </el-pagination>
	    <el-input id="everpageNumber" size="mini" :value="ePage" maxlength="5" @blur="setEveryPage">
			<template slot="prepend">每页/条</template>
		</el-input>
    </div>
</template>

<script>
	let pageList;
	let currentPath;
	
	export default {
	data() {
		return {
			tCount:0,
			ePage:0,
			cPage:0,
		};
	},
	created(){
		pageList = this.$store.state.pagination.paginationList;
		currentPath = this.$router.history.current.path;
		for(let item of pageList){
			if(item.path === currentPath){
				this.tCount=item.totalCount;
				this.ePage=item.everyPage;
				this.cPage=item.currentPage;
				return false;
			}
		}
	},
	/*
	props:['totalCount','everyPage','currentPage'],
	*/
	methods: {
		handleSizeChange(val) {
			this.ePage = val;
			this.$emit('pSize',val);//子组件给父组件传值
		},
		handleCurrentChange(val) {
			this.cPage = val;
			for(let item of pageList){
				if(item.path === currentPath){
					item.currentPage=val;
					this.$emit('cPage',val);//子组件给父组件传值
					return false;
				}
			}
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
			
			for(let item of pageList){
				if(item.path === currentPath){
					this.ePage=inputEveryPage;
					item.everyPage=inputEveryPage;
					this.handleSizeChange(inputEveryPage);
					return false;
				}
			}
		}
	},
	watch:{
		
	}
}
</script>

<style scoped="scoped">
	>>>.el-pagination__jump{margin-left:10px;}
	>>>.el-input-group__prepend{padding:0px 5px;}
	>>>#everpageNumber{text-align: center;padding:0px 5px;}
	>>>.el-pager li{min-width: 30.5px;}
	.paginationComponent{padding-top:2px;display: inline-block;float:right}
	.el-pagination{width:auto;text-align: right;padding:0px 5px;float:right}
	.el-input{width:90px;float:right;}
	.el-pager li{min-width:30.5px;}
	span{float:right;margin-right:5px;line-height: 2;font-weight:normal;font-size:14px;color:ddd}
	
</style>