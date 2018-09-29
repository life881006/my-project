<template>
	<el-form ref="newsEditform" :model="newsEditform" label-width="100px" :style="{'height':formHeight+50+'px',overflow:'hidden'}">
		
		<!--基础设置栏-->
		<div class="toolBar">
			
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	置顶<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" prop="isTop">
					<el-radio v-model="newsEditform.isTop" label="0">否</el-radio>
					<el-radio v-model="newsEditform.isTop" label="1">是</el-radio>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    		    
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	发布到<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" >
					<el-checkbox-group v-model="newsEditform.releaseTo">
						<el-checkbox label="releaseSite" key="releaseSite">
							网站
						</el-checkbox>
						<el-checkbox label="releaseWx" key="releaseWx">
							微信
						</el-checkbox>
						<el-checkbox label="releaseMicroblog" key="releaseMicroblog">
							微博
						</el-checkbox>
						<el-checkbox label="releaseApp" key="releaseApp">
							APP
						</el-checkbox>						
					</el-checkbox-group>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	自动发布<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" prop="isAutoAppear">
					<el-radio v-model="newsEditform.isAutoAppear" label="0">否</el-radio>
					<el-radio v-model="newsEditform.isAutoAppear" label="1">是</el-radio>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	允许评论<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" prop="isReview">
					<el-radio v-model="newsEditform.isReview" label="0">否</el-radio>
					<el-radio v-model="newsEditform.isReview" label="1">是</el-radio>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	大图稿件<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" prop="isBigImage">
					<el-radio v-model="newsEditform.isBigImage" label="0">否</el-radio>
					<el-radio v-model="newsEditform.isBigImage" label="1">是</el-radio>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    
		    
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	电视稿件<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" prop="isOriginal">
					<el-radio v-model="newsEditform.isOriginal" label="0">否</el-radio>
					<el-radio v-model="newsEditform.isOriginal" label="1">是</el-radio>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    		    
		    <el-dropdown trigger="click">
		      <el-button class="el-dropdown-link" >
		      	外链<i class="el-icon-caret-bottom el-icon--right"></i>
		      </el-button>
		      <el-dropdown-menu class="dropDownMenu" slot="dropdown">
		        <el-form-item label-width="0px" prop="linkUrl">
					<el-input style="width:400px" v-model="newsEditform.linkUrl" size="small" placeholder="填写外链地址">
						<template slot="prepend">外链地址</template>
					</el-input>
				</el-form-item>
		      </el-dropdown-menu>
		    </el-dropdown>
		    
			<div class="operations">
				<el-form-item label-width="0px" class="right">
					<el-button type="primary" icon="el-icon-success" @click="add('newsEditform')" >提交</el-button>
					<el-button @click="reset('newsEditform')" >重置</el-button>
				</el-form-item>
			</div>
		</div>
		
		
		<div :style="{'height':formHeight+'px','overflow':'hidden','padding-top':'10px'}">
		<el-scrollbar class="mainScroll">
			
		<el-form-item label="文章分类" :rules="filter_inputs('required')" prop="checkedChannels">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="newsEditform.checkedChannels" @change="handleCheckedChannelChange">
				<el-checkbox v-for="channel in channels" :label="channel.id" :key="channel.id">{{channel.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		
		<el-form-item label="标题" :rules="filter_inputs('required')" prop="title">
			<el-input v-model="newsEditform.title" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<el-form-item label="正文">
			<editor ref="tinyMce" :tinyMce="tinyMceParams" :content="editorText"></editor>
			<transition name="el-zoom-in-top">
			<span class="tinyMeceInfo">{{newsEditform.tinyMceInfo}}</span>
			</transition>
		</el-form-item>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="作者" :rules="filter_inputs('required')" prop="author">
					<el-input v-model="newsEditform.author"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="来源" prop="transfer">
					<el-input v-model="newsEditform.transfer"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="编辑" prop="editor">
					<el-input v-model="newsEditform.editor"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="发布时间" :rules="filter_inputs('required')" prop="appearDate">
					<el-date-picker v-model="newsEditform.appearDate" type="datetime" placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="编辑时间" :rules="filter_inputs('required')" prop="editTime">
					<el-date-picker v-model="newsEditform.editTime" type="datetime" placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
			</el-col>			
		</el-row>
		<el-form-item label="上传附件">
			<upload :configData="configData" :fileListData="fileListData" @getUploadedAnnex="getUploadedAnnex"></upload>
		</el-form-item>
		
		<!--嵌套的dialog必须加append-to-body
		<el-dialog title="3313" :visible.sync="see" width="60%" top="5vh" append-to-body>
			
		</el-dialog>
		-->
		</el-scrollbar>
		</div>
	</el-form>
</template>

<script>
	import editor from "@/components/tinyMce/tinyMce"
	import upload from "@/components/fileUpload/index"
	
	export default {
		name:"",
		data(){
			return {
				formHeight:this.mainContentHeight+50,
				newsId:this.$route.path.substr(this.$route.path.lastIndexOf("/")+1,this.$route.path.length),
				configData:{//附件上传参数
					isFirstButton:true,
					statusButton:true,
					api:"HX_API",
					action:this.baseConfig.url_base2,
					rootPath : "/allWeb/huixue/news",
					addAnnexHandle:"/https/newsAnnex/add.do",
					deleteAnnexHandle:"/https/newsAnnex/delete.do"
				},
				tinyMceParams:{//编辑器参数设置
					name:"newsTinyMce",
					width:"99.7%",
					height:"200px",
					plugins:[],//编辑器插件,不填写加载默认插件
					toolBar:[],//工具栏图标显示，不填写加载默认图标
					styleFormats:[],//文本编辑器中内容样式
					isShowMenuBar: true,//是否显示菜单栏
				},
				fileListData:[],//附件列表
				newsEditform:{},
				editorText:{
					path:this.$route.path,
					content:""
				},
				channels:[],
				channelsKeyArr:[],
				checkAll:false,
				isIndeterminate: false,
				annexesList:[],
			}
		},		
		beforeCreate(){
			
		},
		created(){
		
		},
		beforeMount(){
		
		},
		mounted(){
			this.loadChannel();
			this.getNews(this.newsId);
			this.getNewsChannelAssociate(this.newsId);
		},
		beforeUpdate(){
		
		},
		updated(){
		
		},
		beforeDestroy(){
		
		},
		destroyed(){
		
		},
		props : ['mainContentHeight'],
		mixins : [],
		components : {editor,upload},
		methods : {
			loadChannel(){
				const sql = "SELECT id,name FROM channel WHERE unitId = '"+this.user.unitId+"' order by serialNumber asc";
				let p = {};
				p.sql = sql; 
			
				this.axios({
					url:this.baseConfig.url_base,
					dataType:"JSON",
					method:"post",
					data:this.getData("HX_API","/https/channel/query.do",p),
				}).then((result)=>{
					this.channels = result.data.data;
					for(let item of this.channels){
						this.channelsKeyArr.push(item.id);
					}
				}).catch((error)=>{
					console.log(error);
					
				});
			},
			getNews(id){
				const p = {};
				p.id = id;
				this.axios({
					url:this.baseConfig.url_base,
					dataType:"JSON",
					method:"post",
					data:this.getData("HX_API","/https/news/getNews.do",p),
				}).then((result)=>{
					this.newsEditform = result.data.data;
					this.newsEditform.appearDate = this.moment(this.newsEditform.appearDate).format("YYYY-MM-DD HH:mm:ss");
					this.newsEditform.editTime = this.moment(this.newsEditform.editTime).format("YYYY-MM-DD HH:mm:ss");
					this.editorText.content = this.newsEditform.content;
					this.$refs.tinyMce.setContent(this.newsEditform.content);

				}).catch((error)=>{

				});
			},
			getNewsChannelAssociate(id){
				const p = {};
				p.sql = "select channelId from channelNewsAssociate where newsId = '"+id+"'";
				this.axios({
					url:this.baseConfig.url_base,
					dataType:"JSON",
					method:"post",
					data:this.getData("HX_API","/https/channelNewsAssociate/queryForMap.do",p),
				}).then((result)=>{
					//this.newsEditform.checkedChannels = result.data.data;
					console.log(this.newsEditform.checkedChannels);
				}).catch((error)=>{

				});
			},
			handleCheckAllChange(val) {//全选频道
		        this.newsEditform.checkedChannels = val ? this.channelsKeyArr : [];
		        this.isIndeterminate = false;
		    },
		    handleCheckedChannelChange(value){//单选频道
		    	console.log(value);
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.channels.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.channels.length;
		    },
		    reset(formName){//重置表单
				this.newsEditform.tinyMceInfo = "";
				this.newsEditform.checkedChannels = [];
				this.newsEditform.releaseTo = [];
				this.checkAll = false;
				this.isIndeterminate = false;
				this.$refs.tinyMce.claerMce();
				this.$refs[formName].resetFields();
				this.fileListData = [];
				this.$store.dispatch("dropTextarea",this.$router.history.current.path);
			},
			getUploadedAnnex(p){//获取文件上传后返回的数据
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
					data: this.getData("HX_API",this.configData.addAnnexHandle,annex),
					dataType:"json",
					headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
				}).then((result)=>{
					const fileId = result.data.data;
					p.id = fileId;
					this.fileListData.push(p)
				}).catch((error)=>{
					console.log(error);					
				});	
			},
			updateAnnexMsg(newsId){//更新附件上传后的newsId
				let annexes = {};
				for(const [i,item] of this.fileListData.entries()){
					const annex = {};
					annex.id= item.id;
					annex.serialNumber = i+1;
					annex.newsId = newsId;
					annex.annexName = item.annexName;
					annex.content = "";
					annex.isFirst = item.isFirst;
					annex.status = item.status;
					annexes[i]=annex;
				}
				
				this.axios({
					method:"post",
					url:this.baseConfig.url_base,
					dataType:"JSON",
					data:this.getData("HX_EXT_API","/https/newsAnnex/updateAnnex.do",annexes),
					headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
				}).then((data)=>{
					this.$message({
						type:"success",
						message:"添加成功"
					});
					this.reset("newsEditform");
				}).catch((error)=>{
					console.log(error);
				});
			},
			deleteAnnex(annexList){//删除附件后更新附件列表
				this.fileListData = annexList;
			}
		},
		watch : {
			mainContentHeight(val){
				this.formHeight = val+50;
			}
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	>>>.mainScroll
		height:100%
	
	.el-table-column
		width:33%
		
	.controll
		text-align: center
		
	.tinyMeceInfo
		font-size:12px
		color:#f56c6c
		transition: height 0.5s
		
	>>>.el-scrollbar__wrap
		overflow-x:hidden
	
	.toolBar
		height:50px
		line-height:50px
		width:auto
		background-color: #ededed
		padding:0px 10px

	.toolBar
		.operations
			display:inline-block
			float:right
			margin-top:5px
			
	.toolBar .el-form-item
	.dropDownMenu .el-form-item
		margin-bottom:0px
		
	.dropDownMenu
		padding:5px 20px
		margin-top:0px
		
	.releaseToIcon
		font-size:20px
</style>