<template>
	<div class="mainTableArea">

		<el-row class="search">
			<el-col :xs="23" :sm="23" :md="23" :lg="23">
				<!--搜索框组件-->
				<searchBar @refreshTable="refreshTableBySearch" :whereStr="whereStr"></searchBar>
			</el-col>

			<el-col :xs="1" :sm="1" :md="1" :lg="1">
				<el-button size="small" type="primary" icon="el-icon-plus" @click="addPanel()"></el-button>
			</el-col>
		</el-row>
		
		<el-row>
			<!--树组件-->
			<tree @refreshTableByTreeNode="refreshTableByTreeNode" :treeHeight="treeHeight"></tree>
			<el-col :xs="19" :sm="19" :md="19" :lg="19">		
				<el-table
					 v-loading="loading" 
					 ref="multipleTable" 
					 :height="mainTableHeight" 
					 :data="tableData" 
					 tooltip-effect="dark" 
					 style="width: 100%" 
					 @selection-change="handleSelectionChange"
					 :default-sort="{prop:'id',order:'ascending'}">
					<el-table-column align="center" type="selection" width="55">
					</el-table-column>
		
					<el-table-column prop="title" label="标题" min-width="35%">
						<template slot-scope="scope">
							<a class="title" @click="gotoView(scope.row)">
								<i v-if="scope.row.isTop==1" class="setTop el-icon-erp-setTop"></i>
								{{ scope.row.title }}
							</a>
						</template>
					</el-table-column>
		
					<el-table-column prop="title" align="center" label="发布平台" min-width="12%">
						<template slot-scope="scope">

							<a class="releaseBtn webActive" v-if="scope.row.releaseSite==1" @click="exChangeRelease(scope.row,'releaseSite',0)"><i class="el-icon-erp-website"></i></a>
							<a class="releaseBtn" v-else @click="exChangeRelease(scope.row,'releaseSite',1)"><i class="el-icon-erp-website"></i></a>
														
							<a class="releaseBtn appActive" v-if="scope.row.releaseApp==1" @click="exChangeRelease(scope.row,'releaseApp',0)"><i class="el-icon-erp-app"></i></a>
							<a class="releaseBtn" v-else @click="exChangeRelease(scope.row,'releaseApp',1)"><i class="el-icon-erp-app"></i></a>

							<a class="releaseBtn wxActive" v-if="scope.row.releaseWx==1" @click="exChangeRelease(scope.row,'releaseWx',0)"><i class="el-icon-erp-weixin"></i></a>
							<a class="releaseBtn" v-else @click="exChangeRelease(scope.row,'releaseWx',1)"><i class="el-icon-erp-weixin"></i></a>
							
						</template>
					</el-table-column>
		
					<el-table-column sortable prop="status" align="center" label="状态" min-width="9%">
						<template slot-scope="scope">
							<el-dropdown trigger="click">
								<el-button type="text" size="small" class="el-dropdow-link unAudit" v-if="scope.row.status==0">
									未审核
									<i class="el-icon-arrow-down"></i>
								</el-button>
								<el-button type="text" size="small" class="el-dropdow-link audited" v-else-if="scope.row.status==1">
									初审通过
									<i class="el-icon-arrow-down"></i>
								</el-button>
								<el-button type="text" size="small" class="el-dropdow-link finalAudited" v-else-if="scope.row.status==2">
									终审通过
									<i class="el-icon-arrow-down"></i>
								</el-button>
								<el-button type="text" size="small" class="el-dropdow-link reject" v-else-if="scope.row.status==3">
									退稿
									<i class="el-icon-arrow-down"></i>
								</el-button>
								<el-button type="text" size="small" class="el-dropdow-link noPass" v-else-if="scope.row.status==4">
									不通过
									<i class="el-icon-arrow-down"></i>
								</el-button>

								<el-dropdown-menu slot="dropdown" v-if="scope.row.status==0">
									<el-dropdown-item @click.native="auditNews(scope.row,1)">
										<a><i class="el-icon-erp-pass"></i>初审通过</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,2)">
										<a><i class="el-icon-erp-pass"></i>终审通过</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,3)">
										<a><i class="el-icon-erp-notPass"></i>退稿</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,4)">
										<a><i class="el-icon-erp-notPass"></i>不通过</a>
									</el-dropdown-item>
								</el-dropdown-menu>
								<el-dropdown-menu slot="dropdown" v-if="scope.row.status==1">
									<el-dropdown-item @click.native="auditNews(scope.row,2)">
										<a><i class="el-icon-erp-pass"></i>终审通过</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,3)">
										<a><i class="el-icon-erp-notPass"></i>退稿</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,4)">
										<a><i class="el-icon-erp-notPass"></i>不通过</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,0)">
										<a><i class="el-icon-erp-pass"></i>撤销</a>
									</el-dropdown-item>
								</el-dropdown-menu>
								<el-dropdown-menu slot="dropdown" v-if="scope.row.status==2">
									
									<el-dropdown-item @click.native="auditNews(scope.row,3)">
										<a><i class="el-icon-erp-notPass"></i>退稿</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,4)">
										<a><i class="el-icon-erp-notPass"></i>不通过</a>
									</el-dropdown-item>
									<el-dropdown-item @click.native="auditNews(scope.row,1)">
										<a><i class="el-icon-erp-pass"></i>撤销</a>
									</el-dropdown-item>
								</el-dropdown-menu>
								<el-dropdown-menu slot="dropdown" v-if="scope.row.status==3">
									<el-dropdown-item @click.native="auditNews(scope.row,0)">
										<a><i class="el-icon-erp-pass"></i>撤销</a>
									</el-dropdown-item>
								</el-dropdown-menu>
								<el-dropdown-menu slot="dropdown" v-if="scope.row.status==4">
									<el-dropdown-item @click.native="auditNews(scope.row,0)">
										<a><i class="el-icon-erp-pass"></i>撤销</a>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
		
					<el-table-column align="center" label="作者" prop="author" min-width="10%">
		
					</el-table-column>
		
					<el-table-column sortable align="center" label="编辑时间" prop="appearDate" min-width="12%">
						<template slot-scope="scope">
						{{ moment(scope.row.appearDate).format("YYYY-MM-DD") }}
						</template>
					</el-table-column>
		
		
					<el-table-column align="center" label="操作" min-width="12%">
						<template slot-scope="scope">
							<el-dropdown trigger="click">
								<el-button type="text" size="small" class="el-dropdow-link">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">

									<el-dropdown-item v-if="scope.row.status!=2" @click.native="gotoEdit(scope.row.id)">
										<el-button type="text" size="mini">修改</el-button>
									</el-dropdown-item>

									<el-dropdown-item v-if="scope.row.isTop==0" @click.native="setTop(scope.row,1)">
										<el-button type="text" size="mini">置顶</el-button>
									</el-dropdown-item>

									<el-dropdown-item v-else @click.native="setTop(scope.row,0)">
										<el-button type="text" size="mini">撤销置顶</el-button>
									</el-dropdown-item>

									<el-dropdown-item @click.native="openHtml5Link(scope.$index,scope.row)">
										<el-button type="text" size="mini">H5链接</el-button>
									</el-dropdown-item>
									
									<el-dropdown-item @click.native="copyNews(scope.$index,scope.row)">	
										<el-button type="text" size="mini">复制</el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>		
				</el-table>			

				<div class="paginationArea">
					<operations @refreshTableOperation="refreshTable" :selectedData="dataSelections"></operations>
					<pagination @setPageSize="getPageSize" @setCurrentPage="getCurrentPage" :pageObj="pageObj"></pagination>
				</div>
			</el-col>
		</el-row>

		<!--弹框-->
		<el-dialog :title="currentItem.title" :visible.sync="dialogVisible" width="80%" top="1vh">
			<div class="signature">
				<span>作者</span> {{currentItem.author}}
				<span>发布时间</span> {{moment(currentItem.appearDate).format("YYYY-MM-DD") }}
			</div>
			<div class="dialogMain" v-html="currentItem.content">
			</div>
		</el-dialog>
	</div>
</template>

<script>
	
	import publicMethod from '@/module/public/publicMethod'//公共方法
	import pagination from '@/module/public/pagination'//分页组件
	
	import newsMethods from '@/module/news/methods/news'//公共方法
	
	import searchBar from '@/module/news/component/search'//公共组件
	import tree from '@/module/news/component/tree'//公共组件
	import operations from '@/module/news/component/operations'//公共组件
	
	let sortType = "desc";

	
	export default {

		data(){
			return {
				mainTableHeight: this.mainContentHeight + "px",//主表高度
				treeHeight: this.mainContentHeight +"px",//树高度
				loading:true,
				tableData: [],//主表数据
				pageObj:{//请求分页信息
					path:this.$router.history.current.path,
					everyPage:this.baseConfig.everyPage,//每页记录数
					currentPage:1,
					totalCount:0,
				},
				dataSelections: [], //主表选中记录合集
				dialogVisible: false, //对话框是否显示 
				currentNode:"0",//接收tree中点击的nodeIndex
				whereStr:"",//whereStr
				currentItem:{},
				currentViewAnnex:[]//当前浏览的文章附件
			}
		},
		props: ['mainContentHeight'],
		mixins: [publicMethod,newsMethods],
		components:{pagination,operations,tree,searchBar},
		created() {
			
		},
		mounted() {
			
			/*
			 * 获取主表数据、保存的状态数据
			 * 
			 * news.js
			 */
			const path = this.$router.history.current.path;
			this.$store.dispatch("getPagination",path).then((data)=>{//获取vuex保存的分页状态
				this.pageObj = Object.assign(this.pageObj,data);
				this.$store.dispatch("getCurrentSearch",path).then((data)=>{//获取vuex保存的搜索框状态
					if(data.path){
						this.whereStr = " where "+data.normalSelect+" like '%"+data.searchText+"%'";
					}
					this.getNewsMainData();
				});
			});
		},		
		methods: {
			/*
			修改发布到的平台
			 */

			exChangeRelease(row,column,status){
				const p = {};
				p.sql = "update news set "+column+" = '"+status+"' where id = '"+row.id+"'";

				this.axios({
					method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/exec.do",p),
		            dataType: 'JSON',
				}).then((data)=>{
					row[column]=status;
				}).catch((error)=>{
					console.log(error);
				});
			},
			/*
			审核新闻
			 */
			auditNews(row,status){				
				var p = {};
				p.sql = "update news set status='"+status+"' where id = '"+row.id+"'";
				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/exec.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					row.status = status;

		        }).catch((error)=>{
		        	console.log(error);

		        })
			},
			/*
			置顶
			 */	
			setTop(row,status){
				
				var p = {};
				p.sql = "update news set isTop='"+status+"' where id in ("+row.id+")";
				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/exec.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					row.isTop = status;

		        }).catch((error)=>{
		        	console.log(error);

		        })
			},
			/*
			查看
			 */
			gotoView(row){
				this.dialogVisible = true;
				this.currentItem = row;
				this.getAnnex(row.id);
			},
			/*
			获得新闻附件
			 */
			getAnnex(newsId){
				const p = {};
				p.sql = "select id,serialNumber,annexName,fileType,dirName,content,contextPath,saveUrl,newFileName from newsAnnex where newsId = '"+newsId+"' and status = 1 order by serialNumber asc";
				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/newsAnnex/queryForMap.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					this.currentViewAnnex = result.data.data;

		        }).catch((error)=>{
		        	console.log(error);

		        })
			},
			/*
			修改
			 */
			gotoEdit(newsId){
				this.$router.push({name:"newsEdit",query:{id:newsId}});
			},
			openHtml5Link(index,item){
				window.open("../../../allMobile/news/content.html?id="+item.id);
			},
			copyNews(index,item){
				const p = item
				p.title = item.title+"_副本"; 
			    p.editor = ""; //这个地方
				p.isOriginal = 0;
				p.appearUserId = this.user.id;
				p.editTime = this.moment(new Date().getTime()).format("YYYY-MM-DD HH:MM:SS");
				p.appearDate = this.moment(new Date().getTime()).format("YYYY-MM-DD HH:MM:SS"); 
				p.lastTime = this.moment(new Date().getTime()).format("YYYY-MM-DD HH:MM:SS");	
				p.status = 0;

				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/news/add.do",p),
		            dataType: 'JSON',
		            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
		        }).then((result)=>{
					const newsId = result.data.data;
			        this.queryNewsAnnex(item.id,newsId);
		 			this.getNewsMainData();
		        }).catch((error)=>{
		        	console.log(error);
		        })
			},
			queryNewsAnnex(sourceNewsId,destNewsId){
				const p = {};
				p.sql="select * from newsAnnex"; 
				p.whereStr = "where newsId = '"+sourceNewsId+"'";
				p.orderStr="";

				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/newsAnnex/getNewsAnnexs.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					const resultData = result.data.data;
			       	$.each(data,function(i, item) { 
			     		this.addNewsAnnex(destNewsId,item);
                    }); 
		        }).catch((error)=>{
		        	console.log(error);
		        })
			},
			addNewsAnnex(destNewsId,newsAnnex){
				const p = newsAnnex;
				p.newsId = destNewsId;

				this.axios({
		            method: 'post',
		            url: this.baseConfig.url_base,
		            data: this.getData("HX_API","/https/newsAnnex/add.do",p),
		            dataType: 'JSON',
		        }).then((result)=>{
					
		        }).catch((error)=>{

		        })
			}



		},
		watch: {
			mainContentHeight(val){
				this.mainTableHeight = val;
				this.treeHeight = val;
			}
		}
	}
</script>

<style type="text/css" lang="stylus">
	
	@import url("../../style/mainList.css");
	
	.signature
		text-align:right
		
		span
			color:#909399
			margin:0px 4px
		
		&:before
			content:""
			width:50px
			height:1px
			top:-2px
			position:relative
			display:inline-block
			border-top:1px solid #999
			margin-right:2px
			

	.dialogMain
		p
			padding:0px
			margin:0px

	.title
		&:hover
			cursor:pointer
		.setTop
			font-size:22px
			color:#409eff

	.unAudit
		color:#606266

	.audited
		color:#ffc107
		
	.finalAudited
		color:#42b983
	
	.reject
		color:#ddd
	
	.noPass
		color:#f56c6c

	.releaseBtn
		color:#ddd
		&:hover
			cursor:pointer
			
	.wxActive
		color:#00b80c
	
	.appActive
		color:#03a9f4
		
	.webActive
		color:#ff9800
	

</style>