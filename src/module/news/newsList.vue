<template>
	<div class="mainTableArea">

		<el-input type="hidden" id="whereStr" value=""></el-input>

		<el-row class="search">
			<el-col :xs="23" :sm="23" :md="23" :lg="23">				
				<el-select size="small" id="normalSelect" ref="normalSelect" v-model="normalSelectValue" placeholder="请选择" @change="selectorValue">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
				</el-select>
				<el-input size="small" placeholder="请输入内容" v-model="searchText" clearable>

				</el-input>
				<el-button size="small" type="primary" icon="el-icon-search" @click="normalSearch">检索</el-button>
			</el-col>

			<el-col :xs="1" :sm="1" :md="1" :lg="1">
				<el-button size="small" type="primary" icon="el-icon-plus" @click="addPanel()"></el-button>
			</el-col>
		</el-row>
		
		<el-row>
			<el-col class="treeObj" :xs="5" :sm="5" :md="5" :lg="5">
				<div class="treeInner">	
					<h4 class="title">频道管理</h4>
					<!--展示树-->
					<el-scrollbar>
					<el-tree ref="elTree1" lazy :data="treeData" :props="defaultProps" :style="{height:treeHeight}" @node-click="handleNodeClick" :load="loadNode" >
						
					</el-tree>
					</el-scrollbar>
				</div>
			</el-col>
			
			<el-col :xs="19" :sm="19" :md="19" :lg="19">		
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
						<template slot-scope="scope">
						{{ moment(scope.row.appearDate).format("YYYY-MM-DD") }}
						</template>
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
				normalSelectValue: "", //select选择的值
				searchText: "", //搜索框内容

				dialogVisible: false, //对话框是否显示 
				
				treeHeight:this.mainContentHeight - 25 +"px",//树高
				defaultProps: {//树形结构默认设置
		          children: 'children',
		          label: 'label'
		        },
		        currentNodeIndex:"0",
				
				ePage:this.everyPage,//每页记录数
				cPage:1,//当前第几页
				tCount:0,//总个数
				
				
				pageList: this.$store.state.pagination.paginationList,
				currentPath: this.$router.history.current.path,
			}
		},
		props: ['mainContentHeight'],
		mixins: [mainMethod,news],
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
					this.normalSelectValue = item.normalSelect;
				}
			}
			
			/*
			 * 获取主表数据
			 * 
			 */			
			this.getNewsMainData();
			
			/*
			 * 获取树结构channels
			 * 
			 */
			this.loadChannelTree().then((data)=>{
				this.treeData = data;
			});
		},
		methods: {
			handleCurrentChange(val) {//点击分页页码时间
				this.cPage = val;
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						item.currentPage=val;
						break;
					}
				}
				this.pageObj.currentPage = val;
				this.getNewsMainData();
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
				
				this.getNewsMainData();
			},
			addPanel: function() { //打开弹窗
				this.dialogVisible = true;
				this.$router.push("/news/newsList/add");
			},
			selectorValue: function(value) {
				let searchObj = {
					path: this.$router.history.current.path,
					normalSelect: value,
					searchText: this.searchText,
				}
				this.normalSelectValue = value; //选择框绑定值
				this.$store.dispatch('searchAdd', searchObj); //store保存选择的select对象				
				/*
				let obj = this.options.find(function(item) {
					return item.value == value;
				});
				*/
			},
			handleNodeClick(data) {//data ：节点数据
				this.currentNodeIndex = data.index;
				this.getNewsMainData();
		    },
			loadNode(node, resolve) {//动态加载树结构子节点
				if(!this.$refs.elTree1){
					return false;
				}
				
				this.currentNodeIndex = this.$refs.elTree1.getCurrentNode().index;
				this.loadChannelTree().then((data)=>{
					if(data.length===0){
						resolve([]);
					}else{					
					    resolve(data);
					}
				});
				/*
		        this.treeHeight = this.mainContentHeight+50+Math.random(0,0.1)+"px";
		        */
		    },
			normalSearch(){
				if(this.normalSelectValue===""){
					this.$notify.error({
						title: '提示',
				        message: '请选择查询类型',
					});
					this.$refs.normalSelect.focus();
					return false;
				}
				document.getElementById("whereStr").value=" where "+this.normalSelectValue+" like '%"+this.searchText+"%'";
				this.getNewsMainData();
			},
		    loadChannelTree(){
		    	/*
		    	 * 根据当前节点id获取树结构子节点
		    	 */
		    	return new Promise((resolve,reject)=>{
			    	let p = {};
			    	let unitId = this.user.unitId;
			    	p.sql = "SELECT a.id,a.name,a.pid,b.id AS childId FROM channel AS a LEFT JOIN channel AS b ON a.id = b.pid WHERE a.unitId = '"+unitId+"' AND a.pid = '"+this.currentNodeIndex+"' group by a.id ORDER BY a.serialNumber asc";
			    	
			    	this.axios({
			            method: 'post',
			            url: global.url_base,
			            data: this.getData("HX_API","/https/channel/queryForMap.do",p),
			            dataType: 'JSON'						 
			        }).then((result)=> {
			        	let resultData = result.data.data;
			        	let temporaryTree = [];
						for(let item of resultData){
							
							let temporaryTreeItem = {};
							temporaryTreeItem.index = item.id;
							temporaryTreeItem.label = item.name;
							temporaryTree.push(temporaryTreeItem);
						}
			        	resolve(temporaryTree);
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
					normalSelect: this.normalSelectValue,
					searchText: val,
				}
				this.$store.dispatch("searchAdd", searchObj);
			},
			mainContentHeight:function(val){
				this.treeHeight = val - 25 + "px";
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
	
	
	.el-tree{background-color:inherit;padding:5px;}
	.treeObj{background-color: #fefefe;}
	.treeInner{margin:0px 20px 0px 10px;background-color: #FAFAFA;}
	.treeInner>.title{font-size:14px;padding:14px 0px 14px 20px;margin:0px;color:#333;font-weight:bolder;border-bottom:1px solid #ebeef5}
	
	>>>#normalSelect{width:120px}
	
	@media only screen and (min-width: 100px) and (max-width: 1200px) {
		>>>.el-pager li {
			min-width: auto;
			padding:0px 5px;
		}
		>>>.el-pagination__jump{margin-left:5px}
	}
</style>