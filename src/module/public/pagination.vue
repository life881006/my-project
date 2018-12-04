<template>
	<el-col :xs="17" :sm="17" :md="17" :lg="17">
		<div class="paginationComponent">
			<span>共{{page.totalCount}}条</span>
			<el-input id="everpageNumber" size="mini" onkeypress="return event.keyCode>=48&&event.keyCode<=57" :value="page.everyPage" maxlength="5" @blur="setEveryPage">
				<template slot="prepend">每页/条</template>
			</el-input>
			<el-pagination 
		      @current-change="handleCurrentChange"
		      :current-page="page.currentPage"
		      :page-size="page.everyPage"
		      :pager-count="5"
		      layout=" prev, pager, next, jumper"
		      :total="page.totalCount">
		   </el-pagination>
	    </div>
	</el-col>
</template>

<script>
	
	export default {
	name:"pagination",
	data() {
		return {
			page:this.pageObj,
			currentPath: this.$router.history.current.path,//当前路由
		};
	},
	created(){
		
	},
	props:['pageObj'],
	methods: {
		handleCurrentChange(val) {
			this.page.currentPage = val;
			for(let item of this.$store.state.pagination.paginationList){
				if(item.path === this.currentPath){
					item.currentPage=val;
					break;
				}
			}
			this.$emit('setCurrentPage',this.page);//子组件给父组件传值
		},
		setEveryPage(){
			let inputEveryPage = Number(document.getElementById("everpageNumber").value);
			
			if(inputEveryPage===0 || isNaN(inputEveryPage)){
				return false;
			}
			
			this.page.everyPage = inputEveryPage;
						
			let totalCount = this.page.totalCount;
			if(inputEveryPage>totalCount){
				this.$message({
					//h:创建html元素，（）中第一个是html标签，第二个是样式模板，第三个是文本
					message:'您输入每页条数超过总条数,请重新输入',
					type:'error'
				});
				document.getElementById("everpageNumber").value="";
				return false;
			}
			this.page.everyPage=inputEveryPage;
			for(let item of this.$store.state.pagination.paginationList){
				if(item.path === this.currentPath){
					item.everyPage=inputEveryPage;
					break;
				}
			}
			
			let maxPage = Math.ceil(totalCount/inputEveryPage);
			if(this.page.currentPage>maxPage){//设置每页条数后，如果当前页超过总页数，则设为最大总页数
				this.page.currentPage = maxPage;
			}
			this.$emit('setPageSize',this.page);//子组件给父组件传值
		}
	},
	watch:{
		pageObj:{
			handler(newValue, oldValue) {
		　　　　　　this.page = newValue
		　　　},
		　　　deep: true
		}
	}
}
</script>

<style scoped="scoped" lang="stylus">
	>>>.el-pagination__jump
		margin-left:10px
		
	>>>.el-input-group__prepend
		padding:0px 5px
		
	>>>#everpageNumber
		text-align: center
		padding:0px 5px
	>>>.el-pager
		li
			min-width: 30.5px
	.el-input
		width:90px
		float:left
		
	.paginationComponent
		padding-top:2px
		display: inline-block
		float:right
		
	.el-pagination
		width:auto
		text-align: right
		padding:0px 5px
		float:left
		
	span
		float:left
		margin-right:5px
		line-height: 2
		font-weight:normal
		font-size:14px
		color:#888
		
	@media only screen and (min-width: 100px) and (max-width: 1200px) 
		>>>.el-pager
			li 
			min-width: auto
			padding:0px 5px
			
		>>>.el-pagination__jump
			margin-left:5px
		
</style>