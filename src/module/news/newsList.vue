<template>	
	<div class="mainTableArea">
		
		<el-input type="hidden" id="whereStr" value=""></el-input>		
		
		<el-row class="search">
			<el-col :xs="23" :sm="23" :md="23" :lg="23">
			<el-select size="small" ref="selectOption1" v-model="selectOptions" placeholder="请选择" @change="changeValue">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
			</el-select>
			<el-input size="small" placeholder="请输入内容" v-model="searchText" clearable >
				
			</el-input>
			<el-button size="small" type="primary" icon="el-icon-search">检索</el-button>
			</el-col>
			
			<el-col :xs="1" :sm="1" :md="1" :lg="1">
				<el-button size="small" type="primary" icon="el-icon-plus" @click="addPanel()"></el-button>
			</el-col>
		</el-row>
		<el-table 
			ref="multipleTable" 
			:height="mainTableHeight" 
			:data="tableData.slice((currentPage-1)*everyPage,currentPage*everyPage)" 
			tooltip-effect="dark" 
			style="width: 100%" 
			@selection-change="handleSelectionChange" 
			:default-sort="{prop:'id',order:'ascending'}"
			>
			<el-table-column align="center" type="selection" width="55">
			</el-table-column>
			
			
			<el-table-column prop="title" align="center" label="标题" width="100">
				<template slot-scope="scope">{{ scope.row.title }}</template>
			</el-table-column>
			
			<el-table-column prop="title" align="center" label="发布平台" width="100">
				<template slot-scope="scope">
					<span>{{ scope.row.releaseWx==1?"微信":"无微信"}}</span>
					<span>{{ scope.row.releaseApp==1?"App":"无App"}}</span>
					<span>{{ scope.row.releaseSite==1?"网站":"无网站"}}</span>
				</template>
			</el-table-column>
			
			<el-table-column prop="status" align="center" label="状态" min-width="14%">
				<template slot-scope="scope">
					<span v-if="scope.row.status==0">未审核</span>
					<span v-else-if="scope.row.status==1">初审通过</span>
					<span v-else-if="scope.row.status==2">终审通过</span>
					<span v-else-if="scope.row.status==3">退稿</span>
					<span v-else-if="scope.row.status==4">不通过</span>
				</template>
			</el-table-column>
			
			<el-table-column align="center" prop="isTop" label="置顶" min-width="8%">
				<template slot-scope="scope">
					<span v-if="scope.row.isTop==1">置顶</span>
					<span v-else=""></span>
				</template>
			</el-table-column>
			
			<el-table-column align="center" label="作者" prop="author" min-width="8%">
	
			</el-table-column>
			
			<el-table-column align="center" label="编辑" prop="editor" min-width="8%">
	
			</el-table-column>
			
			<el-table-column align="center" label="编辑时间" prop="appearDate" min-width="8%">
				
			</el-table-column>
			
			<el-table-column align="center" label="阅读次数" prop="editor" min-width="8%">
	
			</el-table-column>
			
			<el-table-column align="center" label="操作" min-width="8%">
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
					<el-dropdown-menu slot = "dropdown">
						<el-dropdown-item><a @click="aaa()"><i class="el-icon-erp-pass"></i> 审核通过</a></el-dropdown-item>
						<el-dropdown-item><a @click="bbb()"><i class="el-icon-erp-notPass"></i> 审核不通过</a></el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
			<el-col :xs="16" :sm="16" :md="16" :lg="16">
				<pagination @pSize="getPageSize" @cPage="getCurrentPage"></pagination>
			</el-col>
		</div>
		
		
		<!--弹框-->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="50%" 
		  top="5vh"
		  >
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
	
	import pagination from '@/components/pagination'
	import mainMethod from '@/components/mainMethod'
	import news from '@/module/news/news'
	/*	
	const pageInfo =  {
		"hasPrePage": false,
		"hasNextPage": false,
		"totalPage": 1,
		"beginIndex": 0,
		"currentPage": 1,
		"totalCount": 16,
		"everyPage":1,
	};
	const tableInfo = {
		"data": [{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "1",
			"beginValue": 0,
			"awardRule": 0
		},{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "2",
			"beginValue": 0,
			"awardRule": 0
		},{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "3",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 2,
			"endValue": 0,
			"isDeleted": 0,
			"name": "举止文明星",
			"icon": "http://s1.jshuixue.com:8082/SAASClient/allWeb/huixue/pj_medalicon/2018/3/20180308120251_27.png",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "6e750c0d38a2403ba48523ab0c7b3f8d",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 3,
			"endValue": 3,
			"isDeleted": 0,
			"name": "学习勤奋星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "4b080f4dae254158a658b91b42c71a73",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 4,
			"endValue": 3,
			"isDeleted": 0,
			"name": "做操认真星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "150e6808ca2e40318f8be70ee9c05934",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 5,
			"endValue": 3,
			"isDeleted": 0,
			"name": "劳动积极星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "a20687f683004f7aaec7a0fc966c70b01",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 6,
			"endValue": 3,
			"isDeleted": 0,
			"name": "遵守纪律星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "94c328b66d0b465a84d1f7b7c2f87b801",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 7,
			"endValue": 10,
			"isDeleted": 0,
			"name": "保护环境星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 0,
			"id": "53b212ca9df84d6c9edded8e3676a0c71",
			"beginValue": 5,
			"awardRule": 1
		},{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "8b46697d43814fe4b63dea5996eeaf761",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 2,
			"endValue": 0,
			"isDeleted": 0,
			"name": "举止文明星",
			"icon": "http://s1.jshuixue.com:8082/SAASClient/allWeb/huixue/pj_medalicon/2018/3/20180308120251_27.png",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "1",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 3,
			"endValue": 3,
			"isDeleted": 0,
			"name": "学习勤奋星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "32",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 4,
			"endValue": 3,
			"isDeleted": 0,
			"name": "做操认真星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "14",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 5,
			"endValue": 3,
			"isDeleted": 0,
			"name": "劳动积极星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "4214",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 6,
			"endValue": 3,
			"isDeleted": 0,
			"name": "遵守纪律星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "23131",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 7,
			"endValue": 10,
			"isDeleted": 0,
			"name": "保护环境星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 0,
			"id": "252",
			"beginValue": 5,
			"awardRule": 1
		}],
		"status": 0,
		"msg": "0"
	};
	*/
	
	let pageInfo = {everyPage:16,currentPage:1};
	
	export default {
		
		data() {
			return {
				mainTableHeight:this.mainContentHeight+"px",//主表高度
				
				//tableData: tableInfo.data,//主表数据
				tableData: [],
				
				multipleSelection: [],//主表选中记录合集
				
				everyPage:16,//每页记录数
				currentPage:1,//当前记录数
				
				options:[{//select内容
					value:"aaaaddsadsad",
					label:"bbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				},{
					value:"cccdsadsadsa",
					label:"bbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				}],
				selectOptions:"",//select选择的值
				searchText:"",//搜索框内容
				
				dialogVisible: false//对话框是否显示 
			}
		},
		props:['mainContentHeight'],
		mixins:[mainMethod],
		created(){
			/**
			 * 获取、保存页码设置
			 */
			
			let pageList = this.$store.state.pagination.paginationList;
			let currentPath = this.$router.history.current.path;
			for(let item of pageList){
				if(item.path === currentPath){
					this.everyPage=item.everyPage;
					this.currentPage=item.currentPage;
					return false;
				}
			}
			pageInfo.path=this.$router.history.current.path;
			this.$store.dispatch("paginationAdd",pageInfo);//将页码信息插入
		},
		mounted(){
			/**
			 * 获取搜索框保存的选择状态
			 */
			const searchList = this.$store.state.search.searchList;
			const path = this.$router.history.current.path;
			for(let item of searchList){
				if(path === item.path){
					this.searchText = item.searchText;
					this.selectOptions = item.selectOption1;
				}
			}
			
			/**
			 * axios异步获取tableData，pageInfo信息
			 */
			
			let p = {};
			
			let sql = "SELECT DISTINCT a.id,a.title,a.status,a.author,a.transfer,a.editor,a.editTime,a.appearDate,a.readTimes,a.releaseSite,a.releaseApp,a.releaseWx,a.releaseMicroblog,a.isTop FROM news AS a";
			sql += " left join channelNewsAssociate as b on a.id=b.newsId left join channel as c on b.channelId=c.id";
			sql += news.getWhereStr();
			sql += " order by a.editTime desc";
			p.sql = sql;
						
			this.axios({
	            method: 'post',
	            url: global.url_base,
	            data: this.getData("HX_API","/https/news/queryForMap.do",p),
	            dataType: 'JSON'						 
	        }).then((result)=> {
	        	this.tableData = result.data.data;
	        	let pageList = this.$store.state.pagination.paginationList;
				let currentPath = this.$router.history.current.path;
				for(let item of pageList){
					if(item.path === currentPath){
						item.totalCount = this.tableData.length;
						return false;
					}
				}
	        }).catch((error)=> {
	        	console.log(error);
	        	
	        });
			
			
		},
		components:{pagination},
		methods: {
			formatTime(row, column){//格式化时间
				 var date = row[column.property];  
		         if (date == undefined) {  
		            return "";  
		         }  
		         return moment(date).format("YYYY-MM-DD HH:mm:ss");  
			},
			aaa(){
				alert("审核通过");
			},
			bbb(){
				alert("审核不通过");
			},
			addPanel:function(){//打开弹窗
				this.dialogVisible = true;
				this.$router.push("/news/newsList/add");
			},
			changeValue:function(value) {				
				let searchObj = {
					path:this.$router.history.current.path,
					selectOption1:value,
					searchText:this.searchText,
				}
				this.selectOptions = value;//选择框绑定值
				this.$store.dispatch('searchAdd',searchObj);//store保存选择的select对象
				let obj = this.options.find(function(item){
					return item.value == value;
				});
			}
		},
		watch:{
			searchText:function(val){
				if(val==undefined){
					return false;
				}
				this.searchText = val;
				let searchObj = {
					path:this.$router.history.current.path,
					selectOption1:this.selectOptions,
					searchText:val,
				}
				this.$store.dispatch("searchAdd",searchObj);
			}
		}
	}
</script>

<style type="text/css" scoped="scoped">
	@import url("../../style/headerNav.css");
	@import url("../../style/mainList.css");
</style>