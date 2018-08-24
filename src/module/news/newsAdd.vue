<template>	
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="姓名">
			<el-input v-model="form.inputText1" placeholder="请输入内容"></el-input>			
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="form.inputText2" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<quill></quill>
		
		<el-col class="controll" :span='24'>
			<el-button icon="el-icon-success">提交</el-button>
		</el-col>
		
		
	</el-form>
</template>

<script>
	
	
	export default{
		data(){
			return {
				
				form:{
					inputText1:"laoli1",
					inputText2:"laoli2"
				},
				
			}
		},
		components:{quill},
		methods:{
			
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