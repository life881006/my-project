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
			<div 
				class="annexItem" 
				@mouseover.native="item.hover=true" 
				@mouseleave.native="item.hover=false" 
				v-for="(item,index) in fileList">
				
				<div class="serialNumberArea">
					<span class="serialNumer">{{index+1}}</span>
				</div>
				
				<el-button 
					v-show="item.hover" 
					class="delete" 
					type="text" 
					icon="el-icon-close" 
					@click.native="removeAnnexItem(index)"></el-button>
					
				<div 
					:class="item.view?'coverViewDark':'coverViewLight'" 
					@mouseover.native="item.view=true" 
					@mouseleave.native="item.view=false" 
					@click.native="annexVisible=true;currentImg='http://hw.jshuixue.com'+baseConfig.webName+item.response.data.saveUrl+item.response.data.newFileName">
					
					<i class="el-icon-zoom-in"></i>
				</div>
								
				<img 
					width="260px" 
					height="150px"
					v-if="item.response.data.fileType=='png'||item.response.data.fileType=='jpg'" 
					:src="'http://hw.jshuixue.com'+baseConfig.webName+item.response.data.saveUrl+item.response.data.newFileName"></img>
				
				<template v-if="!item.edit">
					<div class="item" @click="editName(item)" >
						<a class="itemText">{{item.response.data.annexName}}</a>
						<el-button type='text' v-show="item.hover" icon="el-icon-edit"></el-button>
					</div>
				</template>
				<template v-else>
					<div class="item">
						<el-input class='editInput' size='small' v-model="item.response.data.annexName">
							
						</el-input>
						
						<el-button 
							class="editBtn"
							type="button"
							size="mini"
							v-model="item.response.data.annexName"
							@click.native="saveName(item)">保存</el-button>						
					</div>
					<span class="alertInfo">{{item.info}}</span>
				</template>
				
			</div>
		</div>
		
		<el-dialog center title="查看原图" :visible.sync="annexVisible">
			<div style="text-align:center">
			<img :src="currentImg"/>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	
	export default {
		name:"upload",
		data(){
			return {
				Data:this.uploadData,
				ifShowList:false,
				fileList:[],
				annexIndex:-1,
				originalName:"",
				annexVisible:false,
				currentImg:""
			}
		},
		props : ['uploadData'],
		mixins : [],
		components : {},
		methods : {			
			fileUploadSuccess(response, file, fileList){
				const p = response.data;
				for(let item of fileList){
					item.info = "";
					item.hover = false;
					item.view = false;
					item.edit = false;
				}
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
			showEdit(index){
				this.annexIndex = index;
			},
			hideEdit(index){
				this.annexIndex = -1;
			},
			removeAnnexItem(index){
				this.fileList.splice(index,1);
			},
			editName(item,name){
				item.edit = true;
				this.originalName = name;
			},
			saveName(item){
				if(item.name==""){
					item.info="请输入名称";
					return false;
				}
				item.info="";
				item.edit=!item.edit
			}
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
			width:260px
			padding:20px
			position:relative
			border:1px solid #dcdcdc
			border-radius:4px
			margin:10px 10px 10px 0px
			overflow:hidden
			z-index:50
			display:flex
			flex-direction: column
				
			&:hover
				cursor:pointer
			
			.serialNumberArea
				width:60px
				height:60px
				transform:rotate(45deg)
				position:absolute
				top:-30px;
				left:-30px;
				text-align:right;
				background-color:#409eff
				overflow:hidden
				
				
				.serialNumer
					width:30px;
					height:30px;
					text-align:center
					position:absolute
					right:0
					bottom:20px
					transform: rotate(-45deg)
					display:block
					color:#fff;
					z-index:200
				
			.delete
				position:absolute
				top:-6px
				right:5px
			
			.item
				margin:10px 0px 0px
				font-size:12px
				width:100%
				display:inline-flex
				
				.itemText
					width:245px
					white-space: nowrap
					overflow: hidden
					text-overflow: ellipsis
				
				.editInput 
					width:245px
					display:inline-flex
				
				.editBtn
					font-size:12px;
					color:#009688;
					display: inline-flex;
				
			.coverViewLight
				width:260px
				height:150px
				position:absolute
				top:20px
				left:20px
				z-index:100
				text-align:center
				opacity:0
				
			.coverViewDark
				width:260px
				height:150px
				position:absolute
				top:20px
				left:20px
				z-index:100
				text-align:center
				background-color:rgba(68,68,68,0.7)
				
				i
					font-size:30px
					color:#fff
					margin:0px auto
					text-align:center
					line-height:150px
		
		.alertInfo
			color:red
			line-height:initial
			padding:0px
			margin:0px
			font-size:12px			
</style>