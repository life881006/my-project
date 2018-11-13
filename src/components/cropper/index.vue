<template>
	<div>
		<el-dialog 
		title="上传图片裁切"
		:visible.sync="visibleCropper" 
		:close-on-click-modal="false" 
		:close-on-press-escape="false"
		:width="option.autoCropWidth+260+'px'" 
		top="5vh">
			<div class="dialogMain">
				<div :style="{'width':option.autoCropWidth+40+'px','height':option.autoCropHeight+80+'px'}">
					<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:info="true"
					:full="option.full"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:fixedBox="option.fixedBox"
					:original="option.original"
					:autoCrop="option.autoCrop"
					:autoCropWidth="option.autoCropWidth"
					:autoCropHeight="option.autoCropHeight"
					
					></vueCropper>
				</div>
				<div class="functionalArea">
					<div class="functionalItem">
						<el-button size="medium" icon="el-icon-zoom-in" @click="changeScale(1)"></el-button>
					</div>
					<div class="functionalItem">
						<el-button size="medium" icon="el-icon-zoom-out" @click="changeScale(-1)"></el-button>
					</div>
					<div class="functionalItem">
						<el-button size="medium" icon="el-icon-erp-rotateLeft" @click="rotateLeft"></el-button>
					</div>
					<div class="functionalItem">
						<el-button size="medium" icon="el-icon-erp-rotateRight" @click="rotateRight"></el-button>
					</div>
					<div class="functionalItem">
						<el-button size="medium" icon="el-icon-download" @click="down('blob')"></el-button>
					</div>

					<div class="functionalItem">
						<el-button type="primary" size="small" icon="el-icon-success" @click="uploadImage">确定</el-button>
						<el-button size="small" @click="closeDialog">取消</el-button>
					</div>
				</div>
			</div>
		</el-dialog>
		<div class="test-button">
			
			<label class="upload-btn" for="uploads">
				<i class="el-icon-upload"></i>
				<span>上传图片</span>
			</label>
			<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
		</div>

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
					
					<a :href="'http://192.168.100.106:8082'+baseConfig.webName+item.saveUrl+item.newFileName" target="_blank">
					<img 
						:src="'http://192.168.100.106:8082'+baseConfig.webName+item.saveUrl+item.newFileName"/>
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
	import vueCropper from 'vue-cropper'

	export default {
		data: function () {
			return {
				visibleCropper: false,
				originalName:"",
				fileList:this.fileListData,
				Data:this.configData,
				option: {
					img: '',
					size: 1,
					full: false,
					outputType: 'png',
					canMove: true,
					fixedBox: true,
					autoCropWidth: this.cropperSize.width,
					autoCropHeight: this.cropperSize.height,
					autoCrop: true,
					original: false,
					canMoveBox: false
				},
				downImg: '#'
			}
		},
		props:['configData','fileListData','cropperSize'],
		methods: {
			changeScale(num){
				this.$refs.cropper.changeScale(num);
			},
			finish (type) {
				// 输出
				const test = window.open('about:blank')
				test.document.body.innerHTML = '图片生成中..'
				if (type === 'blob') {
					this.$refs.cropper.getCropBlob((data) => {
						test.location.href = window.URL.createObjectURL(data)
					})
				} else {
					this.$refs.cropper.getCropData((data) => {
						const blobData = this.convertBase64UrlToBlob(data);
						test.location.href = window.URL.createObjectURL(blobData);
					})
				}
			},
			down (type) {
				// event.preventDefault()
				// 输出
				let aLink = document.createElement('a');
        		aLink.download = 'author-img';
				if (type === 'blob') {
					this.$refs.cropper.getCropBlob((data) => {
						this.downImg = window.URL.createObjectURL(data)
                        if (window.navigator.msSaveBlob) {
                            let blobObject = new Blob([data]);
                            window.navigator.msSaveBlob(blobObject, 'demo.png');
                        } else {
                            this.$nextTick(()=>{
                            	aLink.href = this.downImg;
                                aLink.click();
                            })
                        }
					})
				} else {
					this.$refs.cropper.getCropData((data) => {
						this.downImg = data;
                        if (window.navigator.msSaveBlob) {
                            let blobObject = new Blob([data]);
                            window.navigator.msSaveBlob(blobObject, 'demo.png');
                        } else {
                            this.$nextTick(()=>{
                                aLink.href = this.downImg;
                                aLink.click();
                            })
                        }
					})
				}
			},
			uploadImg (e, num) {
				//上传图片
				// this.option.img
				this.visibleCropper = true;
				let file = e.target.files[0];
				this.originalName = file.name;
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					 return false
				 }
				let reader = new FileReader()
				reader.onload = (e) => {
					let data
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					if (num === 1) {
						this.option.img = data
					} else if (num === 2) {
						this.example2.img = data
					}
				}
				
				// 转化为base64
				// reader.readAsDataURL(file)
				// 转化为blob
				reader.readAsArrayBuffer(file)
			},
			convertBase64UrlToBlob(urlData) {
				let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
				//处理异常,将ascii码小于0的转换为大于0
				let ab = new ArrayBuffer(bytes.length);
				let ia = new Uint8Array(ab);
				for (let i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
				}
				return new Blob([ab], { type: 'image/png' });
		    },
		    rotateLeft(){
		    	this.$refs.cropper.rotateLeft(); 
		    },
		    rotateRight(){
		    	this.$refs.cropper.rotateRight(); 
		    },
		    closeDialog(){
		    	this.visibleCropper = false;
		    },
		    uploadImage(){
		    	this.$refs.cropper.getCropData(data => {
					const fileData = this.convertBase64UrlToBlob(data);
					let formData = new FormData();
					formData.append('file', fileData, this.originalName);
					formData.append('rootPath',this.Data.rootPath);
					this.axios({
						method:'post',
						url:this.baseConfig.url_base2,
						data: formData,
						dataType:"json",
					}).then((result)=>{
						const filePathObj = result.data.data;
						//改写附件名称，以防改掉文件后缀
						const fileName = filePathObj.annexName.substring(0,filePathObj.annexName.lastIndexOf("."));
						filePathObj.annexName = fileName;
						filePathObj.info = "";
						filePathObj.hover = false;
						filePathObj.edit = false;
						filePathObj.editSerialNumber = false;
						if(this.Data.isFirstButton){
							filePathObj.isFirst = "0";
						}
						if(this.Data.statusButton){
							filePathObj.status = "1";
						}
						
						this.uploadFile(filePathObj);

					}).catch((error)=>{
						console.log(error);					
					});	
		        })
		    },
		    uploadFile(fileObj){
				const p = fileObj;
				p.fbScheme = this.unitConfig.fbScheme;
				p.fbIp = this.unitConfig.fbIp;
				p.fbPort = this.unitConfig.fbPort;
				p.fbName = this.unitConfig.fbName;
				p.fbRootPath = this.unitConfig.fbRootPath;
				this.transferFile(p);
		    },
		    transferFile(obj){
		    	this.axios({
					method:'post',
					url:this.baseConfig.url_transferFile,
					data: this.getData(this.Data.api,'',obj),
					dataType:"json",
				}).then((result)=>{
					let resultData = result.data.data;
			        obj.contextPath = resultData.contextPath;
			        obj.storageLocation = resultData.storageLocation;
			        this.visibleCropper = false;
			        this.$emit("getUploadedAnnex",obj);
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
		          	this.option.img="";
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
			editName(item){//编辑文件名
				item.edit = true;

			},
			saveName(item){//保存文件名
				if(item.name==""){
					item.info="请输入名称";
					return false;
				}
				item.info="";
				item.edit=!item.edit
			},
		},
		components: {
			vueCropper
		},
		watch:{
			fileListData(val){
				this.fileList = val;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "./style/style.styl"
	.wrapper		
		width:100%
		height:468px
	
	.dialogMain
		display:flex
		flex-decoration:column
	
	.functionalArea
		width:170px
		margin-left:5px
		
		.functionalItem
			text-align:center
			margin:15px 0px
			
			&:last-of-type
				margin-top:30px
	
	.upload-btn
		
		border:1px solid #409EFF
		background-color:#409EFF
		padding:0px 5px
		height:30px
		line-height:30px
		display:inline-block
		border-radius:3px
		color:#fff
		
		&:hover
			cursor:pointer
			background-color:#66b1ff
			border-color:#66b1ff

		span
			font-size:12px

</style>