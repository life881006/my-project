<template>
	<el-col :xs="7" :sm="7" :md="7" :lg="7">
		<el-button-group>
			<el-button type="danger" @click="deleteItems">删除</el-button>
			<el-button type="primary" @click="setTop">置顶</el-button>
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
				
				this.$confirm('是否要删除记录？删除后将无法恢复', '提示',{
					confirmButtonText: '确定',
					showCancelButton:false,
					type: 'warning'
				}).then(()=>{
					let idsArr = this.selectedItem.map((element)=>{
						return element.id;
					});

					this.axios.delete("/news/deleteNews",{params:idsArr}).then(data=>{
						this.$emit("refreshTable");
					});
				}).catch(()=>{
					this.$message({
						message:"已取消",
						type:"info"
					})
				})
			},
			setTop(){
				if(this.selectedItem.length===0){
					this.$message({
						message:"请选择要置顶的文章",
						type:"error"
					})
					return false
				}
				let items = this.selectedItem.map(element=>{
					let item = {};
					item.isTop = element.isTop;
					item.id = element.id;
					return item;
				});

				this.axios.put("/news/setTop",items).then(data=>{
					this.$emit("refreshTableByPages");
				})
			}
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