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
				v-for="(item,index) in fileList">
				
				<div class="serialNumberArea">
					<span class="serialNumer">{{Number(item.serialNumber)+1}}</span>
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
						<el-dropdown-item v-if="Data.isFirstButton">
							是否首页：
							<el-radio v-model="item.response.data.isFirstButton" label="0">
								否
							</el-radio>
							<el-radio v-model="item.response.data.isFirstButton" label="1">
								是
							</el-radio>
						</el-dropdown-item>
						<el-dropdown-item v-if="Data.statusButton">
							是否显示：
							<el-radio v-model="item.response.data.statusButton" label="0">
								否
							</el-radio>
							<el-radio v-model="item.response.data.statusButton" label="1">
								是
							</el-radio>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				
				<div 
					:class="item.view?'coverViewDark':'coverViewLight'" 
					@mouseover="item.view=true" 
					@mouseleave="item.view=false" 
					@click="annexVisible=true;currentImg='http://hw.jshuixue.com'+baseConfig.webName+item.response.data.saveUrl+item.response.data.newFileName">
					
					<i class="el-icon-zoom-in"></i>
				</div>
								
				<img 
					width="260px" 
					height="150px"
					v-if="item.response.data.fileType=='png'||item.response.data.fileType=='jpg'" 
					:src="'http://hw.jshuixue.com'+baseConfig.webName+item.response.data.saveUrl+item.response.data.newFileName"></img>
				
				<template v-if="!item.edit">
					<div class="item" @mouseover="item.hover=true" @mouseleave="item.hover=false"  @click="editName(item)" >
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
							@click="saveName(item)">保存</el-button>						
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
				Data:this.configData,
				ifShowList:false,
				fileList:[],
				annexIndex:-1,
				originalName:"",
				annexVisible:false,
				currentImg:""
			}
		},
		props : ['configData','fileListData'],
		mixins : [],
		components : {},
		methods : {			
			fileUploadSuccess(response, file, fileList){
				const p = response.data;
				let arr = [];
				for(const [i,item] of fileList.entries()){
					item.info = "";
					item.serialNumber = i;
					item.hover = false;
					item.view = false;
					item.edit = false;
					let statusObj = Object.assign({},item);
					arr.push(statusObj);
				}
				
				if(this.Data.isFirstButton){
					p.isFirstButton = "0";
				}
				if(this.Data.statusButton){
					p.statusButton = "0";
				}
				
				p.fbScheme = this.unitConfig.fbScheme;
				p.fbIp = this.unitConfig.fbIp;
				p.fbPort = this.unitConfig.fbPort;
				p.fbName = this.unitConfig.fbName;
				p.fbRootPath = this.unitConfig.fbRootPath; 
				this.transferFile(p,arr);
			},			
			transferFile(p,arr){//传文件
				this.axios({
					method:'post',
					url:this.baseConfig.url_transferFile,
					data: this.getData(this.Data.api,this.Data.addAnnexHandle,p),
					dataType:"json",
				}).then((result)=>{
					const filePathObj = result.data.data;
					p.contextPath = filePathObj.contextPath;
					p.storageLocation = filePathObj.storageLocation; 
					
					this.$emit("getUploadedAnnex",p,arr);
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
			}
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
			
			.setting
				position:absolute
				top:-6px
				right:25px
			
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