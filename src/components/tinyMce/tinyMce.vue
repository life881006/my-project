<template>
	<textarea name="tinyMce" :id="MceEl.name" :ref="MceEl.name" style="border:1px solid #dcdfe6;border-radius:4px;box-shadow: none;"></textarea>
</template>

<script>
	
	import plugins from './plugins'
	import styleFormats from './styleFormats'
	import toolBar from './toolBar'
	import fontFormats from './font_formats'
	
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
					selector:"#"+this.MceEl.name,
					width:this.MceEl.width,
					height:this.MceEl.height,
					language: "zh_CN",
					images_upload_base_path: '/some/basepath',//返回图片的前缀
					images_upload_credentials: false,//图片上传
				 	image_caption: true,//图片标题
		        	font_formats: fontFormats,//字体库
		         	plugins: (this.MceEl.plugins.length===0?plugins:this.MceEl.plugins),//编辑器插件库
		         	toolbar: (this.MceEl.toolBar.length===0?toolBar:this.MceEl.toolBar),//工具栏库
					style_formats: (this.MceEl.styleFormats.length===0?styleFormats:this.MceEl.styleFormats),
					menubar: this.MceEl.isShowMenuBar,//是否显示头部菜单栏
					init_instance_callback:editor=>{
						if(_this.textHtml!=""){
							editor.setContent(_this.textHtml);
						}
					},
					//content_css: "/static/tinymce/css/content.css",另附内容样式
					setup: function(ed){//绑定tinymce方法
					 	ed.on("blur",function(){
					 		const content = ed.getContent();
					 		//const textContent = _this.$trim(ed.getContent({"format":"text"})); 
					 		if(_this.textHtml != content){	
					 			/*
					 			 * _this.$notify({
						 			title:"通知",
						 			type:"success",
						 			message:"您编辑的文本内容已保存,刷新或关闭网页将重置文本",
						 			showClose:false,
						 			position:"botton-right",
						 			duration:3000
						 		});						 		
						 		* 
						 		* */
						 		_this.setChanges(content);
					 		}
					 	});
					},
					images_upload_handler:(blobInfo, success, failure) => {//图片上传方法重新，官方示例
			            let xhr, formData;						
						    xhr = new XMLHttpRequest();
						    xhr.withCredentials = false;
						    xhr.open('POST', this.baseConfig.url_base2);
						    const _this = this;
						    xhr.onload = function() {
						      let json;						
						      if (xhr.status != 200) {
						        failure('HTTP Error: ' + xhr.status);
						        return;
						      }						
						      json = JSON.parse(xhr.responseText);						
						      //if (!json || typeof json.url != 'string') {
						      //  failure('Invalid JSON: ' + xhr.responseText);
						      //  return;
						      //}
						      let data = json.data;
						      success(_this.baseConfig.webName+data.saveUrl+data.newFileName);
						    };
						
						    formData = new FormData();
						    formData.append('rootPath','/allWeb/huixue/news');
						    formData.append('file', blobInfo.blob(), blobInfo.filename());
						    xhr.send(formData);
		            },
				});
			},
			getMceContent(){
				let textContent = this.$trim(tinymce.get(this.MceEl.name).getContent({"format":"text"}));
				
				let wholeContent = tinymce.get(this.MceEl.name).getContent();
				const contentObj = {text:textContent,html:wholeContent};
				return contentObj;
			},
			destroyTinyMce(){
				if (window.tinymce.get(this.MceEl.name)) {
					window.tinymce.get(this.MceEl.name).destroy()
				}
		    },
		    setChanges(val){
		    	const currentPath = this.$router.history.current.path;
				let textareaObj = {"path":currentPath,"content":val};
				this.textHtml = val;
				this.$store.dispatch("updateTextareaHtml",textareaObj);
		    },
		    claerMce(){
		    	tinymce.get(this.MceEl.name).setContent("");
		    	this.textHtml="";
		    }
		},
		beforeDestroy(){
			
		},
		destroyed() {
		  this.destroyTinyMce()
		},/*
		watch : {
			tinyMce:{
				handler(newValue, oldValue) {
			　　　　　　this.MceEl = newValue
			　　　},
			　　　deep: true
			}
		},*/
	}
</script>

<style>
	
</style>