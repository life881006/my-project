<template>	
	<el-form ref="form" :model="form" label-width="80px">
		<el-form-item label="姓名">
			<el-input v-model="form.inputText1" placeholder="请输入内容"></el-input>			
		</el-form-item>
		<el-form-item label="姓名">
			<el-input v-model="form.inputText2" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		
		<editor ref="content" :tinyMce="newsContent"></editor>
		<el-col class="controll" :span='24'>
			<el-button icon="el-icon-success" @click="getEditorContent">提交</el-button>
		</el-col>
		<div id="editorContent" >
			
		</div>
	</el-form>
</template>

<script>
	
	import editor from "@/components/tinyMce/tinyMce"
	
	export default{
		data(){
			return {
				form:{
					inputText1:"laoli1",
					inputText2:"laoli2"
				},
				newsContent:"newsTinyMce",
				editorText:"",
			}
		},
		components:{editor},
		methods:{
			getEditorContent(){
				this.editorText = this.$refs.content.getMceContent();//获取文本编辑器内容
				/*
				 点击提交后删除已保存到的textarea内容
				 */
				const currentPath = this.$router.history.current.path;
				this.$store.dispatch("dropTextarea",currentPath);
			}
		},
		mounted:function(){
			
		}
	}
</script>

<style>
	#addTable{overflow-y:auto;}
	.el-table-column{width:33%;}
	.controll{text-align: center;}
	
</style>