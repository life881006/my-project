<template>
	<el-col :xs="8" :sm="8" :md="8" :lg="8">
		<el-button-group>
			<el-button type="danger" size="small">删除</el-button>
			<el-button type="primary" size="small">排序</el-button>
		</el-button-group>
		<el-dropdown trigger="click">
			<el-button size="small">审核</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>
					<a @click="aaa()"><i class="el-icon-erp-pass"></i> 审核通过</a>
				</el-dropdown-item>
				<el-dropdown-item>
					<a @click="bbb()"><i class="el-icon-erp-notPass"></i> 审核不通过</a>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-col>
</template>

<script>
	export default {
		
		data(){
			return {
				selectedItem:this.selectedData
			}
		},
		props:['selectedData'],
		methods:{
			aaa(){
				//对数据进行操作，调用刷新表格事件
				this.$emit("refreshTabel");
			},
			bbb(){
				
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