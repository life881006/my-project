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
							<span class="label">是否显示</span>
							<el-radio v-model="item.status" label="1">
								是
							</el-radio>
							<el-radio v-model="item.status" label="0">
								否
							</el-radio>
						</div>
					</el-dropdown-menu>
				</el-dropdown>
				
				<div class="annexImg">
					
					<a v-if="item.dirName==='image'" :href="'http://192.168.100.106:8082'+baseConfig.webName+item.saveUrl+item.newFileName" target="_blank">
					<img 
						:src="'http://192.168.100.106:8082'+baseConfig.webName+item.saveUrl+item.newFileName"/>
					</a>
					
					<a v-else :href="item.contextPath+item.saveUrl+item.newFileName" target="_blank">
					<img 					
						
						:src="'http://192.168.100.106:8082'+baseConfig.webName+'/web2/layout/images/file/'+item.fileType+'.png'"/>
					</a>
				</div>
				
				<div class="fileSize">
					{{Math.ceil(item.fileSize/1024)+"KB"}}
				</div>
				
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
	</div>
</template>

<script>
	
	export default {
		name:"upload",
		data(){
			return {
				Data:this.configData,
				ifShowList:false,
				fileList:this.fileListData,//附件集合
				originalName:"",
			}
		},
		props : ['configData','fileListData'],
		mixins : [],
		components : {},
		methods : {
			fileUploadSuccess(response, file, fileList){//upload上传成功后钩子
				const p = response.data;
				p.info = "";
				p.hover = false;
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
			removeAnnexItem(index,annexId){//删除某个附件
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
			editName(item,name){//编辑文件名
				item.edit = true;
				this.originalName = name;
			},
			saveName(item){//保存文件名
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
		}
		
	}

</script>

<style scoped="scoped" lang="stylus" rel="stylesheet/stylus">
	@import "./style/style.styl"
</style>