<template>
	<el-col :xs="7" :sm="7" :md="7" :lg="7">
		<el-button-group>
			<el-button type="danger" size="small" @click="deleteItems">删除</el-button>
			
		</el-button-group>
	</el-col>
</template>

<script>
	export default {
		name:"operations",//批量操作区域
		data(){
			return {
				selectedItem:this.selectedData
			}
		},
		props:['selectedData'],
		methods:{
			deleteItems(){
				if(this.selectedItem.length===0){
					this.$message({
						message:"请选择要删除的文章",
						type:"error"
					})
					return false
				}
				
				const p = {};
				p.array = this.selectedItem;
				p.tableName = "news";

				this.axios.deletes(p).then(data=>{
					this.$emit("refreshTableOperation");
				});
			},
		},
		
		watch:{
			selectedData(val){
				this.selectedItem = val;
			}
		}
	}
</script>

<style>
</style>