<template>
	<textarea name="tinyMce" rows="1" cols="1" :id="MceEl" :ref="MceEl"></textarea>
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
			console.log(this.$store.state.textareaHtml.contentList);
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
					//content_css: "/static/tinymce/css/content.css",另附内容样式
					setup: function(ed){//绑定tinymce方法
					 	ed.on("blur",function(){
					 		let content = ed.getContent();			 		
					 		_this.setChanges(content);
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
		    	let currentPath = this.$router.history.current.path;
				let textareaObj = {"path":currentPath,"content":val};
				console.log(val);
				this.$store.dispatch("updateTextareaHtml",textareaObj);
		    }
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