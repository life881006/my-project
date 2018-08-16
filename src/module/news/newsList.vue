<template>
	<div class="mainTableArea">

		<el-input type="hidden" id="whereStr" value=""></el-input>

		<el-row class="search">
			<el-col :xs="23" :sm="23" :md="23" :lg="23">				
				<el-select size="small" id="selectOption1" v-model="selectOptions" placeholder="请选择" @change="selectorValue">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
				</el-select>
				<el-input size="small" placeholder="请输入内容" v-model="searchText" clearable>

				</el-input>
				<el-button size="small" type="primary" icon="el-icon-search">检索</el-button>
			</el-col>

			<el-col :xs="1" :sm="1" :md="1" :lg="1">
				<el-button size="small" type="primary" icon="el-icon-plus" @click="addPanel()"></el-button>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col :xs="4" :sm="4" :md="4" :lg="4">
				<!--展示树-->
				<el-scrollbar>
				<el-tree lazy :data="treeData" :props="defaultProps" :style="{height:treeHeight}" @node-click="handleNodeClick" :load="loadNode" >
					
				</el-tree>
				</el-scrollbar>
			</el-col>
			
			<el-col :push="1" :xs="19" :sm="19" :md="19" :lg="19">		
				<el-table ref="multipleTable" :height="mainTableHeight" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :default-sort="{prop:'id',order:'ascending'}">
					<el-table-column align="center" type="selection" width="55">
					</el-table-column>
		
					<el-table-column prop="title" label="标题" min-width="30%">
						<template slot-scope="scope">{{ scope.row.title }}</template>
					</el-table-column>
		
					<el-table-column prop="title" align="center" label="发布平台" min-width="12%">
						<template slot-scope="scope">
							<span>{{ scope.row.releaseWx==1?"微信":"无微信"}}</span>
							<span>{{ scope.row.releaseApp==1?"App":"无App"}}</span>
							<span>{{ scope.row.releaseSite==1?"网站":"无网站"}}</span>
						</template>
					</el-table-column>
		
					<el-table-column prop="status" align="center" label="状态" min-width="9%">
						<template slot-scope="scope">
							<span v-if="scope.row.status==0">未审核</span>
							<span v-else-if="scope.row.status==1">初审通过</span>
							<span v-else-if="scope.row.status==2">终审通过</span>
							<span v-else-if="scope.row.status==3">退稿</span>
							<span v-else-if="scope.row.status==4">不通过</span>
						</template>
					</el-table-column>
		
					<el-table-column align="center" prop="isTop" label="置顶" min-width="6%">
						<template slot-scope="scope">
							<span v-if="scope.row.isTop==1">置顶</span>
							<span v-else=""></span>
						</template>
					</el-table-column>
		
					<el-table-column align="center" label="作者" prop="author" min-width="6%">
		
					</el-table-column>
		
					<el-table-column align="center" label="编辑" prop="editor" min-width="6%">
		
					</el-table-column>
		
					<el-table-column align="center" label="编辑时间" prop="appearDate" min-width="12%">
		
					</el-table-column>
		
					<el-table-column align="center" label="阅读次数" prop="editor" min-width="8%">
		
					</el-table-column>
		
					<el-table-column align="center" label="操作" min-width="12%">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="deleteThis(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>		
				</el-table>			

				<div class="paginationArea">
					<el-col :xs="8" :sm="8" :md="8" :lg="8">
						<el-button-group>
							<el-button type="danger" size="small">删除</el-button>
							<el-button type="primary" size="small">排序</el-button>
						</el-button-group>
						<el-dropdown trigger="click">
							<el-button size="small">审核</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<a @click="aaa()"><i class="el-icon-erp-pass"></i> 审核通过</a>
								</el-dropdown-item>
								<el-dropdown-item>
									<a @click="bbb()"><i class="el-icon-erp-notPass"></i> 审核不通过</a>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
					
					<el-col :xs="16" :sm="16" :md="16" :lg="16">
						<div class="paginationComponent">
							<span>总计 {{tCount}} 条</span>
							<el-input id="everpageNumber" size="mini" :value="ePage" maxlength="5" @blur="setEveryPage">
								<template slot="prepend">每页/条</template>
							</el-input>
							<el-pagination 
						      @current-change="handleCurrentChange"
						      :current-page="cPage"
						      :page-size="ePage"
						      layout=" prev, pager, next, jumper"
						      :total="tCount">
						   </el-pagination>
					    </div>
					</el-col>
				</div>
			</el-col>
		</el-row>

		<!--弹框-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="50%" top="5vh">
			<!--:before-close="handleClose"-->

			<div class="dialogMain">
				<router-view :visibleAttr="dialogVisible"></router-view>
			</div>
			<!--
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		  -->
		</el-dialog>
	</div>
</template>

<script>
	
	import mainMethod from '@/components/mainMethod'
	import news from '@/module/news/news'
	
	export default {

		data() {
			return {
				mainTableHeight: this.mainContentHeight + "px", //主表高度

				//tableData: tableInfo.data,//主表数据
				tableData: [],
				pageObj:{
					path:this.$router.history.current.path,
				},
				transmitObj:{},

				multipleSelection: [], //主表选中记录合集

				options: [{ //select内容
					value: "a.title",
					label: "标题",
				}, {
					value: "a.author",
					label: "作者",
				}, {
					value: "a.transfer",
					label: "来源",
				}],
				treeData: [],
				selectOptions: "", //select选择的值
				searchText: "", //搜索框内容

				dialogVisible: false, //对话框是否显示 
				
				treeHeight:this.mainContentHeight+50+"px",//树高
				defaultProps: {//树形结构默认设置
		          children: 'children',
		          label: 'label'
		        },
				
				ePage:this.everyPage,//每页记录数
				cPage:1,//当前第几页
				tCount:0,//总个数
				
				
				pageList: this.$store.state.pagination.paginationList,
				currentPath: this.$router.history.current.path,
			}
		},
		props: ['mainContentHeight'],
		mixins: [mainMethod],
		created() {
			/**
			 * 获取、保存页码设置
			 */			
			this.pageObj.everyPage = this.ePage;//挂载到vue中的everyPage
			this.pageObj.currentPage = this.cPage;
			
			for(let item of this.pageList){//如果store中有保存过分页状态，则从store中获取				
				if(item.path === this.currentPath){
					this.pageObj.everyPage = item.everyPage;//store中存的页码数据
					this.pageObj.currentPage = item.currentPage;
					
					break;
				}				
			}
		},
		mounted() {
			/**
			 * 获取搜索框保存的选择状态
			 */
			const searchList = this.$store.state.search.searchList;
			
			for(let item of searchList) {
				if(this.currentPath === item.path) {
					this.searchText = item.searchText;
					this.selectOptions = item.selectOption1;
				}
			}
			
			let sql = "SELECT DISTINCT a.id,a.title,a.status,a.author,a.transfer,a.editor,a.editTime,a.appearDate,a.readTimes,a.releaseSite,a.releaseApp,a.releaseWx,a.releaseMicroblog,a.isTop FROM news AS a";
			sql += " left join channelNewsAssociate as b on a.id = b.newsId left join channel as c on b.channelId = c.id";
									
			this.pageObj.sql = sql;			
			this.pageObj.whereStr = news.getWhereStr();
			this.pageObj.orderStr = "order by a.editTime desc";			
			
					
			this.transmitObj.url = global.url_base;
			this.transmitObj.api = "HX_API";
			this.transmitObj.handler = "/https/news/getPageInfo.do";
			
			/*
			 * 获取主表数据
			 * pageObj: 为数据对象
			 * transmitObj: 为请求路径
			 */

			this.getPageData(this.pageObj,this.transmitObj).then((data)=> {	
				this.pageObj.totalCount = data.totalCount;
				this.ePage = data.everyPage;
				this.cPage = data.currentPage;
				this.tCount = data.totalCount;
				this.$store.dispatch("paginationAdd",this.pageObj);//将页码信息插入
				this.transmitObj.handler = "/https/news/getNewssByPage.do";
				return this.getPageData(this.pageObj,this.transmitObj)
			}).then((data)=>{
				this.tableData = data;
			});
			
			
			/*
			 * 获取树结构channels
			 * 
			 */
			this.loadChannelTree("0").then((data)=>{
				let temporaryTree = [];
				for(let item of data){
					let temporaryTreeItem = {};
					temporaryTreeItem.index = item.id;
					temporaryTreeItem.label = item.name;
					temporaryTree.push(temporaryTreeItem);
				}
				this.treeData = temporaryTree;
			});
		},
		methods: {
			handleCurrentChange(val) {
				this.cPage = val;
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						item.currentPage=val;
						break;
					}
				}
				this.pageObj.currentPage = val;
				this.getPageData(this.pageObj,this.transmitObj).then((data)=> {
					this.tableData = data;
				})
			},
			setEveryPage(){
				let inputEveryPage = Number(document.getElementById("everpageNumber").value);
				if(inputEveryPage===0){
					return false;
				}
				if(inputEveryPage>this.tCount){
					let h = this.$createElement;//elementUi创建html元素
					this.$message({
						//h:创建html元素，（）中第一个是html标签，第二个是样式模板，第三个是文本
						message:h('p',null,[
							//h('span',null,'出现错误：'),
							h('i',{style:'color:red;font-weight:bolder'},'您输入每页条数超过总条数,请重新输入')
						])
					});
					document.getElementById("everpageNumber").value="";
					return false;
				}
				
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						this.ePage=inputEveryPage;
						item.everyPage=inputEveryPage;
						break;
					}
				}
				
				let maxPage = Math.ceil(this.tCount/inputEveryPage);
				if(this.pageObj.currentPage>maxPage){//设置每页条数后，如果当前页超过总页数，则设为最大总页数
					this.pageObj.currentPage = maxPage;
					this.cPage = maxPage;
				}
				this.pageObj.everyPage = inputEveryPage;
				this.getPageData(this.pageObj,this.transmitObj).then((data)=> {//加载主表数据
					this.tableData = data;
				})
				
			},
			aaa() {
				alert("审核通过");
			},
			bbb() {
				alert("审核不通过");
			},
			addPanel: function() { //打开弹窗
				this.dialogVisible = true;
				this.$router.push("/news/newsList/add");
			},
			selectorValue: function(value) {
				let searchObj = {
					path: this.$router.history.current.path,
					selectOption1: value,
					searchText: this.searchText,
				}
				this.selectOptions = value; //选择框绑定值
				this.$store.dispatch('searchAdd', searchObj); //store保存选择的select对象
				let obj = this.options.find(function(item) {
					return item.value == value;
				});
			},
			handleNodeClick(data) {//data ：节点数据
				
		    },
			loadNode(node, resolve) {//树结构节点加载
				this.loadChannelTree("121").then((data)=>{
					if(data.length===0){
						resolve([])
					}else{
						let temporaryTree = [];
						for(let item of data){
							let temporaryTreeItem = {};
							temporaryTreeItem.index = item.id;
							temporaryTreeItem.label = item.name;
							temporaryTree.push(temporaryTreeItem);
						}
					    resolve(temporaryTree);
					}
				});
				/*
		        this.treeHeight = this.mainContentHeight+50+Math.random(0,0.1)+"px";
		        */
		    },
		    loadChannelTree(pid){
		    	return new Promise((resolve,reject)=>{
		    		
			    	let p = {};
			    	let unitId = this.user.unitId;
			    	p.sql = "select id,name,pid from channel where unitId = '"+unitId+"' and pid = '"+pid+"' order by serialNumber asc";
			    	
			    	this.axios({
			            method: 'post',
			            url: global.url_base,
			            data: this.getData("HX_API","/https/channel/query.do",p),
			            dataType: 'JSON'						 
			        }).then((result)=> {
			        	resolve([...result.data.data]);
			        }).catch((error)=> {
			        	console.log(error);
			        });
			    	
		    		
		    	});
		    	
		    }
		},
		watch: {
			searchText: function(val) {
				if(val == undefined) {
					return false;
				}
				this.searchText = val;
				let searchObj = {
					path: this.$router.history.current.path,
					selectOption1: this.selectOptions,
					searchText: val,
				}
				this.$store.dispatch("searchAdd", searchObj);
			}
		}
	}
</script>

<style type="text/css" scoped="scoped">
	@import url("../../style/headerNav.css");
	@import url("../../style/mainList.css");
	
	
	>>>.el-pagination__jump{margin-left:10px;}
	>>>.el-input-group__prepend{padding:0px 5px;}
	>>>#everpageNumber{text-align: center;padding:0px 5px;}
	>>>.el-pager li{min-width: 30.5px;}
	.paginationComponent{padding-top:2px;display: inline-block;float:right}
	.el-pagination{width:auto;text-align: right;padding:0px 5px;float:left}
	.paginationComponent .el-input{width:90px;float:left;}
	span{float:left;margin-right:5px;line-height: 2;font-weight:normal;font-size:14px;color:#888}
	
	>>>#selectOption1{width:120px}
	
	@media only screen and (min-width: 100px) and (max-width: 1200px) {
		>>>.el-pager li {
			min-width: auto;
			padding:0px 5px;
		}
		>>>.el-pagination__jump{margin-left:5px}
	}
</style>