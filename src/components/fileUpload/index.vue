<template>
	<div>
		<el-upload 
		  drag 
		  :data="Data" 
		  :action="Data.action" 
		  :on-success="fileUploadSuccess" 
		  :file-list="fileList"
		  :show-file-list="ifShowList" 
		  multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip"></div>
		</el-upload>
		
		<div class="el-fileUpload-list">
			<div 
				class="annexItem" 
				v-for="(item,index) in fileList" :key="item.id">
				
				<div class="serialNumberArea" >
					<span class="serialNumer el-dropdown-link">{{index+1}}</span>
				</div>
				
				<el-button 
					class="delete" 
					type="text" 
					icon="el-icon-close" 
					@click="removeAnnexItem(index,item.id)"></el-button>
					
				<el-dropdown 
					class="setting" 
					trigger="click"
					>
					<el-button type="text" class="el-dropdown-link"><i class="el-icon-setting"/></el-button>
					<el-dropdown-menu slot="dropdown">
						<div v-if="Data.isFirstButton" class="menuItem">
							<span class="label">首选图片</span>
							<el-radio v-model="item.isFirst" label="0">
								否
							</el-radio>
							<el-radio v-model="item.isFirst" label="1">
								是
							</el-radio>
						</div>
						<div v-if="Data.statusButton" class="menuItem">
							<span class="label">状态</span>
							<el-radio v-model="item.status" label="1">
								显示
							</el-radio>
							<el-radio v-model="item.status" label="0">
								不显示
							</el-radio>
						</div>
					</el-dropdown-menu>
				</el-dropdown>
				
				<div 
					v-if="item.dirName==='image'"
					:class="item.view?'coverViewDark':'coverViewLight'" 
					@mouseover="item.view=true" 
					@mouseleave="item.view=false" 
					@click="annexVisible=true;showType='image';currentItem=item;typeTitle='查看原图'">
					<i class="el-icon-zoom-in"></i>
				</div>
				
				<a v-else :href="item.contextPath+item.saveUrl+item.newFileName" target="_blank">
				<div 
					:class="item.view?'coverViewDark':'coverViewLight'" 
					@mouseover="item.view=true" 
					@mouseleave="item.view=false" 
					>
					<i class="el-icon-download"></i>
				</div>
				</a>
				
				<img 
					width="260px" 
					height="150px"
					v-if="item.dirName==='image'" 
					:src="'http://hw.jshuixue.com'+baseConfig.webName+item.saveUrl+item.newFileName"></img>
				
				<img 
					width="260px" 
					height="150px"
					v-else 
					:src="'http://hw.jshuixue.com'+baseConfig.webName+'/web2/layout/images/file/'+item.fileType+'.png'"></img>
					
				<template v-if="!item.edit">
					<div class="item" @mouseover="item.hover=true" @mouseleave="item.hover=false"  @click="editName(item)" >
						<a class="itemText">{{item.annexName}}</a>
						<el-button type='text' v-show="item.hover" icon="el-icon-edit"></el-button>
					</div>
				</template>
				<template v-else>
					<div class="item">
						<el-input class='editInput' size='small' v-model="item.annexName">
							
						</el-input>
						
						<el-button 
							class="editBtn"
							type="button"
							size="mini"
							@click="saveName(item)">保存</el-button>						
					</div>
					<span class="alertInfo">{{item.info}}</span>
				</template>
				
			</div>
		</div>
		
		<el-dialog center :title="typeTitle" :visible.sync="annexVisible">
			<div style="text-align:center">
				<img v-if="showType==='image'" :src="'http://hw.jshuixue.com'+baseConfig.webName+currentItem.saveUrl+currentItem.newFileName"/>
				
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	
	
	export default {
		name:"upload",
		data(){
			return {
				Data:this.configData,
				ifShowList:false,
				fileList:[],
				annexIndex:-1,
				originalName:"",
				annexVisible:false,
				showType:"",
				typeTitle:"",
				currentItem:{},
			}
		},
		props : ['configData','fileListData'],
		mixins : [],
		components : {},
		methods : {
			fileUploadSuccess(response, file, fileList){
				const p = response.data;
				p.info = "";
				p.hover = false;
				p.view = false;
				p.edit = false;
				p.editSerialNumber = false;
					
				if(this.Data.isFirstButton){
					p.isFirst = "0";
				}
				if(this.Data.statusButton){
					p.status = "1";
				}
				
				p.fbScheme = this.unitConfig.fbScheme;
				p.fbIp = this.unitConfig.fbIp;
				p.fbPort = this.unitConfig.fbPort;
				p.fbName = this.unitConfig.fbName;
				p.fbRootPath = this.unitConfig.fbRootPath;
				this.transferFile(p);
			},			
			transferFile(p){//传文件
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
			},			hideEdit(index){
				this.annexIndex = -1;
			},
			removeAnnexItem(index,annexId){
				
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		        	confirmButtonText: '确定',
		        	cancelButtonText: '取消',
		        	type: 'warning'
		        }).then(() => {
		          
		       	  const p = {};
		       	  p.id = annexId;
		       	  
		          
		          this.axios({
		          	url : this.baseConfig.url_base,
					dataType : "JSON",
					data : this.getData(this.Data.api,this.Data.deleteAnnexHandle,p),
					method : "post",
		          }).then((data)=>{
		          	this.fileList.splice(index,1);
		          	this.$emit("deleteAnnex",this.fileList);
		          	this.$message({
			            type: 'success',
			            message: '删除成功!'
			        });
		          }).catch((error)=>{
		          	console.log(error);
		          });
		          
		        }).catch((error) => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          }); 
		        });
				
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
			},
			
		},
		watch : {
			fileListData(val){
				
				this.fileList = val;
			}
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
			padding:30px 20px 20px 20px
			position:relative
			border:1px solid #dcdcdc
			border-radius:4px
			margin:10px 10px 10px 0px
			overflow:hidden
			z-index:50
			display:flex
			flex-direction: column
				
			
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
					z-index:200;
									
			.delete
				position:absolute
				top:-6px
				right:5px
				&:hover{
					transform: rotate(90deg);
					transition: transform 0.5s;
				}
				
			
			.setting
				position:absolute
				top:-6px
				right:25px
				&:hover{
					transform: rotate(90deg);
					transition: transform 1s;
				}
				
				
			
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
					&:hover
						cursor:pointer
				
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
				top:30px
				left:20px
				z-index:100
				text-align:center
				opacity:0
				
				
			.coverViewDark
				width:260px
				height:150px
				position:absolute
				top:30px
				left:20px
				z-index:100
				text-align:center
				background-color:rgba(68,68,68,0.7)
				&:hover
					cursor:pointer
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
	
	.menuItem
		padding:5px 20px
		font-size:12px	
		
		.label{
			width:50px;
			display: inline-block
			padding-right:10px
			text-align: right
		}	
</style>