<template>
	<div class="searchBar">
		<el-select size="small" id="normalSelect" ref="normalSelect" v-model="normalSelectValue" placeholder="请选择" @change="selectorValue">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
		</el-select>
		<el-input class="searchText" size="small" placeholder="请输入内容" v-model="searchText" clearable></el-input>
		<el-button size="small" type="primary" icon="el-icon-search" @click="normalSearch">检索</el-button>
	</div>
</template>

<script>
	
	export default {
		name:"search",		
		data(){
			return {
				options: [{ //select内容
					value: "a.title",
					label: "标题",
				}, {
					value: "a.author",
					label: "作者",
				}, {
					value: "a.transfer",
					label: "来源",
				}],
				
				normalSelectValue: "", //select选择的值
				searchText: "", //搜索框内容
			}
		},
		created(){
			/**
			 * 获取搜索框保存的选择状态
			 */
			const searchList = this.$store.state.search.searchList;
			const currentPath = this.$router.history.current.path;
			for(let item of searchList) {
				if(currentPath === item.path) {
					this.searchText = item.searchText;
					this.normalSelectValue = item.normalSelect;
				}
			}
		},
		props:["whereStr"],
		methods : {
			selectorValue: function(value) {//搜索框条件选择
				let searchObj = {
					path: this.$router.history.current.path,
					normalSelect: value,
					searchText: this.searchText,
				}
				this.normalSelectValue = value; //选择框绑定值
				this.$store.dispatch('searchAdd', searchObj); //store保存选择的select对象
			},
			normalSearch(){
				if(this.normalSelectValue===""){
					this.$notify.info({
						title: '提示',						
						position: 'top-left',
						offset:-10,
				        message: '请选择查询类型',
					});
					this.$refs.normalSelect.focus();
					return false;
				}
				let whereStr = "";
				if(this.searchText===""){
					
				}else{
					whereStr +=" where "+this.normalSelectValue+" like '%"+this.searchText+"%'";
				}
				console.log(whereStr);
				this.$emit("refreshTabel",whereStr);//调用父组件刷新表格
			},
		},
		watch : {
			searchText: function(val) {
				if(val == undefined) {
					return false;
				}
				this.searchText = val;
				let searchObj = {
					path: this.$router.history.current.path,
					normalSelect: this.normalSelectValue,
					searchText: val,
				}
				this.$store.dispatch("searchAdd", searchObj);
			}
		},
		
	}
</script>
	
<style scoped="scoped">
	/*@import url('../../../style/headerNav.css');*/
	.search{margin-bottom:15px;}
	.searchText{width: 180px;}
	
	#normalSelect{width:120px}
</style>