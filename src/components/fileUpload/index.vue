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
				<div class="item" @mouseover="showEdit(item)" @mouseleave="hideEdit(item)">
					<a class="itemText">{{item.name}}</a>
					<el-button type='text' v-show="item.showEditButton" icon="el-icon-edit"></el-button>
				</div>
				
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
					{showEditButton:false,uid:'1',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'2',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'3',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'4',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'5',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'6',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'7',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'8',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'},
					{showEditButton:false,uid:'9',name:']0K$3KHAKE7TNTM}65Q$SL0.png',fileSize:'43791',fileType:'png',saveUrl:'/allWeb/huixue/news/2018/9/',newFileName:'20180920154006_667.png'}
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
				item.showEditButton = true;
			},
			hideEdit(item){
				item.showEditButton = false;
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
				
			
			.item
				font-size:12px
				width:100%
				
				display:inline-flex
				
				
				.itemText
					width:140px
					white-space: nowrap
					overflow: hidden
					text-overflow: ellipsis
</style>