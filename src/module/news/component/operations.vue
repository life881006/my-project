<template>
	<el-col :xs="8" :sm="8" :md="8" :lg="8">
		<el-button-group>
			<el-button type="danger" size="small" @click="deleteItems">删除</el-button>
			<el-button size="small" @click="setTop(1)">置顶</el-button>
			<el-button size="small" @click="setTop(0)">撤销置顶</el-button>
		</el-button-group>
		<el-dropdown trigger="click">
			<el-button size="small" icon="">审核<i class="el-icon-arrow-up el-icon--right"></i></el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="auditNews(1)">
					<a><i class="el-icon-erp-pass"></i>初审通过</a>
				</el-dropdown-item>
				<el-dropdown-item @click.native="auditNews(0)">
					<a><i class="el-icon-erp-notPass"></i>撤销初审</a>
				</el-dropdown-item>
				<el-dropdown-item @click.native="auditNews(2)">
					<a><i class="el-icon-erp-pass"></i>终审通过</a>
				</el-dropdown-item>
				<el-dropdown-item @click.native="auditNews(1)">
					<a><i class="el-icon-erp-notPass"></i>撤销终审</a>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
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
				ids=ids.substring(0,ids.lenght-1);
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
			auditNews(status){
				if(this.selectedItem.length===0){
					this.$message({
						message:"请选择文章",
						type:"error"
					})
					return false
				}
				let ids = "";
				for(const item of this.selectedItem){
					ids += "'"+item.id+"',";
				}
				ids=ids.substr(0,ids.length-1);
				var p = {};
				p.sql = "update news set status='"+status+"' where id in ("+ids+")";
				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/exec.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					for(const item of this.selectedItem){
						item.status = status;
					}

		        }).catch((error)=>{
		        	console.log(error);

		        })
			},
			setTop(status){
				if(this.selectedItem.length===0){
					this.$message({
						message:"请选择文章",
						type:"error"
					})
					return false
				}
				let ids = "";
				for(const item of this.selectedItem){
					ids += "'"+item.id+"',";
				}
				ids=ids.substr(0,ids.length-1);
				var p = {};
				p.sql = "update news set isTop='"+status+"' where id in ("+ids+")";
				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/exec.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					for(const item of this.selectedItem){
						item.isTop = status;
					}

		        }).catch((error)=>{
		        	console.log(error);

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