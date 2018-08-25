<template>	
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="姓名">
			<el-input v-model="form.inputText1" placeholder="请输入内容"></el-input>			
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="form.inputText2" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<el-col class="controll" :span='24'>
			<el-button icon="el-icon-success">提交</el-button>
		</el-col>
		<editor api-key = '5oudb8r9lujc4gfbtfjoe956y6oo1b77truk484jq0kysuvs' :init="{plugins: 'wordcount'}"></editor>
		
	</el-form>
</template>

<script>
		
	import Editor from '@tinymce/tinymce-vue';
	
	export default{
		data(){
			return {
				form:{
					inputText1:"laoli1",
					inputText2:"laoli2"
				},
			}
		},
		components:{'editor':Editor},
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