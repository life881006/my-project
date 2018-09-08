<template>
	<div class="mainTableArea">

		<el-row class="search">
			<el-col :xs="23" :sm="23" :md="23" :lg="23">
				<!--搜索框组件-->
				<searchBar @refreshTabel="refreshTableBySearch" :whereStr="whereStr"></searchBar>
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
					<operations @refreshTabel="refreshTable" :selectedData="dataSelections"></operations>
					
					<pagination @setPageSize="getPageSize" @setCurrentPage="getCurrentPage" :pageObj="pageObj"></pagination>
					
				</div>
			</el-col>
		</el-row>

		<!--弹框-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="80%" top="5vh">
			<!--:before-close="handleClose"-->

			<div class="dialogMain">
				<keep-alive>
					<router-view :visibleAttr="dialogVisible"></router-view>
				</keep-alive>
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
	
	import searchBar from '@/module/news/component/search'
	import tree from '@/module/news/component/tree'
	import operations from '@/module/news/component/operations'
	
	
	export default {

		data() {
			return {
				mainTableHeight: this.mainContentHeight + "px",//主表高度
				treeHeight: this.mainContentHeight +"px",//树高度
				loading:true,
				tableData: [],//主表数据
				transmitObj:{},//请求路径参数
				pageObj:{//请求分页信息
					path:this.$router.history.current.path,
					everyPage:this.everyPage,//每页记录数
					currentPage:1,
					totalCount:0,
				},
				dataSelections: [], //主表选中记录合集
				dialogVisible: false, //对话框是否显示 
				currentNode:"0",//接收tree中点击的nodeIndex
				whereStr:"",//whereStr
			}
		},
		props: ['mainContentHeight'],
		mixins: [publicMethod,newsMethods],
		components:{pagination,operations,tree,searchBar},
		created() {
			
		},
		mounted() {
			
			/*
			 * 获取主表数据
			 * 
			 * news.js
			 */
			const path = this.$router.history.current.path;
			this.$store.dispatch("getPagination",path).then((data)=>{//获取vuex保存的分页状态
				this.pageObj = Object.assign(this.pageObj,data);
				console.log(data);
				this.$store.dispatch("getCurrentSearch",path).then((data)=>{//获取vuex保存的搜索框状态
					if(data.path){
						this.whereStr = " where "+data.normalSelect+" like '%"+data.searchText+"%'";
					}
					this.getNewsMainData();
				});
			});			
		},		
		methods: {
			
		},
		watch: {
			mainContentHeight(val){
				this.mainTableHeight = val;
				this.treeHeight = val;
			}
		}
	}
</script>

<style type="text/css">
	
	@import url("../../style/mainList.css");
	
	
	
</style>