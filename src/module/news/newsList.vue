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
			<tree @refreshTableByTreeNode="refreshTableByTreeNode" :treeHeight="treeHeight"></tree>
			
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
					<operations @refreshTabel="getNewsMainData" :selectedData="dataSelections"></operations>
					
					<pagination @setPageSize="getPageSize" @setCurrentPage="getCurrentPage" :currentPage="cPage" :everyPage="ePage" :totalCount="tCount"></pagination>
					
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
	
	import publicMethod from '@/module/public/publicMethod'//公共方法
	import pagination from '@/module/public/pagination'//分页组件
	
	import newsMethods from '@/module/news/methods/news'
	
	import tree from '@/module/news/component/tree'
	import operations from '@/module/news/component/operations'
	
	export default {

		data() {
			return {
				mainTableHeight: this.mainContentHeight + "px", //主表高度
				treeHeight: this.mainContentHeight - 25 +"px",

				//tableData: tableInfo.data,//主表数据
				tableData: [],
				pageObj:{
					path:this.$router.history.current.path,
				},
				transmitObj:{},

				dataSelections: [], //主表选中记录合集

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
				
				normalSelectValue: "", //select选择的值
				searchText: "", //搜索框内容

				dialogVisible: false, //对话框是否显示 
				
				ePage:this.everyPage,//每页记录数
				cPage:1,//当前第几页
				tCount:0,//总个数
				
				currentNode:"0",
				pageList: this.$store.state.pagination.paginationList,
				currentPath: this.$router.history.current.path,
			}
		},
		props: ['mainContentHeight'],
		mixins: [publicMethod,newsMethods],
		components:{pagination,operations,tree},
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
			 * news.js
			 */			
			this.getNewsMainData();
			
		},
		methods: {
			handleSelectionChange(data){//主表数据选中
				this.dataSelections = data;
			},
			getPageSize(pageSize){//变更每页条数
				this.ePage=pageSize;				
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						this.ePage=pageSize;
						item.everyPage=pageSize;
						break;
					}
				}
				
				let maxPage = Math.ceil(this.tCount/pageSize);
				if(this.pageObj.currentPage>maxPage){//设置每页条数后，如果当前页超过总页数，则设为最大总页数
					this.pageObj.currentPage = maxPage;
					this.cPage = maxPage;
				}
				this.pageObj.everyPage = pageSize;				
				this.getNewsMainData();
			},
			getCurrentPage(pageNumber){//转到指定页
				this.cPage = pageNumber;
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						item.currentPage=pageNumber;
						break;
					}
				}
				this.pageObj.currentPage = pageNumber;
				this.getNewsMainData();
			},
			selectorValue: function(value) {//搜索框条件选择
				let searchObj = {
					path: this.$router.history.current.path,
					normalSelect: value,
					searchText: this.searchText,
				}
				this.normalSelectValue = value; //选择框绑定值
				this.$store.dispatch('searchAdd', searchObj); //store保存选择的select对象
			},
		    addPanel() { //打开弹窗
				this.dialogVisible = true;
				this.$router.push("/news/newsList/add");
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
		    refreshTableByTreeNode:(val)=>{
				this.currentNode = val;
				this.pageObj.currentPage = 1;
		    	this.getNewsMainData();
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
	
	.el-tree{background-color:inherit;padding:5px;}
	.treeObj{background-color: #fefefe;}
	.treeInner{margin:0px 20px 0px 10px;background-color: #FAFAFA;}
	.treeInner>.title{font-size:14px;padding:14px 0px 14px 20px;margin:0px;color:#333;font-weight:bolder;border-bottom:1px solid #ebeef5}
	
	>>>#normalSelect{width:120px}
	
</style>