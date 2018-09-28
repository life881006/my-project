<template>
	<el-col :xs="8" :sm="8" :md="8" :lg="8">
		<el-button-group>
			<el-button type="danger" size="small" @click="deleteItems">删除</el-button>
			
		</el-button-group>
	</el-col>
</template>

<script>
	export default {
		name:"operations",
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
				let ids = "";
				for(const item of this.selectedItem){
					ids += item.id+",";
				}
				ids=ids.substr(0,ids.length-1);
				const p={};
				p.ids = ids;
				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/deleteByIds.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
		        	this.$emit("refreshTableOperation");

		        }).catch((error)=>{
		        	console.log(error);

		        })
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