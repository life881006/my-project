<template>
	<!--<el-table :data="addTable" id="addTable">
		<el-table-column prop="serialNumber" label="序号">
			
		</el-table-column>
		<el-table-column prop="name" label="姓名">
			
		</el-table-column>
		<el-table-column prop="address" label="地址">
			
		</el-table-column>
	</el-table>-->
	<el-form  ref="form" :model="form" label-width="80px">
		<el-form-item label="姓名">
			<el-input v-model="form.inputText1" placeholder="请输入内容"></el-input>			
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="form.inputText2" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		
			<el-col class="controll" :span='24'>
			<el-button icon="el-icon-success">提交</el-button>
			<el-button icon="el-icon-error" @click="close('/table')">关闭</el-button>
			</el-col>
	</el-form>
</template>

<script>
	export default{
		data(){
			return {
				addTable:[{
					serialNumber:"1",
					name:"试试1",
					address:"京口区"
				},{
					serialNumber:"2",
					name:"试试2",
					address:"润州区"
				},{
					serialNumber:"3",
					name:"试试3",
					address:"句容市"
				},{
					serialNumber:"4",
					name:"试试4",
					address:"丹徒"
				},{
					serialNumber:"5",
					name:"试试5",
					address:"扬中"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				},{
					serialNumber:"6",
					name:"试试6",
					address:"丹阳"
				}],
				form:{
					inputText1:"laoli1",
					inputText2:"laoli2"
				},
				
			}
		},
		methods:{
			close(path){
				this.$router.push(path);
			}
		},
		mounted:function(){
			
		}
	}
</script>

<style>
	#addTable{height:auto;overflow-y:auto;}
	.el-table-column{width:33%;}
	.controll{text-align: center;}
</style>