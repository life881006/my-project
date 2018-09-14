<template>	
	<el-form ref="newsAddform" :model="newsAddform" label-width="100px" :style="{'height':formHeight,overflow:'hidden'}">
		<el-scrollbar class="mainScroll">
		<el-form-item label="文章分类" :rules="filter_inputs('required')" prop="checkedChannels">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="newsAddform.checkedChannels" @change="handleCheckedChannelChange">
				<el-checkbox v-for="channel in channels" :label="channel.id" :key="channel.id">{{channel.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		
		<el-form-item label="标题" :rules="filter_inputs('required')" prop="title">
			<el-input v-model="newsAddform.title" placeholder="请输入内容"></el-input>			
		</el-form-item>
		
		<el-form-item label="正文">
			<editor ref="tinyMce" :tinyMce="tinyMceParams"></editor>
			<transition name="el-zoom-in-top">
			<span class="tinyMeceInfo">{{newsAddform.tinyMceInfo}}</span>
			</transition>
		</el-form-item>
		
		<el-form-item label="文章类型" prop="type">
			<el-radio v-model="newsAddform.type" label="0" border size="mini">发布新闻</el-radio>
			<el-radio v-model="newsAddform.type" label="1" border size="mini">链接新闻</el-radio>
		</el-form-item>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="作者" :rules="filter_inputs('required')" prop="author">
					<el-input v-model="newsAddform.author"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="来源" prop="transfer">
					<el-input v-model="newsAddform.transfer"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="编辑" prop="editor">
					<el-input v-model="newsAddform.editor"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="发布时间" :rules="filter_inputs('required')" prop="appearDate">
					<el-date-picker v-model="newsAddform.appearDate" type="datetime" placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="编辑时间" :rules="filter_inputs('required')" prop="editTime">
					<el-date-picker v-model="newsAddform.editTime" type="datetime" placeholder="请选择发布时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
			</el-col>
			
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="自动发布" prop="isAutoAppear">
					<el-radio v-model="newsAddform.isAutoAppear" label="0">否</el-radio>
					<el-radio v-model="newsAddform.isAutoAppear" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="允许评论" prop="isReview">
					<el-radio v-model="newsAddform.isReview" label="0">否</el-radio>
					<el-radio v-model="newsAddform.isReview" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="大图稿件" prop="isBigImage">
					<el-radio v-model="newsAddform.isBigImage" label="0">否</el-radio>
					<el-radio v-model="newsAddform.isBigImage" label="1">是</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row>			
			<el-col :span="8">
				<el-form-item label="发布到网站" prop="releaseSite">
					<el-radio v-model="newsAddform.releaseSite" label="0">否</el-radio>
					<el-radio v-model="newsAddform.releaseSite" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="发布到app" prop="releaseApp">
					<el-radio v-model="newsAddform.releaseApp" label="0">否</el-radio>
					<el-radio v-model="newsAddform.releaseApp" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="发布到微信" prop="releaseWx">
					<el-radio v-model="newsAddform.releaseWx" label="0">否</el-radio>
					<el-radio v-model="newsAddform.releaseWx" label="1">是</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :span="8">
				<el-form-item label="发布到微博" prop="releaseMicroblog">
					<el-radio v-model="newsAddform.releaseMicroblog" label="0">否</el-radio>
					<el-radio v-model="newsAddform.releaseMicroblog" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="置顶" prop="isTop">
					<el-radio v-model="newsAddform.isTop" label="0">否</el-radio>
					<el-radio v-model="newsAddform.isTop" label="1">是</el-radio>
				</el-form-item>
			</el-col>
			<el-col :span="8">
				<el-form-item label="电视稿件" prop="isOriginal">
					<el-radio v-model="newsAddform.isOriginal" label="0">否</el-radio>
					<el-radio v-model="newsAddform.isOriginal" label="1">是</el-radio>
				</el-form-item>
			</el-col>
		</el-row>
		
		<el-form-item>
			<el-button type="primary" icon="el-icon-success" @click="add('newsAddform')" size="small">提交</el-button>
			<el-button @click="reset('newsAddform')" size="small">重置</el-button>
		</el-form-item>
		
		<!--嵌套的dialog必须加append-to-body
		<el-dialog title="3313" :visible.sync="see" width="60%" top="5vh" append-to-body>
			
		</el-dialog>
		-->
		</el-scrollbar>
	</el-form>
</template>

<script>
	
	//引入编辑器
	import editor from "@/components/tinyMce/tinyMce"
	
	export default{
		name:"newsAdd",
		data(){
			return {
				formHeight:this.mainContentHeight+110+"px",
				newsAddform:{
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
					width:"99%",
					height:"200px",
					plugins:[],//编辑器插件,不填写加载默认插件
					toolBar:[],//工具栏图标显示，不填写加载默认图标
					styleFormats:[],//文本编辑器中内容样式
					isShowMenuBar: true,//是否显示菜单栏
				},
				editorText:{},
				channels:[],
				channelsKeyArr:[],
				checkAll:false,
				isIndeterminate: false,
			}
		},
		props:['mainContentHeight'],
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
					for(let item of this.channels){
						this.channelsKeyArr.push(item.id);
					}
				}).catch((error)=>{
					console.log(error);
					
				});
			},
			add(formName){
				this.editorText = this.$refs.tinyMce.getMceContent();//获取文本编辑器内容
				if(this.editorText.text===""){//文本编辑器纯文本内容验证
					this.newsAddform.tinyMceInfo = "请填写文章正文";
				    return false;
				}else{
					this.newsAddform.tinyMceInfo = "";
				}
				this.$refs[formName].validate((valid) => {//验证
					if (valid) {//验证通过后操作
						const currentPath = this.$router.history.current.path;
						this.$store.dispatch("dropTextarea",currentPath);
						
						var p = {};	
						p.unitId=this.user.unitId;
						p.title=this.newsAddform.title;
						p.content = this.editorText.html;
						p.status=0;
						p.author=this.newsAddform.author;
						p.transfer=this.newsAddform.transfer;
						p.editor=this.newsAddform.editor;
						p.editTime = this.newsAddform.editTime;	
						p.appearDate = this.newsAddform.appearDate;	
						p.readTimes=0;
						p.appearUserId=this.user.id; 
						p.releaseSite=this.newsAddform.releaseSite;
						p.releaseApp=this.newsAddform.releaseApp;
						p.releaseWx=this.newsAddform.releaseWx;
						p.releaseMicroblog=this.newsAddform.releaseMicroblog; 
						p.isTop = this.newsAddform.isTop;
						p.type = this.newsAddform.type;
						
						p.linkUrl = "";
						p.isBigImage = this.newsAddform.isBigImage;
						p.isReview = this.newsAddform.isReview;
						p.isAutoAppear= this.newsAddform.isAutoAppear;	
						p.isOriginal = this.newsAddform.isOriginal;
						p.lastTime = this.moment(new Date().getTime()).format("YYYY-MM-DD HH:MM:SS");	
						
						this.axios({
							method:'post',
							url:this.baseConfig.url_base,
							data: this.getData("HX_API","/https/news/add.do",p),
							dataType:"json",
				            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
						}).then((result)=>{
							const newsId = result.data.data;
							this.updateChannelNewsAssociate(0,newsId,this.newsAddform.checkedChannels);
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
				this.$message({
					type:"success",
					message:"添加成功"
				});
				this.reset("newsAddform");
			},
			handleCheckAllChange(val) {
				
		        this.newsAddform.checkedChannels = val ? this.channelsKeyArr : [];
		        this.isIndeterminate = false;
		    },
		    handleCheckedChannelChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.channels.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.channels.length;
		    },
			reset(formName){
				this.newsAddform.tinyMceInfo = "";
				this.newsAddform.checkedChannels = [];
				this.checkAll = false;
				this.$refs.tinyMce.claerMce();
				this.$refs[formName].resetFields();
				this.$store.dispatch("dropTextarea",this.$router.history.current.path);
			},
		},
		watch:{
			mainContentHeight(val){
				this.formHeight = val+110+"px";
			}
		}
	}
</script>

<style scoped="scoped">
	>>>.mainScroll{height:100%;}
	.el-table-column{width:33%;}
	.controll{text-align: center;}
	.tinyMeceInfo{font-size:12px;color:#f56c6c;transition: height 0.5s;}
	>>>.el-scrollbar__wrap {overflow-x:hidden}
</style>