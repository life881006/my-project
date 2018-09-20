<template>
	<div>
		<el-upload 
		  drag 
		  :data="Data" 
		  :action="Data.action" 
		  :on-success="fileUploadSuccess" 
		  :show-file-list="ifShowList" 
		  multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip"></div>
		</el-upload>
		<div class="el-fileUpload-list">
			<div class="annexItem" v-for="item in fileList">
				<el-button class="delete" type="text" icon="el-icon-close" @click="removeAnnexItem(item)"></el-button>
				<img v-if="item.fileType=='png'||item.fileType=='jpg'" width="160px" height="150px" :src="'http://192.168.100.106:8082'+baseConfig.webName+item.saveUrl+item.newFileName"></img>
				<a class="itemName" @mouseenter="showEdit(item)">{{item.name}}<el-button v-show="item.showEditButton" icon="el-icon-edit"></el-button></a>
				
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		name:"upload",
		data(){
			return {
				Data:this.uploadData,
				ifShowList:false,
				fileList:[
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'}
				]
			}
		},
		props : ['uploadData'],
		mixins : [],
		components : {},
		methods : {			
			fileUploadSuccess(response, file, fileList){
				const p = response.data;
				this.fileList = fileList;
				p.fbScheme = this.unitConfig.fbScheme;
				p.fbIp = this.unitConfig.fbIp;
				p.fbPort = this.unitConfig.fbPort;
				p.fbName = this.unitConfig.fbName;
				p.fbRootPath = this.unitConfig.fbRootPath; 
				this.transferFile(p);
			},			
			transferFile(p){
				this.axios({
					method:'post',
					url:this.baseConfig.url_transferFile,
					data: this.getData(this.Data.api,this.Data.addAnnexHandle,p),
					dataType:"json",
				}).then((result)=>{
					const filePathObj = result.data.data;
					p.contextPath = filePathObj.contextPath;
					p.storageLocation = filePathObj.storageLocation; 
					this.$emit("getUploadedAnnex",p);
				}).catch((error)=>{
					console.log(error);					
				});	
			},
			showEdit(item){
				item.showEditButton = true
			},
			removeAnnexItem(file, fileList){
				
			},
		},
		watch : {
			
		},
		
	}
</script>

<style scoped="scoped" lang="stylus">
	.el-fileUpload-list
		display:-webkit-flex
		display:flex
		flex-wrap:wrap
		justify-content:flex-start
		
		.annexItem
			width:160px
			padding:20px
			position:relative
			
			.delete
				position:absolute
				top:0px
				right:0px
				
			
			.itemName
				font-size:12px
</style>