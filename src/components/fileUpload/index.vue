<template>
	<el-upload 
	  drag 
	  :data="Data" 
	  :action="baseConfig.url_base2" 
	  :on-success="fileUploadSuccess" 
	  :on-remove="removeAnnexItem"
	  multiple>
	  <i class="el-icon-upload"></i>
	  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
	  <div class="el-upload__tip" slot="tip"></div>
	</el-upload>
</template>

<script>
	
	export default {
		name:"upload",		
		data(){
			return {
				Data:this.uploadData,
			}
		},
		props : ['uploadData'],
		mixins : [],
		components : {},
		methods : {			
			fileUploadSuccess(response, file, fileList){
				const p = response.data;
				p.fbScheme = this.unitConfig.fbScheme;
				p.fbIp = this.unitConfig.fbIp;
				p.fbPort = this.unitConfig.fbPort;
				p.fbName = this.unitConfig.fbName;
				p.fbRootPath = this.unitConfig.fbRootPath; 
				this.transferFile(p);
			},
			removeAnnexItem(file, fileList){
				
			},
			transferFile(p){
				this.axios({
					method:'post',
					url:this.baseConfig.url_transferFile,
					data: this.getData("HX_API",this.Data.addAnnexHandle,p),
					dataType:"json",
				}).then((result)=>{
					const filePathObj = result.data.data;			
					p.contextPath = filePathObj.contextPath;
					p.storageLocation = filePathObj.storageLocation; 
					this.addAnnex(p);
				}).catch((error)=>{
					console.log(error);					
				});	
			},
			addAnnex(p){
				const annex = new Object();
				annex.newsId = "";
				annex.annexName = p.fileName; 
				annex.fileType = p.fileType;
				annex.fileSize = p.fileSize; 
				annex.dirName = p.dirName;
				annex.contextPath = p.contextPath; 
				annex.saveUrl = p.saveUrl; 
				annex.newFileName = p.newFileName; 
				annex.originalFileName = p.newFileName; 
				
				this.axios({
					method:'post',
					url:this.baseConfig.url_base,
					data: this.getData("HX_API",this.Data.addAnnexHandle,annex),
					dataType:"json",
				}).then((result)=>{
					const fileId = result.data.data;			
					this.$emit("getUploadedAnnex",fileId);
				}).catch((error)=>{
					console.log(error);					
				});	
				
			}
		},
		watch : {
			
		},
		
	}
</script>

<style>
</style>