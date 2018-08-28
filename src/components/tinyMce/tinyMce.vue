<template>
	<textarea name="tinyMce" :id="MceEl" :ref="MceEl"></textarea>
</template>

<script>
	
	import plugins from './plugins'
	import styleFormats from './styleFormats'
	import toolBar from './toolBar'
	
	export default {
		name:this.MceEl,
		data(){
			return {
				MceEl:this.tinyMce,
				textHtml:"",
				
			}
		},
		mounted(){
			if(this.$store.state.textarea.contentList.length!=0){
				const filledContent = this.$store.state.textarea.contentList;
				for(let item of filledContent){
					if(item.path===this.$router.history.current.path){
						this.textHtml = item.content;						
					}
				}
			};
			this.tinyMceInit();
		},
		activated() {
			this.tinyMceInit()
		},
		deactivated() {
			this.destroyTinyMce()
		},
		props : ['tinyMce'],
		mixins : [],
		components : {},
		methods : {
			
			tinyMceInit(){
				const _this = this;
				tinymce.init({
					selector:"#"+this.MceEl,
					language: "zh_CN",
					images_upload_url: 'postAcceptor.php',//图片上传
					images_upload_base_path: '/some/basepath',//图片上传
					images_upload_credentials: true,//图片上传
				 	image_caption: true,//图片标题
		        	font_formats: "Andale Mono=andale mono,times;"+    //此处为初始默认字体样式，可不写
		             "Arial=arial,helvetica,sans-serif;"+
		             "Arial Black=arial black,avant garde;"+
		             "Times New Roman=times new roman,times;",
		         	plugins: plugins,
		         	toolbar: toolBar,
					style_formats: styleFormats,
					init_instance_callback:editor=>{
						if(_this.textHtml!=""){
							editor.setContent(_this.textHtml);
						}
					},
					//content_css: "/static/tinymce/css/content.css",另附内容样式
					setup: function(ed){//绑定tinymce方法
					 	ed.on("blur",function(){
					 		let content = ed.getContent();
					 		if(_this.textHtml != content){	
					 			_this.$notify({
						 			title:"通知",
						 			type:"success",
						 			message:"您编辑的文本内容已保存<br>刷新或关闭网页将重置文本",
						 			showClose:false,
						 			position:"botton-right",
						 			duration:3000
						 		});
						 		_this.setChanges(content);
					 		}
					 	});
					}
				});
			},
			getMceContent(){
				let content = tinymce.get(this.MceEl).getContent();
				return content;
			},
			destroyTinyMce(){
				if (window.tinymce.get(this.MceEl)) {
					window.tinymce.get(this.MceEl).destroy()
				}
				
		    },
		    setChanges(val){
		    	const currentPath = this.$router.history.current.path;
				let textareaObj = {"path":currentPath,"content":val};
				this.textHtml = val;
				this.$store.dispatch("updateTextareaHtml",textareaObj);
		    }
		},
		beforeDestroy(){
			
		},
		destroyed() {
		  this.destroyTinyMce()
		},
		watch : {
			tinyMce(val){
				this.MceEl = val; 
			}
		},
	}
</script>

<style>
	
</style>