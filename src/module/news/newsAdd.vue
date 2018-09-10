<template>	
	<el-form ref="form" :model="form" :rules="rules" label-width="80px">
		<el-form-item label="标题" :rules="filter_inputs('required,space,email')" prop="inputText1">
			<el-input v-model="form.inputText1" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<el-form-item label="正文">
			<editor ref="content" :tinyMce="tinyMceParams"></editor>
		</el-form-item>
		
		<el-form-item label="文章类型" :rules="filter_inputs('required,space,length_1_3')" prop="inputText2">
			<el-input v-model="form.inputText2" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<el-col class="controll" :span='24'>
			<el-button icon="el-icon-success" @click="getEditorContent">提交</el-button>
		</el-col>
	</el-form>
</template>

<script>
	
	//引入编辑器
	import editor from "@/components/tinyMce/tinyMce"
	
	export default{
		data(){
			return {
				rules:{
					inputText1:[
						{min:3,max:5,message:"长度在3-5之间",trigger:"blur"},
					]
				},//表单追加验证
				form:{
					inputText1:"",
					inputText2:""
				},
				tinyMceParams:{//编辑器参数设置
					name:"newsTinyMce",
					width:"100%",
					height:"200px",
					plugins:[],//编辑器插件,不填写加载默认插件
					toolBar:[],//工具栏图标显示，不填写加载默认图标
					styleFormats:[],//文本编辑器中内容样式
					isShowMenuBar: true,//是否显示菜单栏
				},
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