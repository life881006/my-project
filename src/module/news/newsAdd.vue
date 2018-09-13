<template>	
	<el-form ref="form" :model="form" label-width="100px">
		<el-form-item label="文章分类" :rules="filter_inputs('required')" prop="checkedChannels">
			<el-checkbox-group v-model="form.checkedChannels">
				<el-checkbox v-for="channel in channels" :label="channel.id" :key="channel.id">{{channel.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		
		<el-form-item label="标题" :rules="filter_inputs('required')" prop="title">
			<el-input v-model="form.title" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<el-form-item label="正文">
			<editor ref="tinyMce" :tinyMce="tinyMceParams"></editor>
			<transition name="el-zoom-in-top">
			<span class="tinyMeceInfo">{{form.tinyMceInfo}}</span>
			</transition>
		</el-form-item>
		
		<el-form-item label="文章类型" prop="type">
			<el-radio v-model="form.type" label="0" border size="mini">发布新闻</el-radio>
			<el-radio v-model="form.type" label="1" border size="mini">链接新闻</el-radio>
		</el-form-item>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="作者" :rules="filter_inputs('required')" prop="author">
					<el-input v-model="form.author"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="来源">
					<el-input v-model="form.transfer"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="编辑时间" :rules="filter_inputs('required')" prop="editTime">
					<el-date-picker v-model="form.editTime" type="datetime" placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
			</el-col>
			
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="发布时间" :rules="filter_inputs('required')" prop="appearDate">
					<el-date-picker v-model="form.appearDate" type="datetime" placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="编辑">
					<el-input v-model="form.editor"></el-input>
				</el-form-item>
			</el-col>			
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="自动发布">
					<el-radio v-model="form.isAutoAppear" label="0">否</el-radio>
					<el-radio v-model="form.isAutoAppear" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="允许评论">
					<el-radio v-model="form.isReview" label="0">否</el-radio>
					<el-radio v-model="form.isReview" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="大图稿件">
					<el-radio v-model="form.isBigImage" label="0">否</el-radio>
					<el-radio v-model="form.isBigImage" label="1">是</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row>			
			<el-col :span="8">
				<el-form-item label="发布到网站">
					<el-radio v-model="form.releaseSite" label="0">否</el-radio>
					<el-radio v-model="form.releaseSite" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="发布到app">
					<el-radio v-model="form.releaseApp" label="0">否</el-radio>
					<el-radio v-model="form.releaseApp" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="发布到微信">
					<el-radio v-model="form.releaseWx" label="0">否</el-radio>
					<el-radio v-model="form.releaseWx" label="1">是</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="发布到微博">
					<el-radio v-model="form.releaseMicroblog" label="0">否</el-radio>
					<el-radio v-model="form.releaseMicroblog" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="置顶">
					<el-radio v-model="form.isTop" label="0">否</el-radio>
					<el-radio v-model="form.isTop" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="电视稿件">
					<el-radio v-model="form.isOriginal" label="0">否</el-radio>
					<el-radio v-model="form.isOriginal" label="1">是</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-form-item>
			<el-button type="primary" icon="el-icon-success" @click="add('form')" small>提交</el-button>
			<el-button @click="reset('form')" small>重置</el-button>
		</el-form-item>
		
		<!--嵌套的dialog必须加append-to-body
		<el-dialog title="3313" :visible.sync="see" width="60%" top="5vh" append-to-body>
			
		</el-dialog>
		-->
	</el-form>
</template>

<script>
	
	//引入编辑器
	import editor from "@/components/tinyMce/tinyMce"
	
	export default{
		data(){
			return {
				form:{
					title:"",
					checkedChannels:[],
					type:"0",
					tinyMceInfo:"",
					author:"",
					transfer:"",
					appearDate:"",
					editTime:"",
					editor:"",
					releaseMicroblog:"0",
					isAutoAppear:"0",
					isReview:"0",
					isBigImage:"0",
					releaseSite:"0",
					releaseApp:"0",
					releaseWx:"0",
					isTop:"0",
					isOriginal:"1",
				},
				tinyMceParams:{//编辑器参数设置
					name:"newsTinyMce",
					width:"100%",
					height:"200px",
					plugins:[],//编辑器插件,不填写加载默认插件
					toolBar:[],//工具栏图标显示，不填写加载默认图标
					styleFormats:[],//文本编辑器中内容样式
					isShowMenuBar: true,//是否显示菜单栏
				},
				editorText:{},
				channels:[],
			}
		},
		components:{editor},
		mounted:function(){
			this.loadChannel();
		},
		methods:{
			loadChannel(){
				const sql = "SELECT id,name FROM channel WHERE unitId = '"+this.user.unitId+"' order by serialNumber asc";
				let p = {};
				p.sql = sql; 
			
				this.axios({
					url:this.baseConfig.url_base,
					dataType:"JSON",
					method:"post",
					data:this.getData("HX_API","/https/channel/queryForMap.do",p),
				}).then((result)=>{
					this.channels = result.data.data;
					
				}).catch((error)=>{
					console.log(error);
					
				});
			},
			add(formName){
				this.editorText = this.$refs.tinyMce.getMceContent();//获取文本编辑器内容
				if(this.editorText.text===""){//文本编辑器纯文本内容验证
					this.form.tinyMceInfo = "请填写文章正文";
				    return false;
				}else{
					this.form.tinyMceInfo = "";
				}
				this.$refs[formName].validate((valid) => {//验证
					if (valid) {//验证通过后操作
						const currentPath = this.$router.history.current.path;
						this.$store.dispatch("dropTextarea",currentPath);
						
						var p = {};	
						p.unitId=this.user.unitId;
						p.title=this.form.title;
						p.content = this.editorText.html;
						p.status=0;
						p.author=this.form.author;
						p.transfer=this.form.transfer;
						p.editor=this.form.editor;
						p.editTime = this.form.editTime;	
						p.appearDate = this.form.appearDate;	
						p.readTimes=0;
						p.appearUserId=this.user.id; 
						p.releaseSite=this.form.releaseSite;
						p.releaseApp=this.form.releaseApp;
						p.releaseWx=this.form.releaseWx;
						p.releaseMicroblog=this.form.releaseMicroblog; 
						p.isTop = this.form.isTop;
						p.type = this.form.type;
						
						p.linkUrl = "";
						p.isBigImage = this.form.isBigImage;
						p.isReview = this.form.isReview;
						p.isAutoAppear= this.form.isAutoAppear;	
						p.isOriginal = this.form.isOriginal;
						p.lastTime = this.moment(new Date().getTime()).format("YYYY-MM-DD HH:MM:SS");	
						
						this.axios({
							method:'post',
							url:this.baseConfig.url_base,
							data: this.getData("HX_API","/https/news/add.do",p),
							dataType:"json",
				            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
						}).then((result)=>{
							const newsId = result.data.data;
							this.updateChannelNewsAssociate(0,newsId,this.form.checkedChannels);
						}).catch((error)=>{
							console.log(error);
							
						});
					} else {//验证不通过
						return false;
					}
		        });
			},
			updateChannelNewsAssociate(type,newsId,checked_channelId){
				if (type==1){
					this.deletecChannelNewsAssociate(newsId,checked_channelId);
					return;
				}
				this.addChannelNewsAssociate(newsId,checked_channelId); 
			},
			deletecChannelNewsAssociate(newsId,checked_channelId){
				let p = {}; 
				p.sql="delete from channelNewsAssociate where newsId='"+newsId+"'"; 
				
				this.axios({
					method:'post',
					url:this.baseConfig.url_base,
					data: this.getData("HX_API","/https/news/exec.do",p),
					dataType:"json",
				}).then((result)=>{
					this.addChannelNewsAssociate(newsId,checked_channelId); 
				}).catch((error)=>{
					console.log(error);					
				});				
			},
			addChannelNewsAssociate(newsId,checked_channelId){
				for(const channelId of checked_channelId){
					var p = {};	
					p.newsId=newsId;
					p.channelId=channelId; 
					
					this.axios({
						method:'post',
						url:this.baseConfig.url_base,
						data: this.getData("HX_API","/https/channelNewsAssociate/add.do",p),
						dataType:"json",
					}).then((result)=>{
						
					}).catch((error)=>{
						console.log(error);					
					});	
				};
				//this.$emit("refreshTabel");
			},
			reset(formName){
				this.form.tinyMceInfo = "";
				this.$refs.tinyMce.claerMce(); 
				this.$refs[formName].resetFields();
			},
		},
	}
</script>

<style>
	#addTable{overflow-y:auto;}
	.el-table-column{width:33%;}
	.controll{text-align: center;}
	.tinyMeceInfo{font-size:12px;color:#f56c6c;transition: height 0.5s;}
</style>